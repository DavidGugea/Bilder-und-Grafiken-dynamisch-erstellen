let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth - 15;
  canvas.height = window.innerHeight - 15;
}

resize();

canvas.addEventListener(
  "resize",
  (event) => {
    resize();
    createParticles(amountOfParticles);
  },
  false // dispatch event in the bubbling phase not in the capturing phase
);
document.addEventListener(
  "click",
  (event) => {
    resize();
    createParticles(amountOfParticles);
  }
)
document.addEventListener(
  "mousemove",
  (event) => {
    MOUSE_COORDS.x = event.x;
    MOUSE_COORDS.y = event.y;
  },
  false // dispatch event in the bubbling phase not in the capturing phase
)

/* ~~~~~~~~~~~~~~~~~ PROGRAM VARS  ~~~~~~~~~~~~~~~~~ */

var particlesArray = new Array();
var amountOfParticles = 100;

var colors = ["#F20530", "#025E73", "#037F8C", "#F29F05", "#F27405"];
var colors2 = ["#00bdff", "#4d39ce", "#088eff"];
var MOUSE_COORDS = {
  x: undefined,
  y: undefined
}

/* ~~~~~~~~~~~~~~~~~ PROGRAM VARS  ~~~~~~~~~~~~~~~~~ */

class Particle{
  constructor(pos_x, pos_y, radius, color, canvas, canvasRenderingContext2D){
    // Class properties
    this.pos_x = pos_x;
    this.pos_y = pos_y;

    this.startPointX = pos_x;
    this.startPointY = pos_y;

    this.radius = radius;
    this.color = color;

    // Class canvas and canvas rendering context
    this.canvas = canvas;
    this.canvasRenderingContext2D = canvasRenderingContext2D;

    // Class inside values
    this.angle = Math.random() * 360;
    this.angleVelocity = 1;
    this.motionRadius = Math.random() * amountOfParticles * 2;
    this.lastPositions = {
      x : this.pos_x,
      y : this.pos_y
    }
    this.mouseLastPositions = {
      x : this.pos_x,
      y : this.pos_y
    }
  }
  draw(){
    this.canvasRenderingContext2D.beginPath();

    this.canvasRenderingContext2D.strokeStyle = this.color;
    this.canvasRenderingContext2D.lineWidth = this.radius * 2;

    this.canvasRenderingContext2D.moveTo(this.lastPositions.x, this.lastPositions.y);
    this.canvasRenderingContext2D.lineTo(this.pos_x, this.pos_y);

    this.canvasRenderingContext2D.stroke();

    this.canvasRenderingContext2D.closePath();
  }
  circularMotion(){
    let radians = this.angle * Math.PI / 180;
    this.pos_x = MOUSE_COORDS.x ? MOUSE_COORDS.x + Math.cos(radians) * this.motionRadius : this.startPointX + Math.cos(radians) * this.motionRadius
    this.pos_y = MOUSE_COORDS.y ? MOUSE_COORDS.y + Math.sin(radians) * this.motionRadius : this.startPointY + Math.sin(radians) * this.motionRadius

    this.angle += this.angleVelocity;
    if(this.angle > 360){
      this.angle = 0;
    }
  }
  followMouseMotion(){
    /*
    this.mouseLastPositions.x = (MOUSE_COORDS.x - this.mouseLastPositions.x) * 0.05;
    this.mouseLastPositions.y = (MOUSE_COORDS.y - this.mouseLastPositions.y) * 0.05;
    this.pos_x = this.mouseLastPositions.x;
    this.pos_y = this.mouseLastPositions.y;
    */
    this.pos_x = MOUSE_COORDS.x;
    this.pos_y = MOUSE_COORDS.y;
  }
  update(){
    this.lastPositions.x = this.pos_x;
    this.lastPositions.y = this.pos_y;

    this.followMouseMotion();
    this.circularMotion();
    this.draw();
  }
}

function createParticles(amount){
  // Empty out particles array
  particlesArray = new Array();

  for(let i = 0 ; i < amount ; i++){
    let radius = Math.random() * 2 + 1;
    let color = colors2[Math.floor(Math.random() * colors2.length)];

    particlesArray.push(new Particle(
      canvas.width / 2, canvas.height / 2, radius, color, canvas, ctx
    ));
  }
}
createParticles(amountOfParticles);

function animate(){
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(225, 225, 225, 0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particlesArray.map((particle) => {
    particle.update();
  });

  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);
