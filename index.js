const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
var nickname; 



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
  console.log(socket.handshake.address);
    var client_ip_address = socket.request.connection.remoteAddress;
  socket.on('chat message', msg => {
    io.emit('chat message',socket.nickname + " >> " + msg);
		console.log("");
		console.log(socket.nickname + " " + msg);
		console.log("ID: " + socket.id)
		console.log("");
  });
});
io.on('connection', (socket) => {
	console.log('User Joined');
	socket.broadcast.emit('system message', "🔌SOMONE JOINED🔌");
  socket.on('disconnect', () => {
		console.log('User Left');
    io.emit('system message', "🔌" + socket.nickname + " LEFT🔌");
  });
});
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
io.on('connection', function(socket) {
	socket.on('send-nickname', function(nickname) {
    socket.nickname = nickname;
		console.log("    ");
				console.log("    ");
						console.log("    ");
		console.log("Username: " + nickname);
		console.log("Socket Username: " + socket.nickname);
		console.log("Socket ID: " + socket.id);
		console.log("Address: " + socket.handshake.address);
				console.log("    ");
						console.log("    ");
								console.log("    ");
});
});