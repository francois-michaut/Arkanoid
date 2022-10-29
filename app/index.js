const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 1;
let dy = -2;
let ballColor = "blue";

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    if(y + dy < 10 || y + dy > canvas.height - 10) {
        dy = -dy;
        ballColor = "green";
    } 
    if( x + dx > canvas.width - 10 || x + dx < 10) {
        dx = -dx;
        ballColor = "red";
    }
    x += dx;
    y += dy;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    
    ctx.closePath();
}

setInterval(draw, 8);

