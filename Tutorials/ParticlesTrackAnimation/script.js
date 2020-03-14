let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const hex_colors = [
  "#F20530",
  "#025E73",
  "#037F8C",
  "#F29F05",
  "#F27405"
];
const amountOfCircles = 5000;
var circlesArray = new Array();
var MOUSE_COORDS = {
  x : undefined,
  y : undefined
}

function resize(){
  canvas.width = window.innerWidth - 5;
  canvas.height = window.innerHeight - 5;
}
resize();

window.addEventListener(
  "resize",
  (event) => {
    resize();
    createCircles(amountOfCircles);
  },
  false // dispatch event in the bubbling phase not in the capturing phase
)
document.addEventListener(
  "click",
  (event) => {
    createCircles(amountOfCircles);
  },
  false // dispatch event in the bubbling phase not in the capturing phase
)

document.addEventListener(
  "mousemove",
  (event) => {
    MOUSE_COORDS.x = event.x;
    MOUSE_COORDS.y = event.y;
  },
  false // dispatch event in the bubbling phase not in the capturing phase
)

/* ~~~~~~ CIRCLE CLASS ~~~~~~ */

class Circle{
  constructor(pos_x, pos_y, velocity_x, velocity_y, radius, color, canvas, canvasRenderingContext){
    // Class properties
    this.pos_x = pos_x;
    this.pos_y = pos_y;

    this.velocity_x = velocity_x;
    this.velocity_y = velocity_y;

    this.radius = radius;
    this.color = color;

    this.MAX_RADIUS = 30;
    this.MIN_RADIUS = 2;
    this.MOUSE_DISTANCE_ALLOWED = 70;

    // Class canvas and canvas rendering context
    this.canvas = canvas;
    this.canvasRenderingContext = canvasRenderingContext;
  }
  drawCircle(){
    this.canvasRenderingContext.beginPath();

    this.canvasRenderingContext.arc(
      this.pos_x, this.pos_y,
      this.radius,
      0, Math.PI * 2,
      false
    );
    this.canvasRenderingContext.fillStyle = this.color;
    this.canvasRenderingContext.fill();

    this.canvasRenderingContext.closePath();
  }
  newPos(){
    this.pos_x += this.velocity_x;
    this.pos_y += this.velocity_y;
  }
  handleCollision(){
    // Handle velocity collision
    if(this.pos_x + this.radius >= this.canvas.width || this.pos_x - this.radius < 0){
      this.velocity_x *= -1;
    }
    if(this.pos_y + this.radius >= this.canvas.height || this.pos_y - this.radius < 0){
      this.velocity_y *= -1;
    }

    // Handle position collision

    // Right wall
    if(this.pos_x + this.radius >= this.canvas.width){
      this.pos_x = this.canvas.width - this.radius;
    }

    // Left wall
    if(this.pos_x - this.radius <= 0){
      this.pos_x = this.radius;
    }

    // Bottom wall
    if(this.pos_y + this.radius >= this.canvas.height){
      this.pos_y = this.canvas.height - this.radius;
    }

    // Up wall
    if(this.pos_y - this.radius <= 0){
      this.pos_y = this.radius;
    }
  }
  handleMouseMovement(){
    if(Math.abs(this.pos_x - MOUSE_COORDS.x) <= this.MOUSE_DISTANCE_ALLOWED && this.radius <= this.MAX_RADIUS && Math.abs(this.pos_y - MOUSE_COORDS.y) <= this.MOUSE_DISTANCE_ALLOWED){
      this.radius++;
    }else if(this.radius >= this.MIN_RADIUS){
      this.radius--;
    }
  }
  update(){
    this.newPos();
    this.handleCollision();
    this.handleMouseMovement();
    this.drawCircle();

  }
}

/* ~~~~~~ CIRCLE CLASS ~~~~~~ */

function createCircles(amount){
  circlesArray = new Array();
  for(let i = 0 ; i < amount ; i++){
    let radius = Math.random() * 30 + 5;

    let velocity_x = (Math.random() * 5 + 2) * (Math.random() - 0.5);
    let velocity_y = (Math.random() * 5 + 2) * (Math.random() - 0.5);

    // Create random values for the circle
    let pos_x = Math.random() * (canvas.width - radius) + radius;
    let pos_y = Math.random() * (canvas.height - radius) + radius;

    let color = hex_colors[Math.floor(Math.random() * hex_colors.length)];

    // Create a new circle and add it to the circles array
    let circle = new Circle(
      pos_x, pos_y,
      velocity_x, velocity_y,
      radius, color,
      canvas, ctx
    );

    circlesArray.push(circle);
  }
}

createCircles(amountOfCircles);

function animateCircleMovement(){
  ctx.clearRect(
    0, 0,
    canvas.width, canvas.height
  );

  circlesArray.map((circle) => {
    circle.update();
  })

  window.requestAnimationFrame(animateCircleMovement);
}

window.requestAnimationFrame(animateCircleMovement);
