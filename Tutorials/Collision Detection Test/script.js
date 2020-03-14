let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

var MOUSE_COORDS = {
    x : undefined,
    y : undefined
}

function resize(){
    canvas.width = window.innerWidth - 5;
    canvas.height = window.innerHeight - 5;
}
resize();

var circlesArray = new Array();

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

class Circle{
    constructor(pos_x, pos_y, radius, color, trackable=false, trackCollisionObjects, canvas, canvasRenderingContext){
        // Class properties
        this.pos_x = pos_x;
        this.pos_y = pos_y;

        this.radius = radius;

        this.color = color;
        this.defaultColor = color;

        this.trackable = trackable;
        this.trackCollisionObjects = trackCollisionObjects;
        
        // Class canvas and canvas rendering context
        this.canvas = canvas;
        this.canvasRenderingContext = canvasRenderingContext;
    }
    clear(){
        this.canvasRenderingContext.clearRect(
            0, 0,
            this.canvas.width, this.canvas.height
        )
    }
    drawCircle(){
        this.canvasRenderingContext.beginPath();

        this.canvasRenderingContext.arc(
            this.pos_x, this.pos_y,
            this.radius,
            0, Math.PI * 2,
            false
        )

        this.canvasRenderingContext.fillStyle = this.color;
        this.canvasRenderingContext.fill();
    }
    newPos(){
        this.pos_x = MOUSE_COORDS.x;
        this.pos_y = MOUSE_COORDS.y;
    }
    handleCollisionWithObjects(){
        let collisionBool = false

        for(let i = 0 ; i < this.trackCollisionObjects.length ; i++){
            // console.log(Math.abs((this.pos_x + this.radius) - (this.trackCollisionObjects[i].pos_x + this.radius)) < this.trackCollisionObjects[i].radius);
            if(
                Math.abs((this.pos_x + this.radius) - (this.trackCollisionObjects[i].pos_x + this.radius)) < (this.trackCollisionObjects[i].radius + this.radius + 2)
            ){
                this.color = "black";
                collisionBool = true;
                break;
            }
        }
        if(!collisionBool){
            this.color = this.defaultColor;
        }
    }
    update(){
        if(this.trackable){
            this.clear();
            this.newPos();
            this.handleCollisionWithObjects();
            this.drawCircle();

            circlesArray.map((circle) => {
                circle.drawCircle();
            })

            // Request animation frame
            window.requestAnimationFrame(this.update.bind(this));
        }
    }
}

let circle_0 = new Circle(500, 500, 100, "red", false, [], canvas, ctx);
circlesArray.push(circle_0);
circle_0.drawCircle();

let circle_1 = new Circle(100, 100, 50, "blue", true, [circle_0], canvas, ctx);
circlesArray.push(circle_1);

document.addEventListener(
    "mousemove",
    (event) => {
        window.requestAnimationFrame(circle_1.update.bind(circle_1));
    },
    false // dispatch event in the bubbling phase not in the capturing phase
)