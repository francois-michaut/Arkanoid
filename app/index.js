const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 1;
let dy = -2;
let ballColor = "blue";
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let leftPressed = false;
let rightPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(evt) {
    if ( evt.key == "Right" || evt.key == "ArrowRight") {
        rightPressed = true;
    }
    if ( evt.key == "Left" || evt.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(evt) {
    if ( evt.key === "Right" || evt.key === "ArrowRight") {
        rightPressed = false;
    }
    if ( evt.key === "Left" || evt.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight , paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if(y + dy < 10 ) {
        dy = -dy;
        ballColor = "green";
    } else if (dy + y > canvas.height - 10) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy ;
        } else {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
    }}
    if( x + dx > canvas.width - 10 || x + dx < 10) {
        dx = -dx;
        ballColor = "red";
    } 

    if (leftPressed) {
        paddleX -= 5 ;
        if ( paddleX  < 0) {
            paddleX = 0 ;
        }
    } else if (rightPressed) {
        paddleX += 5;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    x += dx;
    y += dy;
}


let interval = setInterval(draw, 8);

