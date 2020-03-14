const canvas = document.querySelector("canvas");
canvas.style.backgroundColor = "black";
const ctx = canvas.getContext("2d");

const hex_colors = [
    "#F20530",
    "#025E73",
    "#037F8C",
    "#F29F05",
    "#F27405"
];
const amountOfCircles = 500;
var circlesArray = new Array();

let MOUSE_COORDS = {
    x : undefined,
    y : undefined
}

document.addEventListener(
    "mousemove",
    (event) => {
        MOUSE_COORDS.x = event.x;
        MOUSE_COORDS.y = event.y;
    },
    false // dispatch event in the bubbling phase not in the capturing phase
);

document.addEventListener(
    "click",
    (event) => {
        resize();
        createCircles(amountOfCircles);
    },
    false // dispatch event in the bubbling phase not in the capturing phase
)

function resize(){
    canvas.width = window.innerWidth - 6.2;
    canvas.height = window.innerHeight - 6.2;
}
resize();

window.addEventListener(
    "resize",
    (event) => {
        resize();
        createCircles(amountOfCircles)
    },
    false // dispatch event in the bubbling phase not in the capturing phase
);

class Circle{
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

        // CONSTANT VARS
        this.pointerDistance = 50;

        // Change the variable in case the object is in the range of the pointer || DEFAULT SET TO FALSE
        this.inRangeOfPointer = false;
        // inRangeRadiusMulitply is the "distance" allowed between the mouse pointer and the radius mutliplied by the inRangeRadiusMultiply
        this.inRangeRadiusMultiply = 5;

        // MaxRadius and MinRadius allowed to change when the object is in range of the mouse pointer
        this.MaxRadius = 50;
        this.MinRadius = 2;

        // Increase them by Range in case that the mouse pointer is in their location ( in the location of the mouse radius multiplied by this.inRangeRadiusMultiply ) otherwise change the radius by decrementing it to this.MinRadius
        this.increaseByRange = true;
    }
    drawCircle(){
        this.canvasRenderingContext.beginPath();

        this.canvasRenderingContext.arc(
            this.pos_x, this.pos_y,
            this.radius,
            0, Math.PI * 2,
            false
        );

        if(!this.inRangeOfPointer){
            // Set the default canvas fill style to the same backgroundColor as the canvas
            this.canvasRenderingContext.fillStyle = canvas.style.backgroundColor || "white"
        }else{
            this.canvasRenderingContext.fillStyle = this.hex_color;
        }

        this.canvasRenderingContext.strokeStyle = this.hex_color;
        this.canvasRenderingContext.stroke();
        this.canvasRenderingContext.fill();

        this.canvasRenderingContext.closePath();
    }
    newPos(){
        this.pos_x += this.velocity_x;
        this.pos_y += this.velocity_y;
    }
    handleCollisionWithWalls(){
        // VELOCITY CHANGE FOR COLLISION
        
        // X VELOCITY
        if(this.pos_x + this.radius >= this.canvas.width || this.pos_x - this.radius <= 0){
            this.velocity_x *= -1;
        }
        
        // Y VELOCITY
        if(this.pos_y + this.radius >= this.canvas.height || this.pos_y - this.radius <= 0){
            this.velocity_y *= -1;
        }

        // POSITION CHANGE FOR COLLISION
        
        // RIGHT WALL
        if(this.pos_x + this.radius >= this.canvas.width){
            this.pos_x = this.canvas.width - this.radius;
        }
        
        // LEFT WALL
        if(this.pos_x - this.radius <= 0){
            this.pos_x = this.radius;
        }
        
        // BOTTOM WALL
        if(this.pos_y + this.radius >= this.canvas.height){
            this.pos_y = this.canvas.height - this.radius
        }

        // TOP WALL
        if(this.pos_y - this.radius <= 0){
            this.pos_y = this.radius;
        }
    }
    handleCollisionWithMouse(){
        if(Math.abs(MOUSE_COORDS.x - this.pos_x) < this.radius * this.inRangeRadiusMultiply && Math.abs(MOUSE_COORDS.y - this.pos_y) < this.radius * this.inRangeRadiusMultiply){
            this.inRangeOfPointer = true;
        }else{
            this.inRangeOfPointer = false;
        }

        if(this.increaseByRange){
            if(Math.abs(MOUSE_COORDS.x - this.pos_x) <= this.pointerDistance && Math.abs(MOUSE_COORDS.y - this.pos_y) <= this.pointerDistance && this.radius < this.MaxRadius){
                this.radius++;
            }else if(this.radius >= this.MinRadius){
                this.radius--;
            }
        }
    }
    getDistance(circle0, circle1){
        // console.log(Math.sqrt(Math.abs(circle0.pos_x - circle1.pos_x)**2 + Math.abs(circle0.pos_y - circle1.pos_y)**2), Math.sqrt(Math.abs(circle0.pos_x - circle1.pos_x)**2 + Math.abs(circle0.pos_y - circle1.pos_y)**2) < circle0.radius + circle1.radius)
        return Math.sqrt(Math.abs(circle0.pos_x - circle1.pos_x)**2 + Math.abs(circle0.pos_y - circle1.pos_y)**2);
    }
    handleCollisionWithObjects(){
        for(let i = 0 ; i < circlesArray.length ; i++){
            //console.log(this.getDistance(this, circlesArray[i]));
            if(this.getDistance(this, circlesArray[i]) <= this.radius + circlesArray[i].radius && this.getDistance(this, circlesArray[i]) > 0){
                // Change velocity
                this.velocity_x *= -1;
                this.velocity_y *= -1;

                circlesArray[i].velocity_x *= -1;
                circlesArray[i].velocity_y *= -1;
            }
        }
    }
    update(){
        this.newPos();

        this.handleCollisionWithWalls();
        this.handleCollisionWithMouse();
        this.handleCollisionWithObjects();

        this.drawCircle();
    }
}

function createCircles(amount){
    // Empty out the array
    circlesArray = new Array();

    for(let i = 0 ; i < amount ; i++){
        // Create random values for the circle
        let radius = Math.random() * 30 + 5;

        let velocity_x = (Math.random() * 10 + 1) * (Math.random() - 0.5);
        let velocity_y = (Math.random() * 10 + 1) * (Math.random() - 0.5);
        
        let pos_x = Math.random() * (canvas.width - radius * 2 - velocity_x) + radius * 2;
        let pos_y = Math.random() * (canvas.height - radius * 2 - velocity_y) + radius * 2;

        let hex_color = hex_colors[Math.floor(Math.random() * hex_colors.length)];

        let circle = new Circle(
            pos_x, pos_y,
            velocity_x, velocity_y,
            radius, hex_color, 
            canvas, ctx
        );
        circle.drawCircle();

        circlesArray.push(circle);
    }
}

createCircles(amountOfCircles);

function animate(){
    ctx.clearRect(
        0, 0,
        canvas.width, canvas.height
    );

    circlesArray.map((circle) => {
        circle.update();
    });

    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);