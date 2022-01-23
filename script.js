const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const freqSlider = document.getElementById("freq");



const audioContext = new window.AudioContext();
const gain = audioContext.createGain();
let osc;

console.log(gain);

startBtn.addEventListener('click', function(){
    osc = audioContext.createOscillator();
    osc.frequency.setValueAtTime(freqSlider.value, audioContext.currentTime);
    osc.connect(audioContext.destination);
    osc.start();
})

stopBtn.addEventListener('click', function(){
    osc.stop();
    osc.disconnect();
})

freqSlider.addEventListener('input', function(){
    osc.frequency.setValueAtTime(freqSlider.value, audioContext.currentTime);
})