const btn25 = document.getElementById("_25mins");
const btn60 = document.getElementById("_60mins");
const startBtn = document.getElementById("strt"); 
const pauseBtn = document.getElementById("pause");
const timer = document.getElementById("time-text");
const resetBtn = document.getElementById("reset");
const circle = document.getElementById("progress-ring-circle"); 




let minutes = 0;
let seconds = 0;
let interval = null;
let choiceMade=false;



startBtn.disabled = true;

pauseBtn.disabled = true;
resetBtn.disabled=true; 


function startCircleAnimation(durationSeconds){
    circle.style.animation= `fillCircle ${durationSeconds}s linear forwards`;
    circle.style.animationPlayState="running"; 

}
function pauseCircleAnimation(){
    circle.style.animationPlayState="paused"; 

}
function resetCircleAnimation() {
    circle.style.animation = "none"; 
}


btn25.addEventListener("click", ()=>{
    minutes=25;
    seconds=0; 
    choiceMade=true; 
    startBtn.disabled = false; 
    
  
    
    updateTimerText(); 
    resetCircleAnimation();
   


})

btn60.addEventListener("click", ()=>{
    minutes=60;
    seconds=0; 
    choiceMade=true; 
    startBtn.disabled = false; 
    resetBtn.disabled=false;
    

    
    updateTimerText(); 
    resetCircleAnimation();


})

function updateTimerText() {
    let minStr = minutes < 10 ? "0" + minutes : minutes;
    let secStr = seconds < 10 ? "0" + seconds : seconds;
    timer.textContent = `${minStr}:${secStr}`;
}

function startTimer() {
    if (!interval) {  // no interval running
        pauseBtn.disabled = false;
        pauseBtn.textContent = "Pause";
        startBtn.disabled = true;
        btn60.disabled=true;
        btn25.disabled=true;

        startCircleAnimation(minutes * 60);

        interval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                    interval = null;
                    timer.textContent = "00:00";
                    pauseBtn.disabled = true;
                    startBtn.disabled = false;
                    pauseBtn.textContent = "Pause";
                    return;
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }
            updateTimerText();
        }, 1000);
    }
}



function pauseTimer() {
    if (interval) {  // interval running = timer is running
        clearInterval(interval);
        interval = null;
        pauseBtn.textContent = "Resume";
        startBtn.disabled = true; 
        resetBtn.disabled=false; 
        pauseCircleAnimation(); // keep startBtn disabled while paused
    } else {  // interval is null = timer is paused, so resume
        startTimer();
        circle.style.animationPlayState = "running";
    }
}

function resetTimer(){
    clearInterval(interval); 
    interval=null; 
    minutes=0; 
    seconds=0; 
    choiceMade=false; 
    updateTimerText(); 
    startBtn.disabled=true; 
    pauseBtn.disabled=true;
    resetBtn.disabled=true; 
    btn25.disabled=false;
    btn60.disabled=false;
    btn25.classList.remove("glow");
    btn60.classList.remove("glow");

     resetCircleAnimation(); 
}

startBtn.addEventListener("click", () => {
    startTimer();
});

pauseBtn.addEventListener("click", () => {
    pauseTimer();
});

resetBtn.addEventListener("click", ()=>{
    resetTimer(); 
})

// initialize timer text on page load
updateTimerText();


//motivational quotes thingy


const data = [
  "The best way to get started is to quit talking and begin doing. – Walt Disney",
  "Don’t let yesterday take up too much of today. – Will Rogers",
  "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
  "If you are working on something exciting, it will keep you motivated. – Unknown",
  "Success is not in what you have, but who you are. – Bo Bennett"
];

const quotes = document.getElementById("quote");

function showRandomQuote() {
    if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const text = data[randomIndex];  // fixed: data is an array of strings

        quotes.textContent = text;
    }
}

showRandomQuote();
setInterval(showRandomQuote, 5000);  // change every 5 seconds

//music

const options = [
  "https://cdn.pixabay.com/download/audio/2022/03/02/audio_5f166b631c.mp3?filename=forest-night-ambient-19464.mp3",
  "https://cdn.pixabay.com/download/audio/2021/09/16/audio_12b5e2e11f.mp3?filename=rain-ambient-9825.mp3",
  "https://cdn.pixabay.com/download/audio/2022/01/03/audio_6ed8f3b68e.mp3?filename=rain-ambient-loop-19860.mp3"
];

const musicBtn = document.getElementById("music-btn");
const audioPlayer = document.getElementById("audio-player");
const audioSource = document.getElementById("audio-source");

musicBtn.addEventListener("click", () => {
  const random = options[Math.floor(Math.random() * options.length)];
  console.log("Playing:", random);

  audioSource.src = random;
audioPlayer.load();
audioPlayer.volume = 1.0;
audioPlayer.play().catch(e => {
  console.error("Playback error:", e);
})

});
//mode toggle 

const mode = document.getElementById("toggle-btn");
let currentmode = "light";

mode.addEventListener("click", () => {
  if (currentmode === "light") {
    document.body.classList.add("dark");
    currentmode = "dark";
    mode.textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark");
    currentmode = "light";
    mode.textContent = "Dark Mode";
  }
});

// Set initial toggle button text
mode.textContent = "Dark Mode";









