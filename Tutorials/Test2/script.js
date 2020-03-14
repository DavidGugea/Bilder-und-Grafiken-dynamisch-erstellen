const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

function resize(){
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;
}
resize();

window.addEventListener(
    "resize",
    resize,
    false // dispatch event in the bubbling phase not in the capturing phase
)

/* PROGRAM VALUES */

let squaresArray = new Array();
let amountOfSquares = 1;

/* PROGRAM VALUES */

class Square{
    constructor(pos_x, pos_y, color, width, height, motionRadius, canvas, canvasRenderingContext){
        // Class properties
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.color = color;
        this.motionRadius = motionRadius;

        this.width = width;
        this.height = height;

        // Class canvas and canvas rendering context
        this.canvas = canvas;
        this.canvasRenderingContext = canvasRenderingContext;

        // Class vars
        this.angle = 0;
        this.angleVelocity = 1;
    
        this.startPosX = pos_x;
        this.startPosY = pos_y;
    }
    draw(){
        this.canvasRenderingContext.beginPath();

        let radians = this.angle * Math.PI / 180;
        this.pos_x = this.startPosX + Math.cos(radians) * this.motionRadius;
        this.pos_y = this.startPosY + Math.sin(radians) * this.motionRadius;

        this.canvasRenderingContext.fillStyle = this.color;
        this.canvasRenderingContext.fillRect(this.pos_x, this.pos_y, this.width, this.height);

        this.canvasRenderingContext.closePath();
    
        this.angle += this.angleVelocity;
        if(this.angle > 360){
            // Reset angle
            this.angle = 0;
        }
    }
    update(){
        this.draw();
    }
}

let square0 = new Square(canvas.width / 2, canvas.height / 2, "red", 50, 50, 200, canvas, ctx);
let square1 = new Square(canvas.width / 2, canvas.height / 2, "blue", 50, 50, 250, canvas, ctx);
let square3 = new Square(canvas.width / 2, canvas.height / 2, "green", 50, 50, 300, canvas, ctx);

function animate(){ 
    
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    

    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    square0.update();
    square1.update();
    square3.update();

    window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);