
var Sample = {
  FADE_TIME: 0.5
};

var mode = 0;
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
    if(mode == 0) analyser.getByteFrequencyData(data); //Spectrum Data
    else analyser.getByteTimeDomainData(data); //Waveform Data
    if(mode!=0) ctx.beginPath();
    for(var i = 0; i < 256; ++i) {
        if(mode==0) {
            ctx.fillStyle = "#B00000";
            ctx.fillRect(i*2, 360 - data[i], 2, data[i]);
        } else {
            ctx.lineWidth = 4;
            ctx.lineTo(i*2, 300 - data[i]);
        }
    }
    if(mode!=0) {
        ctx.stroke();
    }
    requestAnimationFrame(DrawGraph);
  }
  timerId=requestAnimationFrame(DrawGraph);
  
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(this.gainNode);
 // this.gainNode.connect(tempconvolver);
  this.gainNode.connect(context.destination);
  this.gainNode.connect(analyser);
  source.start(time);
};

Sample.changeVolume = function(element) {
  var volume = element.value;
  var fraction = parseInt(element.value) / parseInt(element.max);
  // Let's use an x*x curve (x-squared) since simple linear (x) does not
  // sound as good.
  this.gainNode.gain.value = fraction * fraction;
};

Sample.analyserType = function() {
  if(mode==0) {
    mode=1;
  } else {
    mode=0;
  }
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