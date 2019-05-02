
var net = require('net');
var dgram = require('dgram');


const ip = "239.123.123.123";
const port = 12345;


const s = dgram.createSocket('udp4');
s.bind(port, function() {
	console.log("Joining multicast group");
	s.addMembership(ip);
});


var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');

	s.on('message', function(msg, source) {
		socket.write(`Data has arrived: ${msg}. Source port:${source.port}\n`);
	})

}).listen(2205);

