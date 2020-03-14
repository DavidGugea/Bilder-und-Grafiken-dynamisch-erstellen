let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let image = document.getElementById("source");

class Player{
	constructor(POS_X, POS_Y, speed, image, width, height, canvas, canvasRenderingContext2D)
	{
		// Class properties
		this.POS_X = POS_X;
		this.POS_Y = POS_Y;
		this.speed = speed;
		this.image = image;

		this.increment_X_VALUE = 0;
		this.increment_Y_VALUE = 0;

		this.width = width;
		this.height = height;

		// Class canvas and canvas rendering context 2d
		this.canvas = canvas;
		this.canvasRenderingContext2D = canvasRenderingContext2D;

		var self = this;

		/* KEY MOVEMENT */

		document.addEventListener(
			"keydown",
			(ev) => {
				if(ev.key == "ArrowRight" || ev.key == "Right"){
					self.moveRight();
				}else if(ev.key == "ArrowLeft" || ev.key == "Left"){
					self.moveLeft();
				}else if(ev.key == "ArrowDown" || ev.key == "Down"){
					self.moveDown();
				}else if(ev.key == "ArrowUp" || ev.key == "Up"){
					self.moveUp();
				}
			},
			false // dispatch event in the bubbling phase not in the capturing phase
		)

		document.addEventListener(
			"keyup",
			(ev) => {
				if(
					ev.key == "ArrowRight" || ev.key == "Right" ||
					ev.key == "ArrowLeft" || ev.key == "Left" ||
					ev.key == "ArrowUp" || ev.key == "Up" ||
					ev.key == "ArrowDown" || ev.key == "Down"
				){
					// Set both incrementation values to 0 so that the player won't move.
					this.increment_X_VALUE = 0;
					this.increment_Y_VALUE = 0;
				}
			},
			false // dispatch event in the bubbling phase not in the capturing phase
		)

		/* KEY MOVEMENT */
	}
	clear(){
		this.canvasRenderingContext2D.clearRect(
			0, 0,
			this.canvas.width, this.canvas.height
		);
	}
	drawPlayer(){
		// Clear out the entire canvas
		this.clear(); 

		// Draw the player
		this.canvasRenderingContext2D.beginPath();
		this.canvasRenderingContext2D.drawImage(
			image,
			this.POS_X, this.POS_Y,
			this.width, this.height
		);

		this.canvasRenderingContext2D.fill();
	}
	newPos(){
		// Increment Coordinates
		this.POS_X += this.increment_X_VALUE;
		this.POS_Y += this.increment_Y_VALUE;
	}
	checkForCollisionAndStopIt(){
		// Checking for collisions

		// RIGHT WALL
		if(this.POS_X + this.width > this.canvas.width){
			this.POS_X = this.canvas.width - this.width;
		};

		// LEFT WALL
		if(this.POS_X < 0){
			this.POS_X = 0;
		};

		// BOTTOM WALL
		if(this.POS_Y + this.height > this.canvas.height){
			this.POS_Y = this.canvas.height - this.height;
		};

		// UP WALL
		if(this.POS_Y < 0){
			this.POS_Y = 0;
		};
	}
	update(){
		this.drawPlayer();
		this.newPos();
		this.checkForCollisionAndStopIt();

		// Request a new animation frame for the window || The animation frame will be the function this.update, but because this function uses the "this" keyword, we must bind it in order to expalin to it, what "this" will reference to. And the "this" will reference to our "this" object
		window.requestAnimationFrame(this.update.bind(this));
	}

	// Methods for the key movement
	moveRight(){
		this.increment_X_VALUE = this.speed;
	}
	moveLeft(){
		this.increment_X_VALUE = - (this.speed);
	}
	moveUp(){
		this.increment_Y_VALUE = - (this.speed);
	}
	moveDown(){
		this.increment_Y_VALUE = this.speed;
	}
}

// Create a new player
let player = new Player(
	100, 100,
	10,
	image, 
	50, 70, 
	canvas, context
);

// Request animation frame for the window | bind the "this" reference to the player object |
window.requestAnimationFrame(player.update.bind(player)); // bind reference
