# openshift_app_mjt

This is a sample Node/React/Redux/Socket.io app used for creating Docker containers and deploying them with OpenShift. While not required, it connects via socket to [openshift_app_api_mjt](https://github.com/mjtischler/openshift_app_api_mjt).

## Installation

You need both [Node 10+](https://nodejs.org/en/download/) and [Docker 19+](https://docs.docker.com/install/) installed on your machine to run this locally. Run `npm install` from both the `/client` and `/server` directories, then from `/server`:

```bash
# Runs a concurrent local development server for both the React and Node apps, and watches for changes
npm run dev

# or

# Builds the client and server apps in production mode and starts a production instance
npm start
```

## Authorization

Access controls are stored in [/server/src/auth.js](https://github.com/mjtischler/openshift_app_mjt/blob/develop/server/src/auth.js), and they will need to be defined before running the app or creating a Docker image.

**NOTE**: This is a poor way of handling authorization and should only be used for testing/learning.

Alternatively, you can create a parallel repo and store this auth data in `process.env` by defining each key in the Dockerfile or as secrets (see *Environmental Variables* below). Again, these are to be used only for testing. For easier management, you can add [dotenv](https://github.com/motdotla/dotenv#readme) to project.

## Environmental Variables

```
NODE_ENV                # Defaults to production
COMPONENT_BACKEND_HOST  # The socket machine's IP address. *Optional, defaults to localhost*
COMPONENT_BACKEND_PORT  # The socket machine's IP address. *Required, defaults to 8081*
SOCKET_TOKEN_SECRET     # The string used to validate the socket connection to the API


# These can be stored either in `process.env` or in `server\src\auth.js`
USER_ID       # Any UUID
USER_NAME     # User name for logging in from the client app
USER_PW       # Hashed password
TOKEN_SECRET  # Client-server JWT token secret
SERVER_ID     # Any UUID
SERVER_NAME   # Used for signing the JWT for validating to the socket
```

## Docker Commands

```bash
# Build the Docker image
docker build -t ${your_name}/openshift_app_mjt .

# View List of Docker Images
docker images

# View list of Docker networks
docker network ls

# Run Docker Image (--network allows communication between images on the same host)
docker run --network=bridge --name=app -it -d -p 8080:8080 -d ${your_name}/openshift_app_mjt

# View Recent Docker Statuses (You can view your local instance at http://localhost:8080/)
docker ps -a

# Get IP addresses of all images on the network bridge. Useful for local deploys.
docker network inspect bridge # Look for the `Containers` object

# Start Bash Terminal in Docker Instance
docker run -it --entrypoint /bin/bash ${your_name}/openshift_app_mjt -s

# Clean up images
docker system prune # WARNING: Append with -a to delete all non-running images

# Tag an image and push it to your Docker repo
# NOTE: Required before deploying to OpenShift
docker tag ${your_name}/openshift_app_mjt:${tag} ${your_docker_repo}:${tag}
docker push ${your_docker_repo}/openshift_app_mjt:${tag}
```

When deploying to OpenShift, your Docker Hub url will be formed as:

`docker.io/${your_docker_hub}/openshift_app_mjt:${tag}`






