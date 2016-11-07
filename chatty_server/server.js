const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');


const PORT = 5000;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


const wss = new SocketServer({ server });

let message;

wss.on('connection', (ws) => {
  console.log('Client connected');
  var usersOnline = wss.clients.length;
  var Online = {usersOnline: usersOnline};
  console.log(usersOnline);

  wss.broadcast(message);

  ws.on('message', handleMessage);

  ws.on('close', () => console.log('Client disconnected'));
});

wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(JSON.stringify(data));
  });
};


function handleMessage(message) {
  message = JSON.parse(message);
  message.id = uuid.v4();
  wss.broadcast(message);




}