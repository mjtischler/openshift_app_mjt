FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Set ENV variables
ENV SKIP_PREFLIGHT_CHECK=true
ENV NODE_ENV=production
# The route to the `openshift_app_api_mjt` app provided by OpenShift.
# This can be found under Administrator -> Networking -> Services -> Location (e.g. http://171.31.61.172)
# When deploying locally, point to the IP of the local docker socket image (e.g. http://172.0.1.2).
# Comment to use localhost.
#ENV SOCKET_URL=

# Bundle app source
COPY . .

# Install app dependencies
RUN npm --prefix ./server install
RUN npm --prefix ./client install
RUN npm --prefix ./client run build
RUN npx mkdirp server/dist/client
RUN cp -r ./client/build ./server/dist/client
RUN npx babel-cli ./server/src --out-dir server/dist/ --ignore ./server/node_modules,./server/.babelrc,./server/package.json,./server/npm-debug.log --copy-files
RUN npx rimraf client/build

USER 9000
EXPOSE 8080
CMD npm --prefix ./server run docker