# # pull official base image
# FROM node:13.12.0-alpine

# # set working directory
# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install app dependencies
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install

# # add app
# COPY . ./

# # start app
# CMD ["npm", "start"]   

# # pull official base image
# FROM node:13.12.0-alpine
# # set working directory
# WORKDIR /app
# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH
# # install app dependencies
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent
# # add app
# COPY . ./
# # start app
# CMD ["npm", "start"]


# pull official base image
FROM node:19.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
# below is the change to make rpi work with node now root issue permissions with node modules direc
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache 
RUN npm update
RUN npm install @babel/helper-compilation-targets --save-dev
RUN npm install react-scripts@3.4.1 -g --silent

#USER node

# add app
COPY . ./

# start app
CMD ["npm", "start"]