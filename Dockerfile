# get the base node image
FROM node:15.13-alpine

# set the working dir for container
WORKDIR /frontend

ENV PATH="./node_modules/.bin:$PATH"

# copy the json file first
# COPY ./package.json /frontend

# install npm dependencies
# RUN npm install

# copy other project files
COPY . .
RUN npm install
RUN npm run build
# build the folder
CMD [ "npm",  "start" ]