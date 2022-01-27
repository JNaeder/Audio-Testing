const oscStartBtn = document.getElementById("osc_start");
const oscStopBtn = document.getElementById("osc_stop");
const audioStartBtn = document.getElementById("audio_start");
const audioStopBtn = document.getElementById("audio_stop");
const waveSlider = document.getElementById("wave");
const freqSlider = document.getElementById("freq");
const gainSlider = document.getElementById("gain");
const filterSlider = document.getElementById("filter");
const resonanceSlider = document.getElementById("resonance");

const audioContext = new window.AudioContext();

let gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);

let osc;

let filterNode = audioContext.createBiquadFilter();
filterNode.connect(gainNode);
filterNode.Q.setValueAtTime(3, audioContext.currentTime);
console.log(filterNode);

let randomGen;

// Functions
const startOsc = function () {
  osc = audioContext.createOscillator();
  osc.frequency.setValueAtTime(freqSlider.value, audioContext.currentTime);
  osc.connect(filterNode);
  console.log(osc);
  randomGen = setInterval(randomNotes, 100);
  osc.type = "sawtooth";
  osc.start();
};

const stopOsc = function () {
  osc.stop();
  osc.disconnect();
  clearInterval(randomGen);
  // console.log(osc);
};

const startAudio = function () {
  console.log("Start");
};

const stopAudio = function () {
  console.log("Stop");
};

const randomNotes = function () {
  const randomNum = Math.trunc(Math.random() * 1000);
  osc.frequency.setValueAtTime(randomNum, audioContext.currentTime);
  freqSlider.value = randomNum;
};

oscStartBtn.addEventListener("click", startOsc);
oscStopBtn.addEventListener("click", stopOsc);
audioStartBtn.addEventListener("click", startAudio);
audioStopBtn.addEventListener("click", stopAudio);

waveSlider.addEventListener("input", function () {
  let newWave;
  switch (Number(this.value)) {
    case 1:
      newWave = "sine";
      break;
    case 2:
      newWave = "sawtooth";
      break;
    case 3:
      newWave = "square";
      break;
    case 4:
      newWave = "triangle";
      break;
    default:
      newWave = "sine";
  }
  console.log(newWave);
  osc.type = newWave;
});

freqSlider.addEventListener("input", function () {
  osc.frequency.setValueAtTime(this.value, audioContext.currentTime);
});

gainSlider.addEventListener("input", function () {
  gainNode.gain.value = this.value / 50;
});

filterSlider.addEventListener("input", function () {
  filterNode.frequency.setValueAtTime(this.value, audioContext.currentTime);
});

resonanceSlider.addEventListener("input", function () {
  filterNode.Q.setValueAtTime(this.value, audioContext.currentTime);
  console.log(this.value);
  console.log(filterNode.Q);
});
