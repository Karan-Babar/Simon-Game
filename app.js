let bestScoreAllTime = localStorage.getItem("bestScore") || 0;

let gameSeq = [];
let userSeq = [];

let btns = ["c1", "c2", "c3", "c4"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let startBtn = document.querySelector(".btn-start");

startBtn.addEventListener("click", function(){
   if(started == false){
     console.log("game is started");
     started = true;

     levelUp();
   }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  },250)
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  },250)
} 

function levelUp() {
   userSeq = [];
   level++;
   h2.innerText = `Level ${level}`;

   let randIdx = Math.floor(Math.random() * 4);
   let randColor = btns[randIdx];
   let randBtn = document.querySelector(`.${randColor}`);
   gameSeq.push(randColor);
   console.log(gameSeq);
   btnFlash(randBtn);
}

function updateBestScore() {
  let currentScore = level - 1;

  if (currentScore > bestScoreAllTime) {
    bestScoreAllTime = currentScore;
    localStorage.setItem("bestScore", bestScoreAllTime);
  }
}

function vibrateWrong() {
  if ("vibrate" in navigator) {
    navigator.vibrate([150, 70, 150]);
  }
}

function checkAns(idx) {

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
          setTimeout(levelUp, 1000);
        }
    } else {
         updateBestScore();  

         vibrateWrong();

        h2.innerHTML = `Game Over! Your score was <b>${level-1}<b> </br> Best Score <b>${bestScoreAllTime}<b>`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
          document.querySelector("body").style.backgroundColor = "white";
        },250);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}  

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}