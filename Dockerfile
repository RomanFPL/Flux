# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development
ENV NEXT_PUBLIC_DB_URL https://fleetmanagerbackapi.azurewebsites.net

# Setting up the work directory
WORKDIR /react-app

# Installing dependencies
COPY ./package.json /react-app
RUN npm install

# Setting up the work directory
WORKDIR /react-app

# Copying all the files in our project
COPY . .

RUN npm run build

# Setting up the work directory
WORKDIR /react-app

# Copying all the files in our project
COPY . .

# Starting our application
CMD npm start
