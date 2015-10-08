
// Keep track of all loaded buffers.
var BUFFERS = {};
// Page-wide audio context.
var context = null;

var loaded = 0;

// An object to track the buffers to load {name: path}
var BUFFERS_TO_LOAD = {
  kick: 'audio/kick.wav',
  snare: 'audio/snare.wav',
  tom1: 'audio/hmtom.wav',
  tom2: 'audio/ltom.wav',
  tom3: 'audio/lftom.wav',
  hihatclose: 'audio/hihatclosed.wav',
  hihatopen: 'audio/hihatopen.wav',
  crash: 'audio/crash.wav',
  ride: 'audio/ride.wav',
  sample: 'audio/sample.wav',
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
      loaded=loaded+1;
    }
  });
  bufferLoader.load();
  loaded = loaded + 1;
  bufferLoaded = true;
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


