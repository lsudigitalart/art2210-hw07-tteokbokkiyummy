let soundFile; 
let soundPlayed = false;
let startTime;
let girlImg;

function preload(){
    soundFile = loadSound('CIKI.mp3');
    girlImg = loadImage('girling.png');
    
}

function setup(){
    createCanvas(2048,2048);
    startTime = millis();
    fft = new p5.FFT();
    fft.setInput(soundFile);
    soundFile.play();

}

function draw(){
    background(girlImg);

    let spectrum = fft.analyze();
    let bassEnergy = fft.getEnergy('bass');
    let trebleEnergy = fft.getEnergy('treble');
    let midEnergy = fft.getEnergy('mid');

    let bassEllipse = map(bassEnergy, 0, 255, 50, 300);
    stroke(52,73,94);
    strokeWeight(15);
    ellipse (323,1341, bassEllipse, bassEllipse);

    let trebleEllipse = map(trebleEnergy, 0, 255, 50, 300);
    stroke(93,109,126);
    strokeWeight(15);
    ellipse (611,1736, trebleEllipse, trebleEllipse);

    let midEllipse = map(midEnergy, 0, 255, 50, 300);
    stroke(133,146,158);
    strokeWeight(15);
    ellipse(700,970, midEllipse, midEllipse);

    let waveform = fft.waveform();
    stroke(25);
    noFill();
    beginShape();
    let threshold = 1; 

    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        
        let waveformLimit = constrain(waveform[i], -threshold, threshold);
        let y = map(waveformLimit * 0.1, -1, 1, 0, height) -700;

        vertex(x, y);
    }
    endShape();
    
}

function mousePressed(){
    if (!soundFile.isPlaying()) {
        soundFile.play();
    }
}
