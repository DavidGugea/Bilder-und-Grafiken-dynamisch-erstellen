let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");

function resize(){
	canvas.width = window.innerWidth - 15;
	canvas.height = window.innerHeight - 15;
}

resize();

window.addEventListener(
	"resize", 
	(event) => {
		resize();
		createBalls(3);
	},
	false // dispatch event in the bubbling phase not in the capturing phase
);

let hex_colors = [
	"#F20530",
	"#025E73",
	"#037F8C",
	"#F29F05",
	"#F27405"
];

var balls = new Array();

class Ball{
	constructor(pos_x, pos_y, radius, hex_color, velocity=undefined, canvas, ctx){
		// Class properties
		this.pos_x = pos_x;
		this.pos_y = pos_y;
	
		this.radius = radius;
		this.hex_color = hex_color;

		this.velocity = velocity ? velocity : 0;
		
		this.firstFall = true;
		this.travelDistance = undefined;
	
		// Class canvas and canvas rendering context
		this.canvas = canvas;
		this.ctx = ctx;


		this.MAX_HEIGHT = this.velocity > 0 ? (this.canvas.height-this.pos_y) + velocity * 3 : this.canvas.height-this.pos_y;
		this.goDown = true;
		this.goUp = false;
	}
	fall(){
		if(this.pos_y + this.radius >= this.canvas.height){
			this.goDown = false;
			this.goUp = true;

			this.velocity /= 2;

			if(!this.firstFall){
				this.MAX_HEIGHT -= 150;

				if(this.MAX_HEIGHT <= 0){
					this.goDown = false;
					this.goUp = false;
				}
			}

			this.travelDistance = this.pos_y;
			this.firstFall = false;
		}

		// Increase the pos_y so that the ball goes down
		this.pos_y += this.velocity;
		// Increase the velocity so that the speed will increase when something falls because of "gravity"
		this.velocity += 0.05;
	}
	bounceUp(){
		if((this.canvas.height - this.pos_y) + this.radius >= this.MAX_HEIGHT){
			this.goUp = false;
			this.goDown = true;

			// Reset velocity
			this.velocity = 0;
		}
		

		// Decrease the pos_y so that the ball goes up
		this.pos_y -= this.velocity;
		// Decrease the velocity so that the speed will decrease when something is bouncing up
		this.velocity -= Math.floor(this.MAX_HEIGHT / this.travelDistance / 2);
	}
	clear(){
		this.ctx.clearRect(
			0, 0,
			this.canvas.width, this.canvas.height
		);
	}
	drawBall(){
		// this.clear();
		this.ctx.beginPath();
		this.ctx.arc(
			this.pos_x, this.pos_y,
			this.radius,
			0, Math.PI * 2,
			false
		);

		this.ctx.fillStyle = this.hex_color;
		this.ctx.fill();
	}
	handleCollision(){
		if(this.pos_y + this.radius >= this.canvas.height){
			this.pos_y = this.canvas.height - this.radius;
		}

		if(this.pos_y - this.radius < 0){
			this.pos_y = this.radius;
		}
	}
	update(){
		// this.clear();
		this.handleCollision();
		
		console.log(this.MAX_HEIGHT);

		if(this.goDown){
			this.fall();
		}
		if(this.goUp){
			this.bounceUp();
		}

		this.drawBall();

		window.requestAnimationFrame(this.update.bind(this));
	}
}

function createBalls(amount){
	balls = new Array();

	for(let i = 0 ; i < amount ; i++){
		let pos_x = Math.random() * canvas.width;
		let pos_y = Math.random() * canvas.height;
		let radius = Math.random() * 30 + 5;
		let hex_color = hex_colors[Math.floor(Math.random() * hex_colors.length)];
		let velocity = undefined;

		let ball = new Ball(
			pos_x, pos_y,
			radius, hex_color,
			velocity,
			canvas, ctx
		);

		balls.push(ball);
	}
}

createBalls(3);

function animateGravityi(){
	ctx.clearRect(
		0, 0,
		canvas.width, canvas.height
	)

	balls.map((ball) => {
		ball.update();
	})

	window.requestAnimationFrame(animateGravityi);
}

window.requestAnimationFrame(animateGravityi);