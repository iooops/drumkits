
// Keep track of all loaded buffers.
var BUFFERS = {};
// Page-wide audio context.
var context = null;

var loaded=0;

// An object to track the buffers to load {name: path}
var BUFFERS_TO_LOAD = {
  kick: 'audio/HH_JKick23.wav',
  snare: 'audio/HH_Snare61.wav',
  tom1: 'audio/HH_JTom1.wav',
  tom2: 'audio/HH_JTom2.wav',
  tom3: 'audio/HH_JTom4.wav',
  hihatclose: 'audio/HH_Hat1.wav',
  hihatopen: 'audio/HH_Hat2.wav',
  crash: 'audio/HH_Crash4.wav',
  ride: 'audio/HH_JPRide1.wav',
  beat: 'audio/beat.wav',
  rev1:  'audio/s1_r1_bd.wav'
};

// Loads all sound samples into the buffers object.
function loadBuffers() {
  // Array-ify
  var names = [];
  var paths = [];
  for (var name in BUFFERS_TO_LOAD) {
    var path = BUFFERS_TO_LOAD[name];
    names.push(name);
    paths.push(path);
  }
  bufferLoader = new BufferLoader(context, paths, function(bufferList) {
    for (var i = 0; i < bufferList.length; i++) {
      var buffer = bufferList[i];
      var name = names[i];
      BUFFERS[name] = buffer;
    }
  });
  bufferLoader.load();
        loaded=loaded+1;
        bufferLoaded=true;
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert("Web Audio API is not supported in this browser");
  }
  loadBuffers();
});

