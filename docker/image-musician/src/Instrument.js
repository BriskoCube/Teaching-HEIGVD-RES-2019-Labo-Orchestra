

module.exports = class Instrument {

    static availibleInstruments = [
        {
            name: "piano",
            sound: "ti-ta-ti"
        }, {
            name: "trumpet",
            sound: "pouet"
        }, {
            name: "flute",
            sound: "trulu"
        }, {
            name: "violin",
            sound: "gzi-gzi"
        }, {
            name: "drum",
            sound: "boum-boum"
        }
    ];

    constructor(instrument) {
        this.name = instrument.name;
        this.sound = instrument.sound;
    }


    static getRandom()  {
        const instruments = Instrument.availibleInstruments;
        const randVal = Instrument.getRandomInt(0, instruments.length - 1);

        return new Instrument(instruments[randVal])
    }

    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};