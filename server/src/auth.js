// This is a poor way to handle secure values. Store user data in a DB, and secrets elsewhere.
// Using process.env here is a way to test automatic Docker builds from a parallel repo.

const getAuthValues = (env = {}) => ({
  userId: env.USER_ID || '', // Any UUID will do
  username: env.USER_NAME || '', // User name for logging in from the client app
  password: env.USER_PW || '', // Add hashed password here
  tokenSecret: env.TOKEN_SECRET || '', // Add JWT secret token string here
  serverId: env.SERVER_ID || '', // Any UUID will do
  serverName: env.SERVER_NAME || '', // Used for signing the JWT for validating via the socket
  socketTokenSecret: env.SOCKET_TOKEN_SECRET || '' // Add socket secret token here. Must match token in openshift_app_api_mjt.
});

export default getAuthValues;
