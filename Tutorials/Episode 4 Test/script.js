let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth - 25;
canvas.height = window.innerHeight - 25;

let circles = new Array();

let ctx = canvas.getContext("2d");

class Circle{
    constructor(pos_x, pos_y, velocity_x, velocity_y, radius, color0, color1, color2, transparency, canvas, canvasRenderingContext2D){
        // Class properties
        this.pos_x = pos_x;
        this.pos_y = pos_y;

        this.velocity_x = velocity_x
        this.velocity_y = velocity_y;
        
        this.radius = radius;

        this.color0 = color0;
        this.color1 = color1;
        this.color2 = color2;
        this.transparency = transparency;

        // Class canvas and canvasRenderingContext2D
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
        
        this.canvasRenderingContext2D.fillStyle = `rgba(${this.color0}, ${this.color1}, ${this.color2}, ${this.transparency})`;
        this.canvasRenderingContext2D.fill();
    }
    newPos(){
        // Change the position of the circle
        this.pos_x += this.velocity_x;
        this.pos_y += this.velocity_y;
    }
    checkForCollision(){
        if(this.pos_x + this.radius > this.canvas.width || this.pos_x - this.radius < 0){
            this.velocity_x *= -1;
        }
        if(this.pos_y + this.radius > this.canvas.height || this.pos_y - this.radius < 0){
            this.velocity_y *= -1;
        }
    }
    update(){
        this.newPos();
        this.checkForCollision();
        this.drawCircle();
    }
}

// Create 100 new circles
for(let i = 0 ; i < 100; i++){
    // Create random values for the circle
    let radius = Math.random() * 50;

    let pos_x = Math.random() * ( canvas.width - radius * 2 ) + radius;
    let pos_y = Math.random() * ( canvas.height - radius * 2 ) + radius;

    let velocity_x = Math.random() * 10 * (Math.random() - 0.5);
    let velocity_y = Math.random() * 10 * (Math.random() - 0.5);

    let color0 = Math.floor(Math.random() * 255);
    let color1 = Math.floor(Math.random() * 255);
    let color2 = Math.floor(Math.random() * 255);
    let transparency = Math.random();

    // Create a new circle
    let circle = new Circle(
        pos_x, pos_y,
        velocity_x, velocity_y,
        radius,
        color0, color1, color2, transparency,
        canvas, ctx
    );

    // Add the circle instance to the circles array
    circles.push(circle);
}

function animate(){
    ctx.clearRect(
        0, 0,
        canvas.width, canvas.height
    );

    circles.map((circle) => {
        circle.update();
    })

    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);

window.addEventListener(
    "mousemove",
    (event) => {
        // Make an array with all the elements that are in the range of the mouse
        let inRangeCircles = new Array();

        console.log(event.screenX)

        circles.map((circle) => {
            if(event.screenX + 50 < circle.pos_x > event.screenX - 50){
                inRangeCircles.push(circle);
            }
        })

        inRangeCircles.map((circle) => {
            circle.radius = 100;
        })
    },
    false // dispatch event in the bubbling phase not in the capturing phase
)