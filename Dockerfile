FROM node:10 as builder

# Temporary working directory
WORKDIR /tmp

# Copy the local repo to the working directory
COPY . .

# Install app dependencies
RUN npm --prefix ./server install && \
    npm --prefix ./client install && \
    npm --prefix ./client run build && \
    npx mkdirp server/dist/client && \
    cp -r ./client/build ./server/dist/client && \
    npx rimraf client && \
    npx babel-cli ./server/src --out-dir server/dist/ --ignore ./server/node_modules,./server/.babelrc,./server/package.json,./server/npm-debug.log --copy-files

# Switch out of builder mode
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Copy the compiled assets to reduce image size
COPY --from=builder tmp/ .

# Set ENV variables
ENV SKIP_PREFLIGHT_CHECK=true \
    NODE_ENV=production
    # The route to the `openshift_app_api_mjt` app provided by OpenShift.
    # This can be found under Administrator -> Networking -> Services -> Location (e.g. http://171.31.61.172)
    # When deploying locally, point to the IP of the local docker socket image (e.g. http://172.0.1.2).
    # Comment to use localhost (i.e. non-Docker deployments)
    # SOCKET_URL=

USER 9000
EXPOSE 8080
CMD npm --prefix ./server run docker