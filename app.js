alert("SO DUMBASS THIS GAME WORKS LIKE:\n1.Press any key to start the game.\n 2.Watch the sequence of flashing colors.\n3.Repeat the pattern by clicking the buttons in the same order.\n4.With each level, the sequence gets longer.\n5.Wrong click? Game over! Press any key to restart.");
let userSeq = [];
let gameSeq = [];
let allbtns = ["red", "yellow", "green", "blue"];
let h4 = document.querySelector("h4");
let level = 0;
let started = false;

document.querySelector("#startBtn").addEventListener("click", function() {
    if (!started) {
        started = true;
        levelup();
    }
});

function flash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 200);
}

function levelup() {
    userSeq = [];
    level++;
    h4.innerText = `Level=${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = allbtns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    flash(randBtn);
}

function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (gameSeq.length === userSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
            h4.innerHTML=`Game over!  <b>Your score was ${level}</b> <br> press any key to restart.`;
            document.querySelector("body").style.background="red";
            setTimeout(function(){
                document.querySelector("body").style.background="linear-gradient(135deg, #1e1e2f 0%, #2a2a4a 100%)";
            },300);
            reset();
    }
}

function btnPress() {
    let btn = this;
    flash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let btns = document.querySelectorAll(".btn");
for (let btn of btns) {
    btn.addEventListener("click", btnPress);
 
    btn.addEventListener("touchstart", function(e) {
        e.preventDefault(); // Prevent default touch behavior (e.g., scrolling)
        btnPress.call(this); 
    });
}

function reset() {
    started = false;
    level = 0;
    userSeq = []; 
    gameSeq = []; 
}
