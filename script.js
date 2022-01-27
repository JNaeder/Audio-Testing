const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const freqSlider = document.getElementById("freq");
const gainSlider = document.getElementById("gain");
const filterSlider = document.getElementById("filter");


const audioContext = new window.AudioContext();

let gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);

let osc;

let filterNode = audioContext.createBiquadFilter();
filterNode.connect(gainNode);


// Functions
const startOsc = function(){
    osc = audioContext.createOscillator();
    osc.frequency.setValueAtTime(freqSlider.value, audioContext.currentTime);
    osc.connect(filterNode);
    osc.start();
}

const stopOsc = function(){
    osc.stop();
    osc.disconnect();
}


startBtn.addEventListener('click', startOsc);
stopBtn.addEventListener('click', stopOsc);

freqSlider.addEventListener('input', function(){
    osc.frequency.setValueAtTime(this.value, audioContext.currentTime);
});

gainSlider.addEventListener('input', function(){
    gainNode.gain.value = this.value/50;
});

filterSlider.addEventListener('input', function(){
    filterNode.frequency.setValueAtTime(this.value, audioContext.currentTime);
})
