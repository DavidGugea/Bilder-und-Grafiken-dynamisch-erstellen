let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

function resizeWindow(){    
    canvas.width = window.innerWidth - 6;
    canvas.height = window.innerHeight - 6;    
}
resizeWindow();

window.addEventListener(
    "resize",
    (event) => {
        resizeWindow();
        createCircles(5000);
    },
    false // dispatch event in the bubbling phase not in the capturing phase
);

document.addEventListener(
    "DOMContentLoaded",
    (event) => {
        createCircles(5000);
    },
    false // dispatch event in the bubbling phase not in the capturing phase
)

let CIRCLES_ARRAY = new Array();

let HEX_COLORS = [
    "#F20530",
    "#025E73",
    "#037F8C",
    "#F29F05",
    "#F27405"
];

/* *************** Mouse Class *************** */

let mouse_coordinates = {
    x : undefined,
    y : undefined
};

/* *************** Mouse Class *************** */

/* *************** Circle Class *************** */

class Circle{ 
    constructor(pos_x, pos_y, velocity_x, velocity_y, hexColor, radius, MOUSE_DISTANCE, MOUSE_MIN_RADIUS, MOUSE_MAX_RADIUS, canvas, canvasRenderingContext2D){
        //Class properties
        this.pos_x = pos_x;
        this.pos_y = pos_y;

        this.velocity_x = velocity_x;
        this.velocity_y = velocity_y;

        this.hexColor = hexColor;
        this.radius = radius;

        this.MOUSE_DISTANCE = MOUSE_DISTANCE;
        this.MOUSE_MIN_RADIUS = MOUSE_MIN_RADIUS;
        this.MOUSE_MAX_RADIUS = MOUSE_MAX_RADIUS;
    
        // Class canvas and canvas rendering context ( 2D Format )
        this.canvas = canvas;
        this.canvasRenderingContext2D = canvasRenderingContext2D;
    }
    drawCircle(){
        this.canvasRenderingContext2D.beginPath();
        this.canvasRenderingContext2D.arc(
            this.pos_x, this.pos_y,
            this.radius,
            0, Math.PI * 2,
            false
        );

        this.canvasRenderingContext2D.fillStyle = this.hexColor;
        this.canvasRenderingContext2D.fill();
    }
    newPos(){
        this.pos_x += this.velocity_x;
        this.pos_y += this.velocity_y;
    }
    handleCollision(){
        if(this.pos_x + this.radius > this.canvas.width || this.pos_x - this.radius < 0){
            this.velocity_x *= -1;
        }
        if(this.pos_y + this.radius > this.canvas.height || this.pos_y - this.radius < 0){
            this.velocity_y *= -1;
        }
    }
    handleMouseMovement(){
        if(
            Math.abs(this.pos_x - mouse_coordinates.x) < this.MOUSE_DISTANCE
            &&
            Math.abs(this.pos_y - mouse_coordinates.y) < this.MOUSE_DISTANCE
            &&
            this.radius < this.MOUSE_MAX_RADIUS
        ){
            this.radius += 1;
        }else if(this.radius > this.MOUSE_MIN_RADIUS){
            this.radius -= 1;
        }
    }
    update(){
        this.newPos();
        this.handleCollision();
        this.handleMouseMovement();


        this.drawCircle();
    }
}

/* *************** Circle Class *************** */

// Make a function that will create the circles, add it to the window "resize" event listener too, so the circles are generate dynamically
function createCircles(amount){
    // Empty out the existent array
    CIRCLES_ARRAY = new Array();
    for(let i = 0 ; i < amount ; i++){
        // Create random values for the circle
        let radius = Math.random() * 20;

        let pos_x = Math.random() * (canvas.width - 2 * radius) + radius;
        let pos_y = Math.random() * (canvas.height - 2 * radius) + radius;
        let velocity_x = (Math.random() * 5 + 1) * (Math.random() - 0.5);
        let velocity_y = (Math.random() * 5 + 1) * (Math.random() - 0.5);
        let hex_color = HEX_COLORS[Math.floor(Math.random() * HEX_COLORS.length)];

        let distance = 50;
        let min_radius = Math.random() * 2 + 1;
        let max_radius = Math.random() * 40 + 1;

        // Create the circle
        let circle = new Circle(
            pos_x, pos_y,
            velocity_x, velocity_y,
            hex_color, radius,
            distance, min_radius, max_radius,
            canvas, ctx
        );

        // Add the circle to the circles array
        CIRCLES_ARRAY.push(circle);
        circle.drawCircle();
    }
}


// Animate the circle movement
function animateCircleMovement(){
    ctx.clearRect(
        0, 0,
        canvas.width, canvas.height
    )

    CIRCLES_ARRAY.map((circle) => {
        circle.update();
    });

    window.requestAnimationFrame(animateCircleMovement);
};

window.requestAnimationFrame(animateCircleMovement);

window.addEventListener(
    "mousemove",
    (event) => {
        mouse_coordinates.x = event.x;
        mouse_coordinates.y = event.y;
    },  
    false // dispatch event in the bubbling phase not in the capturing phase
)