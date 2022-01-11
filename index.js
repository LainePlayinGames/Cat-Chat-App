const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const userName = 


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
  console.log(socket.handshake.address);
    var client_ip_address = socket.request.connection.remoteAddress;
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
		console.log("-- " + msg);
  });
});
io.on('connection', (socket) => {
	console.log('User Joined');
	socket.broadcast.emit('system message', "🔌USER JOINED🔌");
  socket.on('disconnect', () => {
		console.log('User Left');
    io.emit('system message', "🔌USER LEFT🔌");
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});