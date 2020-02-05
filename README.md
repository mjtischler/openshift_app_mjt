# openshift_app_mjt
-------------------
This is a sample Node/React/Redux/Socket.io app used for creating Docker containers and deploying them with OpenShift. While not required, it connects via socket to [openshift_app_api_mjt](https://github.com/mjtischler/openshift_app_api_mjt).

## Installation
---------------
You need both [Node 10+](https://nodejs.org/en/download/) and [Docker 19+](https://docs.docker.com/install/) installed on your machine to run this locally. Run `npm install` from both the `/client` and `/server` directories, then from `/server`:

```bash
# Runs a concurrent local development server for both the React and Node apps, and watches for changes
npm run dev

# or

# Builds the client and server apps in production mode and starts a production instance
npm start
```

## Authorization
----------------
Access controls are stored in [/server/src/auth.js](https://github.com/mjtischler/openshift_app_mjt/blob/develop/server/src/auth.js), and they will need to be defined before running the app or creating a Docker image.

**NOTE**: This is a poor way of handling authorization and should only be used for testing/learning.

## Docker Commands
------------------
```bash
# Build the Docker image
docker build -t ${your_name}/openshift_app_mjt .

# View List of Docker Images
docker images

# View list of Docker networks
docker network ls

# Run Docker Image (--network allows communication between images on the same host)
docker run --network=bridge --name=app -it -d -p 49160:8080 -d ${your_name}/openshift_app_mjt

# View Recent Docker Statuses (You can view your local instance at http:#localhost:49160/)
docker ps -a

# Start Bash Terminal in Docker Instance
docker run -it --entrypoint /bin/bash ${your_name}/openshift_app_mjt -s
```












