from atlassian import Confluence
from jira import JIRA
import re
import subprocess
from datetime import datetime
import json
import sys

# Set up Atlasian connection
url = "https://citeskysoft.atlassian.net"
username = "username"
password = 'password'
space_key = "CSFM"
jira_project='CSFM'
customer_name = 'Camtek'
project_name = 'Service Fleet Manager'
aws_ecr_repo='sfm'
version1 = ''
version2 = ''
versionFolderPath=''

print('VDD-Script starting.')

if len(sys.argv) == 3:
    username = sys.argv[1] 
    password = sys.argv[2] 

# Read version from package.json
with open('package.json', 'r') as file:
    json_data = json.load(file)
    version1 = json_data.get('version', None)

# Gather GIT last two tags #
command = f'git tag --sort=-version:refname'
output = subprocess.check_output(command, shell=True, text=True)
tag_list = output.strip().split("\n")
version2 = tag_list[0]

print('versionFolderPath: [' + versionFolderPath + ']')
print('Tag one: [' + version1 + '], Tag two: [' + version2 + ']')

###########################################################################
#################################
# Gather GIT version 1 tag date #
#################################
command = f'git log -1 --format=%ai "HEAD"'
output = subprocess.check_output(command, shell=True, text=True)
date_format = '%Y-%m-%d %H:%M:%S %z'

# Parse the date string
date = datetime.strptime(output.strip(), date_format)

# Extract the date
version1TagDate = date.strftime('%d/%m/%Y')
version1TagUsDate = date.strftime('%Y-%m-%d')

print('version1TagDate" [' + version1TagDate + ']')
print('version1TagUsDate" [' + version1TagUsDate + ']')

####################
# Gather jira bugs #
####################
JIRA_QUERY = f'project = "{jira_project}" AND issuetype in (Bug, Sub-Bug) and status was in ("Open", "Selected for Development", "To Do", "In Progress", "Pending input") ON ('+ version1TagUsDate +') and status was not in (Done, "To due", Testing) ON ('+ version1TagUsDate +') order by priority'

# Connect to Jira
jira = JIRA(server=url, basic_auth=(username, password))

# Run Jira query
issues = jira.search_issues(JIRA_QUERY)

bugsIssuesString = ''
# Print the results
for issue in issues:
    bugsIssuesString+=f'<a href="https://citeskysoft.atlassian.net/browse/{issue.key}">https://citeskysoft.atlassian.net/browse/{issue.key}</a>\n'

###########################################################################
############################
# Find version sanity test #
############################
JIRA_QUERY = f'project = {jira_project} AND issuetype = "Test Execution" AND text ~ "{version1}*" order by created DESC'

# Run Jira query
sanityIssues = jira.search_issues(JIRA_QUERY)
sanityIssueKey = 'N/A'

if (sanityIssues.total >= 1):
    sanityIssueKey = f'<a href="https://citeskysoft.atlassian.net/browse/{sanityIssues[0].key}">https://citeskysoft.atlassian.net/browse/{sanityIssues[0].key}</a>\n'

###########################################################################
######################
# Gather GIT commits #
######################
def extract_smsh_text(text):
    pattern = r'CSFM-\d+'  # Regular expression pattern to match "SMSH-" followed by numbers
    matches = re.findall(pattern, text)
    return matches

# Run the command with the input version tags and capture the output
command = f'git log --pretty=oneline --no-merges "{version2}"..."HEAD"'
output = subprocess.check_output(command, shell=True, text=True)

result = set(extract_smsh_text(output))
bugsCommitsString = ''
changesCommitsString = ''

for item in result:
    issue = jira.issue(item)
    if ((issue.fields.issuetype.name == 'Bug') or (issue.fields.issuetype.name == 'Sub-Bug')):
        bugsCommitsString += '<a href="https://citeskysoft.atlassian.net/browse/' + item + '">https://citeskysoft.atlassian.net/browse/' + item + '</a>\n'
    elif ((issue.fields.issuetype.name == 'Task') or (issue.fields.issuetype.name == 'Sub-Task')):
           changesCommitsString += '<a href="https://citeskysoft.atlassian.net/browse/' + item + '">https://citeskysoft.atlassian.net/browse/' + item + '</a>\n'

tagLinkString = 'https://bitbucket.org/citeskysoft/pigyonate/commits/tag/' + version1

###########################################################################
###########################
# Createa a Confluence page
###########################
confluence = Confluence(url=url, username=username, password=password)

# Createa a Confluence page
title = f'{project_name} version '+ version1 + ' release form'
releasePage = confluence.get_page_by_title(space=space_key, title='Software releases')
page = confluence.create_page(space=space_key, title=title, body="", parent_id=releasePage['id'])

###########################################################################
###########################
# Attach image file URL
###########################
image_uri = f'576484145184.dkr.ecr.us-east-1.amazonaws.com/{aws_ecr_repo}:{version1}'

###########################
# Attach image file 
###########################
# Upload the file to Confluence
image_file_name = f'{version1}.tar.gz'
if (image_file_name != ''):
    response = confluence.attach_file(filename = image_file_name, page_id = page['id'], content_type='application/octet-stream')
    attachment_link = response['_links']['base'] + response['results'][0]['_links']['download']

###########################################################################
###########################
# Createa a Confluence page
###########################
content = f'''
<table>
    <tr>
        <td><strong>Customer Name</strong></td>
        <td>{customer_name}</td>
    </tr>
    <tr>
        <td><strong>Project Name</strong></td>
        <td>{project_name}</td>
    </tr>
    <tr>
        <td><strong>Version Number</strong></td>
        <td>{version1}</td>
    </tr>
    <tr>
        <td><strong>Version Description</strong></td>
        <td>Version contains changes between {version1} and {version2}</td>
    </tr>
    <tr>
        <td><strong>Date</strong></td>
        <td>{version1TagDate}</td>
    </tr>
    <tr>
        <td><strong>Released By</strong></td>
        <td>Alon Mekel</td>
    </tr>
    <tr>
        <td><strong>Changes and Fixes</strong></td>
        <td><strong>Changes:</strong>\n{changesCommitsString}<strong>Bugs fixed:</strong>\n{bugsCommitsString}</td>
    </tr>
    <tr>
        <td><strong>Known Issues</strong></td>
        <td>{bugsIssuesString}</td>
    </tr>
    <tr>
        <td><strong>AWS ecr image URL</strong></td>
		<td>{image_uri}</td>
    </tr>
    <tr>
        <td><strong>Source code zip file</strong></td>
		<td>N/A</td>
    </tr>
    <tr>
        <td><strong>Source code link</strong></td>
        <td><a href="{tagLinkString}">{tagLinkString}</a></td>
    </tr>
</table>
'''

# Create the page
page = confluence.update_page(page_id=page['id'], title=title, body=content)