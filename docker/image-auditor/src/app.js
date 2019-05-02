var net = require('net');
var dgram = require('dgram');


const ip = "239.123.123.123";
const port = 12345;
const TIMEOUT = 4000; // 4s
const PORT = 2205;

let activeMusicians = [];

const s = dgram.createSocket('udp4');
s.bind(port, function () {
    console.log("Joining multicast group");
    s.addMembership(ip);
});

s.on('message', function (msg, source) {
    const data = JSON.parse(msg);
    //console.log(`Someone is making noise With ${msg.instrument.name}. \n`);
    let foundMusician = activeMusicians.find((musician) => musician.uuid === data.uuid);
    if (foundMusician === undefined) {
        activeMusicians = [...activeMusicians, {
            uuid: data.uuid,
            instrument: data.instrument.name,
            activeSince: new Date(),
            seen: new Date()
        }];
    } else {
        foundMusician.seen = new Date();
    }
});

setInterval(function () {
    activeMusicians = activeMusicians.filter((musician) => {
        return (new Date).getTime() - musician.seen.getTime() < TIMEOUT
    });
}, TIMEOUT);

var server = net.createServer(function (socket) {
    socket.write(JSON.stringify(activeMusicians.map(musician => {
        return {
            uuid: musician.uuid,
            instrument: musician.instrument,
            activeSince: musician.activeSince.toISOString(),
        }
    })));
    socket.end();

}).listen(PORT);

