let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

var MOUSE_COORDS = {
	x: undefined,
	y: undefined
}

function resize() {
	canvas.width = window.innerWidth - 10;
	canvas.height = window.innerHeight - 10;
}
resize();

window.addEventListener(
	"resize",
	resize,
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

class Circle {
	constructor(pos_x, pos_y, radius, color, canvas, canvasRenderingContext) {
		// Class properties
		this.pos_x = pos_x;
		this.pos_y = pos_y;

		this.radius = radius;
		this.color = color;

		// Class canvas and canvas rendering context ( 2d format ) 
		this.canvas = canvas;
		this.canvasRenderingContext = canvasRenderingContext;
	}
	drawCircle() {
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
	update() {
		this.drawCircle();
	}
}

let circle0 = new Circle(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 100, "red", canvas, ctx);
let circle1 = new Circle(undefined, undefined, 50, "blue", canvas, ctx);

getDistance = (circle0, circle1) => Math.sqrt(Math.pow(circle0.pos_x - circle1.pos_x, 2) + Math.pow(circle0.pos_y - circle1.pos_y, 2));

function animate() {
	ctx.clearRect(
		0, 0,
		canvas.width, canvas.height
	);

	circle0.update();
	circle1.update();

	circle1.pos_x = MOUSE_COORDS.x;
	circle1.pos_y = MOUSE_COORDS.y;

	if (getDistance(circle0, circle1) < circle0.radius + circle1.radius) {
		circle1.color = "black";
	} else {
		circle1.color = "blue";
	}

	window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);