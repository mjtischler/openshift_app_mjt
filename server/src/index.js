/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import passwordHash from 'password-hash';
import jwt from 'jsonwebtoken';
import auth from './auth.js';
import io from 'socket.io-client';

const app = express();
const environment = process.env.NODE_ENV || 'production';
const socketUrl = process.env.SOCKET_URL || 'http://localhost';
const port = environment === 'production' ? 8080 : 5000;
const ioSocketPort = 8081;
const ioSocketUrl = `${socketUrl}:${ioSocketPort}`;

const socketToken = jwt.sign({ id: auth.serverId, serverName: auth.serverName }, auth.socketTokenSecret);
const ioSocket = io.connect(ioSocketUrl, {
  reconnection: true,
  query: { token: socketToken }
});

ioSocket.on('connect', () => {
  console.log(`Connected to socket at ${ioSocketUrl}`);
});

ioSocket.on('serverResponse', (data) => {
  console.log('Received an event:', data);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/logout', (req, res) => {
  res.status(200).json({loggedIn: false});
});

app.post('/api/login', (req, res) => {
  if (
    auth &&
    auth.userId &&
    auth.username &&
    auth.username === req.body.username &&
    auth.password && passwordHash.verify(req.body.password, auth.password) &&
    auth.tokenSecret
  ) {
    const token = jwt.sign({ id: auth.userId, username: auth.username }, auth.tokenSecret, { expiresIn: 1800 });
    res.status(200).json({
      message: 'Login Successful!',
      token,
      loggedIn: true
    });
  } else {
    res.status(200).json({
      message: 'Login Failed!'
    });
  }
});

app.get('/api/data', (req, res) => {
  if (!req.headers.token) {
    res.status(401).json({data: 'Access Denied'});
  } else {
    // eslint-disable-next-line no-unused-vars
    jwt.verify(req.headers.token, auth.tokenSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({data: 'Access Expired'});
      } else if (ioSocket && ioSocket.connected && auth && auth.userId) {
        ioSocket.emit('clientEvent', auth.userId, (message) => {
          res.status(200).json({data: message});
        });
      } else {
        res.status(200).json({data: 'Server Socket Not Connected'});
      }
    });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`App served on port ${port} in the ${environment} environment`);
  console.log(`Socket.io url is defined as ${ioSocketUrl}`);
  console.log(`${ioSocketUrl === 'http://localhost:8081' ? 'WARNING: Local Docker instances must point to the IP of the socket app rather than localhost (e.g. 172.0.1.3) \n^^^If you\'re running outside of Docker you can ignore this warning.^^^' : ''}`);
});

export default app;
