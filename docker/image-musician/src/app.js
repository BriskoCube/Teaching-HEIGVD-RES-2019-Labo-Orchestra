let Musician = require("./Musician");

let musician = new Musician();

setInterval(function () {
    musician.play();
}, 1000);