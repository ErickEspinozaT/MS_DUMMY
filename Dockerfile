#Crear y dar nombre a la imagen de docker
#docker build -t ms-dummy:latest .

#Maintainer="Leonardo Espinoza <lespinoza@telconet.ec>" 
#Description="Dockerizacion de front-end app-front-monitor-elemento"

# base image
FROM node:10.16.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install nodemon --save-dev

# add app
COPY . /app

# start app
CMD nodemon app.js

#Linux: docker run -v %cd%:/app -v /app/node_modules -p 3021:3020 ms-dummy:latest
#windows: docker run -v %cd%:/app -v /app/node_modules -p 3021:3020 ms-dummy:latest

