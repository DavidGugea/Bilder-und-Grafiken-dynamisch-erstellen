var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth-6;
canvas.height = window.innerHeight-6;

var c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y : undefined
}

let maxRadius = 50;
let minRadius = 2;

var colorArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9'
]

window.addEventListener(
    "mousemove",
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.minRadius = radius;


    this.draw = function(){
        c.beginPath();
        c.arc(
            this.x, this.y, this.radius, 0, Math.PI * 2, false
        );
        // c.strokeStyle = "blue";
        // c.stroke();

        c.fillStyle = this.color;
        c.fill();
    }
    
    this.update = function(){
        if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
            this.dx *= -1;
        }
        if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
            this.dy *= -1;
        }
            
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y  < 50 && mouse.y - this.y > -50){
            if(this.radius < maxRadius){
                this.radius += 1;
            }
        }else if(this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = new Array()    

function init(){;
    circleArray = new Array();
    for(let i = 0 ; i < 5000 ; i++){
        var radius = Math.random() * 3 + 1;
        
        var x = Math.random() * ( canvas.width - radius * 2) + radius;
        var y = Math.random() * ( canvas.height - radius * 2 ) + radius;
        var dx = (Math.random() - 0.5) * Math.random() * 5; // x velocity
        var dy = (Math.random() - 0.5) * Math.random() * 5; // v velocity
        
        circleArray.push(new Circle(
            x, y, dx, dy, radius
        ))
    }
}

function animate(){
    c.clearRect(
        0, 0,
        canvas.width, canvas.height
    );

    for(let i = 0 ; i < circleArray.length ; i++){
        circleArray[i].update();
    }

    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);

window.addEventListener(
    "resize",
    function(event){
        canvas.width = window.innerWidth-6;
        canvas.height = window.innerHeight-6;

        init();
    }
);

init();