import json
import subprocess
import sys
import re
import os
import tarfile

def should_compress(path):
    # Check if the file is inside a .git directory
    for part in path.split(os.sep):
        if part == '.git':
            return False
    return True

def compress_directory(output_filename):
    with tarfile.open(output_filename, "w:gz") as tar:
        for root, dirs, files in os.walk("."):
            # Remove .git directories from the list of directories to walk
            dirs[:] = [d for d in dirs if d != ".git"]

            for file in files:
                file_path = os.path.join(root, file)
                if should_compress(file_path):
                    tar.add(file_path)

def update_env_variable(dockerfile_path, env_variable, new_value):
    # Read the Dockerfile
    with open(dockerfile_path, 'r') as file:
        content = file.read()
    
    # Update the environment variable
    new_content = re.sub(
        fr'ENV {env_variable} .*',
        f'ENV {env_variable} {new_value}',
        content
    )
    
    # Write the updated content back to the Dockerfile
    with open(dockerfile_path, 'w') as file:
        file.write(new_content)

# Retrieve tag name and message
if len(sys.argv) == 3:
    # Retrieve the command line arguments
    task_definition_file = sys.argv[1] 
    service_name = sys.argv[2]
else:
    task_definition_file = 'CI/task_definition.json'
    service_name = 'SFM-Main-Service'
                            
# Read version from package.json
with open('package.json', 'r') as file:
    json_data = json.load(file)
    version = json_data.get('version', None)

versionFolderPath = f'{version}.tar.gz'
compress_directory(versionFolderPath)

# Read the imageDesploy YAML file
with open(task_definition_file, 'r') as file:
    json_data = json.load(file)

# Retrieve the "image" value and update it to version read from package.json
if 'containerDefinitions' in json_data and 'image' in json_data['containerDefinitions'][0]:
    image_value = json_data['containerDefinitions'][0]['image']
    # Find the index of the colon
    colon_index = image_value.rfind(':')

    if colon_index != -1:
        # Replace the substring after the colon with 'version'
        new_ver_image_name = image_value[:colon_index + 1] + version
        json_data['containerDefinitions'][0]['image'] = new_ver_image_name

# Write the modified YAML data back to a new file
with open(task_definition_file, 'w') as file:
    json.dump(json_data, file, indent=4)

# Update docker file with DB URL as an environment variable
dockerfile_path = 'Dockerfile'  # Change this to the correct path of your Dockerfile
env_variable = 'NEXT_PUBLIC_DB_URL'
build_new_value = 'https://sfm.skysoftcloud.com:3001'
develop_new_value = 'https://fleetmanagerbackapidev-gwa0dyf5ehd7h6gf.israelcentral-01.azurewebsites.net'

if ('SFM-Build-Service' == service_name):
    update_env_variable(dockerfile_path, env_variable, build_new_value)
    print(f"Updated {env_variable} to {build_new_value} in {dockerfile_path}")

elif ('SFM-Develop-Service' == service_name):
    update_env_variable(dockerfile_path, env_variable, develop_new_value)
    print(f"Updated {env_variable} to {develop_new_value} in {dockerfile_path}")

# build docker image
print('Build docker image\n', flush=True)
command = f'sudo docker build  -t {new_ver_image_name} .'
result = subprocess.run(command,  shell=True)
if result.returncode != 0:
    exit(1)
 
# get ECR credentials
print('Connect to docker with aws credentials\n', flush=True)
command = f'aws ecr get-login-password --region us-east-1 | sudo docker login --username AWS --password-stdin 576484145184.dkr.ecr.us-east-1.amazonaws.com'
result = subprocess.run(command, shell=True)
if result.returncode != 0:
    exit(1)

# push docker image to AWS ECR
print('Push docker image to ECR\n', flush=True)
command = f'sudo docker push {new_ver_image_name}'
result = subprocess.run(command, shell=True)
if result.returncode != 0:
    exit(1)

# Update task definition
print('Update task definition\n', flush=True)
command = f'aws ecs register-task-definition --cli-input-json file://{task_definition_file}'
result = subprocess.run(command, shell=True, capture_output=True, text=True)
task_definition = json.loads(result.stdout)['taskDefinition']['taskDefinitionArn']

print(result.stdout)
if result.returncode != 0:
    exit(1)

# Update service with new task definition
print('Update service with new task definition\n', flush=True)
command = f' aws ecs update-service --cluster SFM-Cluster --service {service_name} --task-definition {task_definition}'
print(command)
result = subprocess.run(command, shell=True, capture_output=True, text=True)
print(result.stdout)

if result.returncode != 0:
    exit(1)
