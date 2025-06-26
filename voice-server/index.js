const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3001 });

console.log("🎧 Voice WebSocket server running on ws://localhost:3001");

server.on('connection', socket => {
  console.log('🔗 New connection');

  socket.on('message', msg => {
    server.clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  socket.on('close', () => {
    console.log('❌ Connection closed');
  });
});
