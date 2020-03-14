const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth - 15;
canvas.height = innerHeight - 15;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

var gravity = 1; 
var friction = 0.5;

// Event Listeners
addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.update = function() {
    if(this.y + this.radius + this.dy > canvas.height){
        this.dy = -this.dy * friction;
    }else{
        this.dy += gravity;
        console.log(this.dy);
    }

    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius - this.dx< 0){
        this.dx = -this.dx;
    }

    this.y += this.dy;
    this.x += this.dx;

    this.draw();
  };

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  };
}

// Implementation
let objects;
var ball;
var ballArray;
function init() {
    ballArray = new Array();
    for(let i = 0 ; i < 100 ; i++){
        var radius = randomIntFromRange(8, 20);

        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);

        var dx = randomIntFromRange(-2, 2);
        var dy = randomIntFromRange(-2, 2);

        var color = randomColor(colors);

        ballArray.push(new Ball(
            x, y, dx, dy, radius, color
        ))
    }

    console.log(ballArray);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < ballArray.length; i++){
      ballArray[i].update();
  }

}

init();
animate();

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

document.addEventListener(
    "click", function(evemt){
        init();
    }
)