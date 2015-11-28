var Sample = {
  FADE_TIME: 0.5
};

Sample.gainNode = null;

Sample.play = function(buffer, time) {
  if (!context.createGain)
    context.createGain = context.createGainNode;
  this.gainNode = context.createGain();
  var fra = document.getElementById("volume").value / 100;
  this.gainNode.gain.value = fra * fra;
  
  var analyser = context.createAnalyser();
  analyser.fftSize = 1024;
  var ctx = document.getElementById("graph").getContext("2d");
  var timerId;

  function DrawGraph() {
    ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
    ctx.fillRect(0, 0, 512, 360);
    ctx.strokeStyle="rgba(255, 0, 0, 2)";
    var data = new Uint8Array(512);
    analyser.getByteTimeDomainData(data); //Waveform Data
    ctx.beginPath();
    for(var i = 0; i < 256; ++i) {
        ctx.lineTo(i*2, 256 - data[i]);
    }
    ctx.stroke();
    requestAnimationFrame(DrawGraph);
  }
  timerId=requestAnimationFrame(DrawGraph);
  
  var convolver = context.createConvolver();
  this.revlevel = context.createGain();
  var lev = document.getElementById("revlevel").value / 100;
  this.revlevel.gain.value = lev;
  convolver.connect(this.revlevel);
  this.revlevel.connect(context.destination);
  this.revlevel.connect(analyser);
  convolver.buffer = BUFFERS.rev1;
  
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(this.gainNode);
  this.gainNode.connect(context.destination);
  this.gainNode.connect(convolver);
  this.gainNode.connect(analyser);
  source.start(time);
};

Sample.changeRevlev = function(element) {
  var lev = element.value;
};

Sample.changeVolume = function(element) {
  var volume = element.value;
  var fraction = parseInt(element.value) / parseInt(element.max);
  // Let's use an x*x curve (x-squared) since simple linear (x) does not
  // sound as good.
  this.gainNode.gain.value = fraction * fraction;
};


Sample.stop = function() {
  var ctx = this;
  this.gainNode.gain.linearRampToValueAtTime(1, context.currentTime);
  this.gainNode.gain.linearRampToValueAtTime(0, context.currentTime + ctx.FADE_TIME);
  clearTimeout(this.timer);
};

Sample.toggle = function(buffer, time) {
  if(this.playing) {
    this.stop(); 
  } else {
    this.play(buffer, time);}
  this.playing = !this.playing;
};
