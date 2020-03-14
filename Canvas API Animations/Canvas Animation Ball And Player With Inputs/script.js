/* ****************************  CANVAS  **************************** */

function clearOutAndCreateNewCanvas(){
	let canvasWidth = eval(document.querySelector("input#canvasWidth").value);
	let canvasHeight = eval(document.querySelector("input#canvasHeight").value);
	let canvasBackgroundColor = document.querySelector("input#canvasBackgroundColor").value;
	let canvasBorderRadius = document.querySelector("input#canvasBorderRadius").value

	// Delete the current canvas in case it exists
	if(document.querySelector("canvas")){
		document.querySelector("body").removeChild(document.querySelector("canvas"));
	}
		
	// Create the canvas and add it to the body
	let canvas = document.createElement("canvas");
	canvas.setAttribute("width", canvasWidth);
	canvas.setAttribute("height", canvasHeight);
	canvas.style.backgroundColor = canvasBackgroundColor;
	canvas.style.borderRadius = `${canvasBorderRadius}px`;

	document.querySelector("body").appendChild(canvas);
}
document.querySelector("button#canvasCreateButton").addEventListener(
		"click",
		(event) => {
			clearOutAndCreateNewCanvas();
		},
		false // dispatch event in the bubbling phase not in the capturing phase
)

/* ****************************  CANVAS  **************************** */

/* ****************************  BALL  **************************** */

class BallBounce{
	constructor(POS_X, POS_Y, speed_X, speed_Y, color, radius, canvas, canvasRenderingContext2D){
		// Class Properties
		this.POS_X = POS_X;
		this.POS_Y = POS_Y;

		this.incrementation_X_VALUE = speed_X;
		this.incrementation_Y_VALUE = speed_Y;

		this.color = color;
		this.radius = radius;

		// Class canvas and canvas rendering context ( 2D Format )
		this.canvas = canvas;
		this.canvasRenderingContext2D = canvasRenderingContext2D;
	}
	clear(){
		this.canvasRenderingContext2D.clearRect(
			0, 0,
			this.canvas.width, this.canvas.height
		);
	}
	drawBall(){
		// Clear out the entire canvas before drawing a new ball
		this.clear();

		// Draw the ball
		this.canvasRenderingContext2D.beginPath();
		this.canvasRenderingContext2D.arc(
			this.POS_X, this.POS_Y,
			this.radius,
			0, Math.PI * 2,
			false
		);

		this.canvasRenderingContext2D.fillStyle = this.color;
		this.canvasRenderingContext2D.fill();
	}
	checkForCollisionsAndStopThem(){
		// Change incrementation values to their opposite values | For example for incrementation_X_VALUE 5 set it to -5

		// Right and left walls
		if(
			this.POS_X + this.radius >= this.canvas.width ||
			this.POS_X - this.radius < 0
		){
			this.incrementation_X_VALUE *= -1; // change to opposite value
		}

		// Up and bottom walls
		if(
			this.POS_Y + this.radius  >= this.canvas.height ||
			this.POS_Y - this.radius< 0
		){
			this.incrementation_Y_VALUE *= -1; // change to opposite value
		}
	}
	newPos(){
		this.POS_X += this.incrementation_X_VALUE;
		this.POS_Y += this.incrementation_Y_VALUE;
	}
	update(){
		// Bind the this method to "this" | We will need to to "this" because the update method uses the keyword "this" which makes a reference to the object, so we will need so specify what "this" actually means by binding it to the object itself and not to the requestAnimationFrame event or to the window object. It needs to be binded to the object itself where "this" makes reference to in the update method
		if(ANIMATION_RUNNING){
			// The update method will be used for the window animation frame request
			this.drawBall();
			this.newPos();
			this.checkForCollisionsAndStopThem();

			window.requestAnimationFrame(this.update.bind(this));
		}
	}
}

var ANIMATION_RUNNING = false;
var newBallBounce;
var asyncStopObjectValues = new Object();

document.querySelector("button#ballCreateButton").addEventListener(
	"click",
	(event) => {
		let checkbox = document.querySelector("div#ballConfiguration");

		if(Object.keys(asyncStopObjectValues).length == 0){
			ANIMATION_RUNNING = true;

			// Read user inputs
			let ball_POS_X = eval(document.querySelector("input#ball_POS_X").value);
			let ball_POS_Y = eval(document.querySelector("input#ball_POS_Y").value);
			let ball_Speed_X = eval(document.querySelector("input#ball_Speed_X").value);
			let ball_Speed_Y = eval(document.querySelector("input#ball_Speed_Y").value);
			let ball_Color = document.querySelector("input#ball_Color").value;
			let ball_Radius = eval(document.querySelector("input#ball_Radius").value);

			// Create a new BallBounce instance
			let canvas = document.querySelector("canvas");
			let ctx = canvas.getContext("2d");

			// Clear out canvas
			ctx.clearRect(
				0, 0,
				canvas.width, canvas.height	
			)

			newBallBounce = new BallBounce(
				ball_POS_X, ball_POS_Y,
				ball_Speed_X, ball_Speed_Y,
				ball_Color, ball_Radius,
				canvas, ctx
			);

			// Make a new window animation frame request and bind the newBallBounce update to the object itself not to to the window object
	 		
	 		ANIMATION_RUNNING = true;
			window.requestAnimationFrame(newBallBounce.update.bind(newBallBounce));
		}else if(Object.keys(asyncStopObjectValues).length == 4){
			// Read user inputs for the ball
			let ball_Color = document.querySelector("input#ball_Color").value;
			let ball_Radius = eval(document.querySelector("input#ball_Radius").value);

			clearOutAndCreateNewCanvas();

			let canvas = document.querySelector("canvas");
			let ctx = canvas.getContext("2d");

			ctx.clearRect(
				0, 0,
				canvas.width, canvas.height
			);

			// Create a new BallBounce instance
			newBallBounce = new BallBounce(
				asyncStopObjectValues.POS_X, asyncStopObjectValues.POS_Y,
				asyncStopObjectValues.incrementation_X_VALUE, asyncStopObjectValues.incrementation_Y_VALUE,
				ball_Color, ball_Radius,
				canvas, ctx
			);

			// Empty out stop values
			asyncStopObjectValues = new Object();

			ANIMATION_RUNNING = true;
			window.requestAnimationFrame(newBallBounce.update.bind(newBallBounce));
		}else if(Object.keys(asyncStopObjectValues).length == 6){
			clearOutAndCreateNewCanvas();

			let canvas = document.querySelector("canvas");
			let ctx = canvas.getContext("2d");

			ctx.clearRect(
				0, 0,
				canvas.width, canvas.height
			);

			// Create a new BallBounce instance
			newBallBounce = new BallBounce(
				asyncStopObjectValues.POS_X, asyncStopObjectValues.POS_Y,
				asyncStopObjectValues.incrementation_X_VALUE, asyncStopObjectValues.incrementation_Y_VALUE,
				asyncStopObjectValues.color, asyncStopObjectValues.radius,
				canvas, ctx	
			);

			// Empty out stop values
			asyncStopObjectValues = new Object();

			ANIMATION_RUNNING = true;
			window.requestAnimationFrame(newBallBounce.update.bind(newBallBounce));
		}
	},
	false // dispatch event in the bubbling phase not in the capturing phase
);

document.querySelector("button#ballStopButton").addEventListener(
	"click",
	(event) => {
		ANIMATION_RUNNING = false;

		let asyncStop = document.querySelector("input#asyncBallStop");
		if(asyncStop.checked){
			// If the stop will be async, save all the settings

			asyncStopObjectValues['POS_X'] = eval(newBallBounce.POS_X);
			asyncStopObjectValues['POS_Y'] = eval(newBallBounce.POS_Y);
			asyncStopObjectValues["incrementation_X_VALUE"] = eval(newBallBounce.incrementation_X_VALUE);
			asyncStopObjectValues["incrementation_Y_VALUE"] = eval(newBallBounce.incrementation_Y_VALUE);
			asyncStopObjectValues["color"] = newBallBounce.color;
			asyncStopObjectValues["radius"] = eval(newBallBounce.radius);

			console.log("Object saved !");
			console.log(asyncStopObjectValues);
		}else{
			// If the stop won't be async, save only the positions

			asyncStopObjectValues['POS_X'] = eval(newBallBounce.POS_X);
			asyncStopObjectValues['POS_Y'] = eval(newBallBounce.POS_Y);
			asyncStopObjectValues['incrementation_X_VALUE'] = eval(newBallBounce.incrementation_X_VALUE);
			asyncStopObjectValues['incrementation_Y_VALUE'] = eval(newBallBounce.incrementation_Y_VALUE);
		}
	},
	false // dispatch event in the bubbling phase not in the capturing phase
);
document.querySelector("button#ballClearButton").addEventListener(
	"click",
	(event) => {
		ANIMATION_RUNNING = false;
		asnycStopObjectValues = new Object();
		clearOutAndCreateNewCanvas();
	},
	false // dispatch event in the bubbling phase not in the capturing phase
);

/* ****************************  BALL  **************************** */

/* ****************************  PLAYER  **************************** */

class Player{
	constructor(POS_X, POS_Y, width, height, speed, image, canvas, canvasRenderingContext2D){
		// Class Properties
		this.POS_X = POS_X;
		this.POS_Y = POS_Y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.image = image;

		this.incrementation_X_VALUE = 0;
		this.incrementation_Y_VALUE = 0;

		// Class canvas and canvas rendering context ( 2D Form )
		this.canvas = canvas;
		this.canvasRenderingContext2D = canvasRenderingContext2D;

		/* KEY MOVEMENT */

		var self = this;

		document.addEventListener(
			"keydown",
			(event) => {
				console.log(event.key);
				if(event.key == "ArrowRight" || event.key == "Right"){
					self.moveRight();
				}else if(event.key == "ArrowLeft" || event.key == "Left"){
					self.moveLeft();
				}else if(event.key == "ArrowUp" || event.key == "Up"){
					self.moveUp();
				}else if(event.key == "ArrowDown" || event.key == "Down"){
					self.moveDown();
				}
			},
			false // dispatch event in the bubbling phase not in the capturing phase
		)

		document.addEventListener(
			"keyup",
			(event) => {
				if(
					event.key == "ArrowRight" || event.key == "Right" ||
					event.key == "ArrowLeft" || event.key == "Left" ||
					event.key == "ArrowDown" || event.key == "Down" ||
					event.key == "ArrowUp" || event.key == "Up"
				){
					self.incrementation_X_VALUE = 0;
					self.incrementation_Y_VALUE = 0;
				}
			},
			false // dispatch event in the bubbling phase not in the capturing phase
		)

		/* KEY MOVEMENT */
	}
	moveRight(){
		this.incrementation_X_VALUE = this.speed;
	}
	moveLeft(){
		this.incrementation_X_VALUE = - (this.speed);
	}
	moveUp(){
		this.incrementation_Y_VALUE = - (this.speed);
	}
	moveDown(){
		this.incrementation_Y_VALUE = this.speed;
	}
	checkForCollisionsAndStopThem(){
		// RIGHT WALL
		if(this.POS_X + this.width > this.canvas.width){
			this.POS_X = this.canvas.width - this.width;
		}	

		// LEFT WALL
		if(this.POS_X < 0){
			this.POS_X = 0;
		}

		// BOTTOM WALL
		if(this.POS_Y + this.height > this.canvas.height){
			this.POS_Y = this.canvas.height - this.height;
		}

		// Up wall
		if(this.POS_Y < 0){
			this.POS_Y = 0;
		}
	}
	clear(){
		this.canvasRenderingContext2D.clearRect(
			0, 0,
			this.canvas.width, this.canvas.height
		);
	}
	newPos(){
		// Increment coordinates and check for collisions
		this.POS_X += this.incrementation_X_VALUE;
		this.POS_Y += this.incrementation_Y_VALUE;

		this.checkForCollisionsAndStopThem();
	}
	drawPlayer(){
		// Clear out the canvas before drawing the player
		this.clear();

		// Draw the player
		this.canvasRenderingContext2D.beginPath();

		this.canvasRenderingContext2D.drawImage(
			this.image,
			this.POS_X, this.POS_Y,
			this.width, this.height
		);

		this.canvasRenderingContext2D.fill();
	}
	update(){
		this.drawPlayer();
		this.newPos();

		window.requestAnimationFrame(this.update.bind(this));
	}
}


document.querySelector("button#playerCreateButton").addEventListener(
	"click",
	(event) => {
		// Read user inputs 
		let POS_X = eval(document.querySelector("input#player_POS_X").value);
		let POS_Y = eval(document.querySelector("input#player_POS_Y").value);
		let Width = eval(document.querySelector("input#player_Width").value);
		let Height = eval(document.querySelector("input#player_Height").value);
		let Speed = eval(document.querySelector("input#player_Speed").value);

		let image = document.querySelector("img#playerImage");

		// Clear out the canvas
		clearOutAndCreateNewCanvas();

		let canvas = document.querySelector("canvas");
		let ctx = canvas.getContext("2d");

		// Create and draw the player
		let newPlayer = new Player(
			POS_X, POS_Y, 
			Width, Height,
			Speed,
			image,
			canvas, ctx
		);

		window.requestAnimationFrame(newPlayer.update.bind(newPlayer));
	},
	false // dispatch event in the bubbling phase not in the capturing phase
)

document.querySelector("button#playerClearButton").addEventListener(
	"click",
	(event) => {
		clearOutAndCreateNewCanvas();
	},
	false, // dispatch event in the bubbling phase not in the capturing phase
)
/* ****************************  PLAYER  **************************** */