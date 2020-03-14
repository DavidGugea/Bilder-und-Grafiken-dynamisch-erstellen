let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth - 25;
canvas.height = window.innerHeight - 25;

let ctx = canvas.getContext("2d");

let circles = new Array();

class Circle{
    constructor(pos_x, pos_y, velocity_x, velocity_y, radius, color0, color1, color2){
        // Class properties
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        
        this.velocity_x = velocity_x;
        this.velocity_y = velocity_y;
        
        this.radius = radius;
        
        this.color0 = color0;
        this.color1 = color1;
        this.color2 = color2;
    }
    drawCircle(){
        ctx.beginPath();
        ctx.arc(
            this.pos_x, this.pos_y,
            this.radius,
            0, Math.PI * 2,
            false
        );

        ctx.fillStyle = `rgb(${this.color0}, ${this.color1}, ${this.color2})`;
        ctx.fill();
    }
    checkForCollision(){
        if(this.pos_x + this.radius > canvas.width || this.pos_x - this.radius < 0){
            this.velocity_x *= -1;
        }
        if(this.pos_y + this.radius > canvas.height || this.pos_y - this.radius < 0){
            this.velocity_y *= -1;
        }
    }
    newPos(){
        this.pos_x += this.velocity_x;
        this.pos_y += this.velocity_y;
    }
    update(){
        this.newPos();
        this.checkForCollision();
        this.drawCircle();
    }
}

// Create 50 circles
for(let i = 0 ; i < 100 ; i++){
    // Create random values 
    let radius = Math.random() * 50 + 15;

    let pos_x = Math.random() * (canvas.width - radius * 2) + radius;
    let pos_y = Math.random() * (canvas.height - radius * 2) + radius;
    let velocity_x = Math.random() * 5;
    let velocity_y = Math.random() * 5;
    
    let color0 = Math.random() * 255;
    let color1 = Math.random() * 255;
    let color2 = Math.random() * 255;

    // Create the circle
    let circle = new Circle(
        pos_x, pos_y,
        velocity_x, velocity_y,
        radius,
        color0, color1, color2
    );

    // Add the circle to the circle array
    circles.push(circle);
}

function animateCircles(){
    ctx.clearRect(
        0, 0,
        canvas.width, canvas.height
    );

    circles.map((circle) => {
        circle.update();
    });

    window.requestAnimationFrame(animateCircles);
}

window.requestAnimationFrame(animateCircles);