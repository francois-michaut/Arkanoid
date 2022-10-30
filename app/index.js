const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballColor = "blue";
// paddle
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
// arrow key
let leftPressed = false;
let rightPressed = false;
// bricks
let brickRowCount = 3;
let brickColumnCount = 8;
let brickWidth = 50;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 5;

let bricks = [];
for (let column = 0; column < brickColumnCount ; column++) {
    bricks[column] = [];
    for ( let row = 0; row < brickRowCount ; row ++) {
        bricks[column][row] = {x: 0, y: 0}
    }
}

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

function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    if(y + dy < 10 ) {
        dy = -dy;
        ballColor = "green";
    } else if (dy + y > canvas.height - 10) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy  ;
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

