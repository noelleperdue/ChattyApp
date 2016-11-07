const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');


const PORT = 5000;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


const wss = new SocketServer({ server });

let message;
let counter = 0;

wss.on('connection', (ws) => {
  console.log('Client connected');
  counter++;
  wss.broadcast ({type: 'counter', count: counter})

  wss.broadcast(message);

  ws.on('message', handleMessage);

  ws.on('close', () => {
    console.log('Client disconnected')
    counter--;
    wss.broadcast ({type: 'counter', count: counter})
  });
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