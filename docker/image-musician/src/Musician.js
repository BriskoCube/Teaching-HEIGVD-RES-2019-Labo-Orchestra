var Instrument = require("./Instrument.js");
var dgram = require('dgram');
const uuid = require('uuid/v4');


module.exports = class Musician{

    ip = "239.123.123.123";
    port = 12345;

    constructor(){
        this.uuid = uuid();
        this.instrument = Instrument.getRandom();

        this.socket = dgram.createSocket('udp4');
    }

    play(){
        const data = {
            uuid: this.uuid,
            instrument: {
                name: this.instrument.name,
                sound: this.instrument.sound
            }
        };
        const instrument = this.instrument;

        let message = new Buffer(JSON.stringify(data));

        this.socket.send(message, 0, message.length, this.port, this.ip, function(err, bytes) {
            console.log(`I'm playing ${instrument.name} which sounds ${instrument.sound}`);
        });
    }
};