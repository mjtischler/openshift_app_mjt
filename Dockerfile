FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ./server/package*.json ./server/
RUN npm --prefix ./server install

COPY ./client/package*.json ./client/
RUN npm --prefix ./client install

# Bundle app source
COPY . .

EXPOSE 8080
CMD npm --prefix ./server start