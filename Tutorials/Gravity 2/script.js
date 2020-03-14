let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth - 25;
  canvas.height = window.innerHeight - 25;
}

resize();

window.addEventListener(
  "resize",
  (event) => {
    resize();
    createBalls(amountOfBalls);
  },
  false // dispatch event in the bubbling phase not in the capturing phase
)
document.addEventListener(
  "click",
  (event) => {
    createBalls(amountOfBalls);
  },
  false // dispatch event in the bubbling phase not in the capturing phase
)

const hex_colors_0 = [
  "#F20530",
  "#025E73",
  "#037F8C",
  "#F29F05",
  "#F27405"
];
const hex_colors_1 = [
  "#2185C5",
  "#7ECEFD",
  "#FFF6E5",
  "#FF7F66"
];

var ballsArray = new Array();
const amountOfBalls = 500;

class Ball{
  constructor(pos_x, pos_y, velocity_x, velocity_y, radius, hex_color, canvas, canvasRenderingContext){
    // Class properties
    this.pos_x = pos_x;
    this.pos_y = pos_y;

    this.velocity_x = velocity_x;
    this.velocity_y = velocity_y;

    this.radius = radius;
    this.hex_color = hex_color;

    // Class canvas and canvas rendering context
    this.canvas = canvas;
    this.canvasRenderingContext = canvasRenderingContext;

    // Static values
    this.friction = 0.98;
    this.g = 1;
  }
  clear(){
    this.canvasRenderingContext.clearRect(
      0, 0,
      this.canvas.width, this.canvas.height
    );
  }
  draw(){
    this.canvasRenderingContext.beginPath();

    this.canvasRenderingContext.arc(
      this.pos_x, this.pos_y,
      this.radius,
      0, Math.PI * 2,
      false
    );

    this.canvasRenderingContext.fillStyle = this.hex_color;
    this.canvasRenderingContext.stroke();
    this.canvasRenderingContext.fill();

    this.canvasRenderingContext.closePath();
  }
  handleCollision(){
    // VELOCITY CHANGE
    // Y_AXIS
    if(this.pos_y + this.radius + this.velocity_y >= this.canvas.height || this.pos_y - this.radius - this.velocity_y <= 0){
      this.velocity_y *= -1 * this.friction;
    }else{
      this.velocity_y += this.g;
    }

    if(this.pos_x + this.radius + this.velocity_x >= this.canvas.width || this.pos_x - this.radius - this.velocity_x <= 0){
      this.velocity_x *= -1;
    }

    // POSITION CHANGE
    // Y_AXIS

    // Down Wall
    if(this.pos_y + this.radius + this.velocity_y >= this.canvas.height){
      this.pos_y = this.canvas.height - this.radius;
    }

    // Up wall
    if(this.pos_y - this.radius - this.velocity_y <= 0){
      this.pos_y = this.radius
    }

    // X_AXIS

    // Right Wall
    if(this.pos_x + this.radius + this.velocity_x >= this.canvas.width){
      this.pos_x = this.canvas.width - this.radius;
    }

    // Left Wall
    if(this.pos_x - this.radius <= 0){
      this.pos_x = this.radius;
    }
  }
  update(){
    this.pos_y += this.velocity_y;
    this.pos_x += this.velocity_x;

    this.handleCollision();
    this.draw();
  }
}

function createBalls(amount){
  // Empty out previous balls array;
  ballsArray = new Array();

  for(let i = 0 ; i < amount ; i++){
    // Create random values and then a ball class that will be added to the balls array
    let radius = Math.random() * 50;

    let velocity_x = Math.random() * 5 + 1;
    let velocity_y = Math.random() * 5 + 1;

    let pos_x = Math.random() * (canvas.width - radius - velocity_x) + radius * 5 + velocity_x;
    let pos_y = Math.random() * (canvas.height - radius - velocity_y) + radius * 5 + velocity_y;

    let color = hex_colors_0[Math.floor(Math.random() * hex_colors_0.length)];

    let ball = new Ball(
      pos_x, pos_y,
      velocity_x, velocity_y,
      radius, color,
      canvas, ctx
    );

    ballsArray.push(ball);
  }
}

createBalls(amountOfBalls);

function animate(){
  // Clear out canvas for the new positions of the balls
  ctx.clearRect(
    0, 0,
    canvas.width, canvas.height
  );

  ballsArray.map((ball) => {
    // Update the position of the ball
    ball.update();
  });

  // Request animation frame
  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);
