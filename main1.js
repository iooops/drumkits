
  
var currentColor, circleHighlight, circleColor, 
circleHighlight2, circleColor2, rectHighlight, rectColor;
var circleOver = new Array(false, false, false, false, false);
var circleOver2 = new Array(false, false, false); 
var rectOver = false;
var close = true;
var px = new Array(290, 130, 240, 370, 490);
var py = new Array(350, 260, 180, 190, 270);
var dm = new Array(180, 120, 90, 100, 110);
var ppx = new Array(60, 170, 500);
var ppy = new Array(150, 75, 120);
var ddm = new Array(100, 120, 140);
var a,b;
var bufferLoaded = false;
var progressBar=0;

// Simple way to attach js code to the canvas is by using a function
function sketchProc(processing) {
  processing.setup = function() {
    processing.size(640, 360);
    circleColor = processing.color(0);
    circleHighlight = processing.color(51);
    circleColor2 = processing.color(255);
    circleHighlight2 = processing.color(200);
    rectColor = processing.color(20);
    rectHighlight = processing.color(51);
    currentColor = processing.color(30);
    a = processing.color(20);
    b = processing.color(150);
  };

  processing.draw = function() {
    if(loaded>=12){
    update(processing.mouseX, processing.mouseY);
    processing.background(currentColor);
    for(var i=0; i<5; i++) {
      if (circleOver[i]) {
        processing.fill(circleHighlight);
      } else {
        processing.fill(circleColor);
      }
      processing.smooth(2);
      processing.stroke(255);
      processing.strokeWeight(4);
      processing.ellipse(px[i], py[i], dm[i], dm[i]);
    }
    for(var j=0; j<3; j++) {
      if (circleOver2[j]) {
        processing.fill(circleHighlight2);
      } else {
        processing.fill(circleColor2);
      }
      processing.smooth(2);
      processing.stroke(255);
      processing.strokeWeight(1);
      processing.ellipse(ppx[j], ppy[j], ddm[j], ddm[j]);
    
      processing.fill(0);
      processing.smooth(2);
      processing.noStroke();
      processing.ellipse(ppx[j], ppy[j], 7, 7);
    }
  
    if (rectOver) {
      processing.fill(rectHighlight);
    } else {
      processing.fill(rectColor);
    }
    processing.stroke(150);
    processing.rect(30, 210, 20, 30, 3, 3, 12, 12);
  } else{
    processing.background(0);
    processing.text("Loading Samples...Please wait"+loaded,50,50);
    if(progressBar>340){
    progressBar=50;
    }
    processing.rect(50,100,5*progressBar,50);
    progressBar=progressBar+1
  }
  };

  function update(x, y) {
    for(var i=0; i<5; i++) {
      if ( overCircle(px[i], py[i], dm[i]) ) {
        circleOver[i] = true;
      } else {
        circleOver[i] = false;
      }
    }
    for(var j=0; j<3; j++) {
      if ( overCircle(ppx[j], ppy[j], ddm[j]) ) {
        circleOver2[j] = true;
      } else {
        circleOver2[j] = false;
      }
    }
    if(overRect(30, 210, 20, 30)) {
      rectOver = true;
    } else {
      rectOver = false;
    }
  }

  processing.mouseClicked = function() {
    if(rectOver) {
      if(rectColor == a) {
        rectColor = b;
        close = false;
      } else {
        rectColor = a;
        close = true;
      }
    }
    if(circleOver[0]) {
      dm[0] = dm[0] + 5;
      Sample.play(BUFFERS.kick, 0);
      setTimeout(function() { dm[0] = dm[0] -5; } ,100);
    } else if(circleOver[1]) {
      dm[1] = dm[1] + 5;
      Sample.play(BUFFERS.snare, 0);
      setTimeout(function() { dm[1] = dm[1] -5; } ,100);
    } else if(circleOver[2]) {
      dm[2] = dm[2] + 5;
      Sample.play(BUFFERS.tom1, 0);
      setTimeout(function() { dm[2] = dm[2] -5; } ,100);
    } else if(circleOver[3]) {
      dm[3] = dm[3] + 5;
      Sample.play(BUFFERS.tom2, 0);
      setTimeout(function() { dm[3] = dm[3] -5; } ,100);
    } else if(circleOver[4]) {
      dm[4] = dm[4] + 5;
      Sample.play(BUFFERS.tom3, 0);
      setTimeout(function() { dm[4] = dm[4] -5; } ,100);
    } else if(circleOver2[0]) {
      ddm[0] = ddm[0] + 5;
      ppx[0] = ppx[0] + 3;
      if(close) {
        Sample.play(BUFFERS.hihatclose, 0);
      } else {
        Sample.play(BUFFERS.hihatopen, 0);
      }
      setTimeout(function() { ddm[0] = ddm[0] -5; ppx[0] = ppx[0] -3;} ,100);
    } else if(circleOver2[1]) {
      ddm[1] = ddm[1] + 5;
      ppx[1] = ppx[1] + 2;
      Sample.play(BUFFERS.crash, 0);
      setTimeout(function() { ddm[1] = ddm[1] -5; ppx[1] = ppx[1] -2;} ,100);
    } else if(circleOver2[2]) {
      ddm[2] = ddm[2] + 5;
      ppx[2] = ppx[2] - 3;
      Sample.play(BUFFERS.ride, 0);
      setTimeout(function() { ddm[2] = ddm[2] -5; ppx[2] = ppx[2] +3; } ,100);
    }
  };
  
  function overRect(x, y, width, height)  {
    if (processing.mouseX >= x && processing.mouseX <= x+width && 
        processing.mouseY >= y && processing.mouseY <= y+height) {
      return true;
    } else {
      return false;
    }
  }
  
  function overCircle(x, y, diameter) {
    var disX = parseFloat(x - processing.mouseX);
    var disY = parseFloat(y - processing.mouseY);
    if (processing.sqrt(processing.sq(disX) + processing.sq(disY)) < diameter/2 ) {
      return true;
    } else {
      return false;
    }
  }
}
  
var canvas = document.getElementById("canvas1");
// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
// p.exit(); to detach it


var keydown = function (event) {
  if (event.keyCode == 66) { 
    dm[0] = dm[0] + 5;
    Sample.play(BUFFERS.kick, 0);
    setTimeout(function() { dm[0] = dm[0] -5; } ,100);
  }
  if (event.keyCode == 68) { 
    dm[1] = dm[1] + 5;
    Sample.play(BUFFERS.snare, 0);
    setTimeout(function() { dm[1] = dm[1] -5; } ,100);
  }
  if (event.keyCode == 72) { 
    dm[2] = dm[2] + 5;
    Sample.play(BUFFERS.tom1, 0);
    setTimeout(function() { dm[2] = dm[2] -5; } ,100);
  }
  if (event.keyCode == 74) {
    dm[3] = dm[3] + 5;
    Sample.play(BUFFERS.tom2, 0);
    setTimeout(function() { dm[3] = dm[3] -5; } ,100);
  }      
  if (event.keyCode == 75) {
    dm[4] = dm[4] + 5;
    Sample.play(BUFFERS.tom3, 0);
    setTimeout(function() { dm[4] = dm[4] -5; } ,100);
  }      
  if (event.keyCode == 87) {
    ddm[0] = ddm[0] + 5;
    ppx[0] = ppx[0] + 3;
    if(close) {
      Sample.play(BUFFERS.hihatclose, 0);
    } else {
      Sample.play(BUFFERS.hihatopen, 0);
    }
    setTimeout(function() { ddm[0] = ddm[0] -5; ppx[0] = ppx[0] -3;} ,100);
  }     
  if (event.keyCode == 69) {
    ddm[1] = ddm[1] + 5;
    ppx[1] = ppx[1] + 2;
    Sample.play(BUFFERS.crash, 0);
    setTimeout(function() { ddm[1] = ddm[1] -5; ppx[1] = ppx[1] -2;} ,100);
  }      
  if (event.keyCode == 73) {
    ddm[2] = ddm[2] + 5;
    ppx[2] = ppx[2] - 3;
    Sample.play(BUFFERS.ride, 0);
    setTimeout(function() { ddm[2] = ddm[2] -5; ppx[2] = ppx[2] +3; } ,100);
  }      
  if (event.keyCode == 88) {
    if(rectColor == a) {
      rectColor = b;
      close = false;
    } else {
      rectColor = a;
      close = true;
    }
  }
};

document.addEventListener( 'keydown', keydown, false );  
