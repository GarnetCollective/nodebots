var five = require("johnny-five");
var pins = require("./esp8266Pins");

var board = new five.Board({
  port: "/dev/cu.usbserial-1410"
});

var presses = 0;

board.on("ready", function() {
  console.log("READY!");
  var led = new five.Led(pins.led);
  led.blink(500);

  var button = new five.Button(pins.d1);

  var piezo = new five.Piezo(pins.d5);

  button.on("press", function() {
    if (presses > 2) {
      console.log("What the fuck man. Stop!");
      piezo.play({
        // song is composed by an array of pairs of notes and beats
        // The first argument is the note (null means "no note")
        // The second argument is the length of time (beat) of the note (or non-note)
        song: [
          ["C4", 1 / 4],
          ["D4", 1 / 4],
          ["F4", 1 / 4],
          ["D4", 1 / 4],
          ["A4", 1 / 4],
          [null, 1 / 4],
          ["A4", 1],
          ["G4", 1],
          [null, 1 / 2],
          ["C4", 1 / 4],
          ["D4", 1 / 4],
          ["F4", 1 / 4],
          ["D4", 1 / 4],
          ["G4", 1 / 4],
          [null, 1 / 4],
          ["G4", 1],
          ["F4", 1],
          [null, 1 / 2]
        ],
        tempo: 100
      });
    } else {
      console.log("Ouch!");
    }
    presses++;
  });
});
