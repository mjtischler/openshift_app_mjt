// This is a poor way to handle secure values. Store user data in a DB, and secrets elsewhere.

const auth = {
  userId: '', // Any UUID will do
  username: '',
  password: '', // Add hashed password here
  tokenSecret: '', // Add JWT secret token string here
  serverId: '', // Any UUID will do
  serverName: '',
  socketTokenSecret: '' // Add socket secret token here
};

export default auth;
