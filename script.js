const oscStartBtn = document.getElementById("osc_start");
const oscStopBtn = document.getElementById("osc_stop");
const audioStartBtn = document.getElementById("audio_start");
const audioStopBtn = document.getElementById("audio_stop");

const randomNotesCheckbox = document.getElementById("random");

const waveSlider = document.getElementById("wave");
const waveValue = document.getElementById("wave_number");
const freqSlider = document.getElementById("freq");
const freqValue = document.getElementById("freq_number");
const gainSlider = document.getElementById("gain");
const gainValue = document.getElementById("gain_number");
const filterSlider = document.getElementById("filter");
const filterValue = document.getElementById("filter_number");
const resonanceSlider = document.getElementById("resonance");
const resonanceValue = document.getElementById("res_number");
const panSlider = document.getElementById("panner");
const panValue = document.getElementById("pan_number");

const audioPlayer = document.getElementById("audio_player");

const audioFile = "Audio/SO_JAM_90_melodic_stack_euclase_Ebmaj.wav";

const audioContext = new window.AudioContext();

const audioNode = audioContext.createMediaElementSource(audioPlayer);

let gainNode = audioContext.createGain();
const pannerNode = audioContext.createStereoPanner();
gainNode.connect(pannerNode);
pannerNode.connect(audioContext.destination);

let osc;

let filterNode = audioContext.createBiquadFilter();
filterNode.connect(gainNode);
filterNode.Q.setValueAtTime(3, audioContext.currentTime);

audioNode.connect(filterNode);

let randomGen;

// Functions
const startOsc = function () {
  osc = audioContext.createOscillator();
  osc.frequency.setValueAtTime(freqSlider.value, audioContext.currentTime);
  osc.connect(filterNode);
  if (randomNotesCheckbox.checked) {
    randomGen = setInterval(randomNotes, 200);
  }
  osc.type = "sawtooth";
  osc.start();
};

const stopOsc = function () {
  osc.stop();
  osc.disconnect();
  clearInterval(randomGen);
};

const startAudio = function () {
  audioPlayer.src = audioFile;
  audioPlayer.play();
  oneShot.start();
};

const stopAudio = function () {
  audioPlayer.pause();
};

const randomNotes = function () {
  const randomNum = Math.trunc(Math.random() * 1000);
  osc.frequency.exponentialRampToValueAtTime(
    randomNum,
    audioContext.currentTime + 0.1
  );
  freqSlider.value = randomNum;
  freqValue.textContent = randomNum;
};

// Event Listeners
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
  console.log(osc);
  osc.type = newWave;
  waveValue.textContent = newWave;
});

freqSlider.addEventListener("input", function () {
  osc.frequency.setValueAtTime(this.value, audioContext.currentTime);
  freqValue.textContent = this.value;
});

gainSlider.addEventListener("input", function () {
  gainValue.textContent = this.value;
  gainNode.gain.value = this.value;
});

filterSlider.addEventListener("input", function () {
  filterNode.frequency.setValueAtTime(this.value, audioContext.currentTime);
  filterValue.textContent = this.value;
});

resonanceSlider.addEventListener("input", function () {
  filterNode.Q.setValueAtTime(this.value, audioContext.currentTime);
  resonanceValue.textContent = this.value;
});

panSlider.addEventListener("input", function () {
  pannerNode.pan.setValueAtTime(this.value, audioContext.currentTime);
  panValue.textContent = this.value;
});
