let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;


let clickSound = new Audio("mouse click sound.mp3");
let winSound = new Audio("winning sound.mp3");
let wrongSound = new Audio("mistake wrong tone.mp3");

const WIN_LEVEL = 10;

let h2 = document.querySelector("h2");


document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});


document.addEventListener("dblclick", function () {
    if (started == false) {
        console.log("game is started (mobile double tap)");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
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
    gameFlash(randBtn);
}

function playClick() {

    let sound = clickSound.cloneNode();
    sound.play();
}

function btnPress() {
    let btn = this;
    userFlash(btn);


    playClick();

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {

            if (level >= WIN_LEVEL) {

                winSound.play();
                h2.innerHTML = `🎉 You Win! You completed Level ${level}! <br> Press Any Key or Double Tap to Play Again`;
                reset();
            } else {
                setTimeout(levelUp, 1000);
            }
        }
    } else {

        wrongSound.play();

        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press Any Key or Double Tap to Restart`;
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function reset() {
    level = 0;
    gameSeq = [];
    started = false;
    userSeq = [];
}
