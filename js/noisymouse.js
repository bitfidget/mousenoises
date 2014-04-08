$(document).ready(function(){

  var winWidth = $(window).width();
  var winHeight = $(window).height();

  // all possible notes and sounds from band.js
  var notesArray = ['C0', 'C#0', 'Db0', 'D0', 'D#0', 'Eb0', 'E0', 'F0', 'F#0', 'Gb0', 'G0', 'G#0', 'Ab0', 'A0', 'A#0', 'Bb0', 'B0', 'C1','C#1','Db1','D1','D#1','Eb1','E1','F1','F#1','Gb1','G1','G#1','Ab1','A1','A#1','Bb1','B1','C2','C#2','Db2','D2','D#2','Eb2','E2','F2','F#2','Gb2','G2','G#2', 'Ab2', 'A2', 'A#2', 'Bb2', 'B2', 'C3', 'C#3', 'Db3', 'D3', 'D#3', 'Eb3', 'E3', 'F3', 'F#3', 'Gb3', 'G3', 'G#3', 'Ab3', 'A3', 'A#3', 'Bb3', 'B3', 'C4', 'C#4', 'Db4', 'D4', 'D#4', 'Eb4', 'E4', 'F4', 'F#4', 'Gb4', 'G4', 'G#4', 'Ab4', 'A4', 'A#4', 'Bb4', 'B4', 'C5', 'C#5', 'Db5', 'D5', 'D#5', 'Eb5', 'E5', 'F5', 'F#5', 'Gb5', 'G5', 'G#5', 'Ab5', 'A5', 'A#5', 'Bb5', 'B5', 'C6', 'C#6', 'Db6', 'D6', 'D#6', 'Eb6', 'E6', 'F6', 'F#6', 'Gb6', 'G6', 'G#6', 'Ab6', 'A6', 'A#6', 'Bb6', 'B6', 'C7', 'C#7', 'Db7', 'D7', 'D#7', 'Eb7', 'E7', 'F7', 'F#7', 'Gb7', 'G7', 'G#7', 'Ab7', 'A7', 'A#7', 'Bb7', 'B7', 'C8'];
  var noisesArray = ['white', 'pink', 'brown', 'brownian', 'red']
  var oscillatorsArray = ['sine', 'square', 'sawtooth', 'triangle']

  // create the grid
  var notesSize = winWidth / notesArray.length;
  var noiseSize = winHeight / (noisesArray.length + oscillatorsArray.length);

  // create the new BandJS instance
  var mouseNoise = new BandJS();
    mouseNoise.setTimeSignature(4, 4);
    mouseNoise.setTempo(120);

  // play notes according to mouseposition
  $(document).mousemove(function( mousey ) {
    // get and show the mouse position
    var mouseX = mousey.pageX
    var mouseY = mousey.pageY
    $( "#coords-x" ).text(mouseX);
    $( "#coords-y" ).text(mouseY);

    // get and show the note played (according to X pos)
    var mouseNote = notesArray[Math.floor(mouseX / notesSize)];
    $( "#note" ).text(mouseNote);

    // get and show the instrument played (according to Y pos)
    if (mouseY > (noiseSize * 4)){
      var instrumentType = 'oscillators';
      var instrumentFlavour = oscillatorsArray[Math.floor((mouseY - (noiseSize * 4) ) / noiseSize)];
    } else {
      var instrumentType = 'noises';
      var instrumentFlavour = noisesArray[Math.floor(mouseY / noiseSize)];
    }
    $( "#instrument" ).text(instrumentType);
    $( "#noise" ).text(instrumentFlavour);
    console.log(Math.floor(mouseY / noiseSize))

    // all the BandJS S that makes the noise noise
    var mn = mouseNoise.createInstrument(instrumentFlavour, instrumentType);
      mn.note('whole', mouseNote);
      mn.repeat(4);
      mn.finish();
    mouseNoise.destroy();
    mouseNoise.play();

  });
});
// note length
// BandJS.loadPack('rhythm', 'northAmerican', {
//     whole: 1,
//     dottedHalf: 0.75,
//     half: 0.5,
//     dottedQuarter: 0.375,
//     tripletHalf: 0.33333334,
//     quarter: 0.25,
//     dottedEighth: 0.1875,
//     tripletQuarter: 0.166666667,
//     eighth: 0.125,
//     dottedSixteenth: 0.09375,
//     tripletEighth: 0.083333333,
//     sixteenth: 0.0625,
//     tripletSixteenth: 0.041666667,
//     thirtySecond: 0.03125
// });