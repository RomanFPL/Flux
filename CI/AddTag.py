
import requests
import subprocess
import sys
import json

# Bitbucket credentials
username = 'username'
password = 'password'

# Repository details
workspace = 'citeskysoft'
repository = 'camtek-sfm'

# Base URL for Bitbucket API
base_url = "https://api.bitbucket.org/2.0"
print(f'''open('package.json', 'r')''')
# Read version from package.json
with open('package.json', 'r') as file:
    json_data = json.load(file)
    version = json_data.get('version', None)

print(f'version:  {version}')

# Retrieve commit hash
command = f'''git log -n 1 --pretty=format:"%H"'''
commit_hash = subprocess.check_output(command, shell=True, text=True)

print(f'commit_hash:  {commit_hash}')

# Retrieve tag name and message
if len(sys.argv) == 3:
    # Retrieve the command line arguments
    username = sys.argv[1] 
    password = sys.argv[2] 
    
print(f'username:  {username}')

# Authenticate with Bitbucket
auth = (username, password)

# Create a new tag
tag_url = f"{base_url}/repositories/{workspace}/{repository}/refs/tags"
tag_data = {
    "name": version,
    "target": {
        "hash": commit_hash
    },
    "message": version
}

print(f'tag_data:  {tag_data}')

response = requests.post(tag_url, json=tag_data, auth=auth)

# Check the response status
if response.status_code == 201:
    print("Tag published successfully!")
else:
    print(f"Failed to publish tag. Status code: {response.status_code}")
    print(response.text)
    sys.exit(1)