const blocks = document.querySelectorAll(".block");
const wrapper = document.querySelector(".wrapper")
const reactionGame = document.querySelector(".reaction-game");
const randomNum = Math.floor(Math.random() * 1000) + 500;
const reactionCircle = document.querySelector(".reaction-circle");
const colors = ["#ff4b5c", "#ffaf40", "#32ff7e", "#18dcff", "#7d5fff"];

let score = 0;
let time = 5000; // 60 s
let maxTime = 0;
let maxBlockTime = 0;


function limitedInterval() {
  const interval = setInterval(() => {
    maxTime += 1;
    if (maxTime >= 5) {
      clearInterval(interval);
    }
    console.log("Interval running...", maxTime);
  }, 1000);
}

function animateBlocks() {
  blocks.forEach((block, index) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    block.style.background = randomColor;
    block.style.transform = `scale(${1 + Math.random() * 0.4}) rotate(${Math.random()*10 - 5}deg)`;
  });
} 

function resetBlocks() {
  const resetedBlocks = 
  `
    <div class="decoration-el-1 block"></div>
    <div class="decoration-el-2 block"></div>
    <div class="decoration-el-3 block"></div>  
  ` 
  wrapper.innerHTML = resetedBlocks;
}

const blockInterval = setInterval(() => {
  maxBlockTime += 1;  
  if(maxBlockTime >= 5){
    clearInterval(blockInterval)
  }
  animateBlocks()
}, 1000);

const firstInterval = setInterval(() => { 
  time -= 1000;
  if (time <= 0) {
    clearInterval(firstInterval);
    resetBlocks();
    reactionGame.innerHTML = `<h2>Time's up! Your score: ${score}</h2>`;
    score = 0;
  }
}, 1000);

function reactionGameTimer() {
  const reactionInterval = setInterval(() => { 
    maxTime += 1;   
    if (maxTime >= 5) {
      clearInterval(reactionInterval);
      reactionGame.innerHTML = `<h2>Your score: ${score}</h2>`;
    }
  }, 1000);
}

function enterTime() {
  let userTime = Number(prompt("Enter time in seconds", "5"));
  const timeout = setTimeout(() => {
    alert(`Time's up! Entered time was ${userTime} seconds.`);
  }, userTime * 1000);
}

function restartGame() {
  score = 0;
  time = 5000;
  maxTime = 0;
  reactionGameTimer();
  changeCirclePosition();
}

function changeCirclePosition() {
  reactionGame.innerHTML = `
    <div class="reaction-circle"
      style="top: ${Math.random() * 80 + 10}%; left: ${Math.random() * 80 + 10}%;">
    </div>`;
}

reactionGame.addEventListener('click', (e) => {
  if (e.target.classList.contains("reaction-circle")) {
    score++;
    console.log("score:", score);
    changeCirclePosition();
  }
});
reactionGame.addEventListener("dblclick", (e) => {
  restartGame();
});

limitedInterval();
enterTime();
