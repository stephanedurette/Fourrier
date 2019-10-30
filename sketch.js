let startTime = performance.now();
var harmonics;
let wave = [];
let graphOffset = 500
let f = 0.1;

function setup(){
    createCanvas(2000, 800);
    //custom
    harmonics = [
        new Harmonic(100, f, 0),
        new Harmonic(100,  -f, 0),
    ];

    //Square wave
    // harmonics = [];
    // for(var i = 1; i <= 100; i++){
    //     var n = i * 2 - 1;
    //     harmonics.push(new Harmonic((100 * (4 / n / Math.PI)), n * f, 0));
    // }

    //right angle triangle wave
    // harmonics = [];
    // for(var i = 1; i <= 50; i++){
    //     harmonics.push(new Harmonic(400 / i / Math.PI, i*f, 0));
    // }
    //triangular wave
    // harmonics = [];
    // for(var i = 1; i <= 8; i++){
    //     var n = i * 2 - 1;
    //     var a = (8 / Math.PI / Math.PI) * (Math.pow(-1,(n-1)/2) / n / n)
    //     harmonics.push(new Harmonic(100 * a, n * f, 0));
    // }


}

function draw(){
    let startPos = createVector(400, 400);
    var time = (performance.now() - startTime) / 1000;
    background(0);
    var tempPos = startPos;
    for(var i = 0; i < harmonics.length;i++){
        tempPos = harmonics[i].update(time, tempPos);
    }
    wave.unshift(tempPos.y);

    for(var i = 1; i < wave.length; i++){
        point(startPos.x + graphOffset + i, wave[i]);
        line(startPos.x + graphOffset +  i - 1, wave[i-1], startPos.x + graphOffset +  + i, wave[i]);
    }
    line(tempPos.x, tempPos.y, startPos.x + graphOffset, wave[0]);

}

class Harmonic {
    constructor(amplitude, frequency, angleOffset) {
      this.a = amplitude;
      this.f = frequency;
      this.o = angleOffset;
      this.diameter = random(10, 30);
      this.speed = 1;
    }
  
    update(time, posVector) {
        stroke(255);
        noFill();
        ellipse(posVector.x, posVector.y, this.a * 2);

        fill(255);
        var pointx = posVector.x + (this.a * Math.sin(2 * Math.PI * this.f * time + Math.PI/2 + this.o));
        var pointy = posVector.y + (this.a * Math.cos(2 * Math.PI * this.f * time +  Math.PI/2 + this.o));
        ellipse(pointx, pointy,5,5);

        line(posVector.x, posVector.y, pointx, pointy);
        return createVector(pointx, pointy);
    }
  }