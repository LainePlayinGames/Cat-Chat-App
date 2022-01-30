const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;


var nickname;

let messages = ['test', 'test2']

var timeText;
var reportNumber = 1;
var connectedUserCount = 0;
var totalMessages = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var days = 0;

var intervalID = setInterval(sendMessage, [1000]);

function sendMessage() {
  console.log("");
	console.log("System check #" + reportNumber);
	console.log("Connected Clients: " + connectedUserCount);
	console.log("Total Chats Sent: " + totalMessages);
	console.log("");
	console.log(":UPTIME:" + days + ":" + hours + ":" + minutes + ":" + seconds);
	console.log(seconds + " Seconds");
	console.log(minutes + " Minutes");
	console.log(hours + " Hours");
	console.log(days + " Days");
	io.emit('uptime',(days + ":" + hours + ":" + minutes + ":" + seconds) )
	reportNumber++;
	seconds++;
	countUp();
}
function countUp() {
  if(seconds >= 60){
		seconds = 0;
		minutes++;
	}
	if(minutes >= 60){
		minutes = 0;
		hours++;
	}
	if(hours >= 24){
		hours = 0;
		days++;
	}
}

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
	console.log(socket.handshake.address);
	var client_ip_address = socket.request.connection.remoteAddress;
	socket.on('chat message', msg => {
		io.emit('chat message', socket.nickname + " >> " + msg);
		let newLength = messages.push(socket.nickname + " >> " + msg);
		console.log("");
		console.log(socket.nickname + " " + msg);
		console.log("ID: " + socket.id)
		console.log("");
		totalMessages++;
	});
});
io.on('connection', (socket) => {
	console.log('User Joined');
	connectedUserCount++;
	socket.broadcast.emit('system message', "🔌SOMONE JOINED🔌");


	socket.on('disconnect', () => {
		console.log('User Left');
		connectedUserCount--;
		io.emit('system message', "🔌" + socket.nickname + " LEFT🔌");
	});
});
http.listen(port, () => {
	console.log(`Socket.IO server running at http://localhost:${port}/`);
});
io.on('connection', function (socket) {
	socket.on('send-nickname', function (nickname) {
		if (nickname == "") {
			// Send a new call to get a valid username.
			return;
		}
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