let canvas = document.querySelector("canvas");
canvas.style.backgroundColor = "#000000";

let ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth - 5;
    canvas.height = window.innerHeight - 5;
}
resize();

window.addEventListener(
    "resize",
    (event) => {
        resize();
        resetMouseCoords();
        createParticles(amountOfParticles);
    },
    false // dispatch event in the bubbling phase not in the capturing phase
)

/* ~~~~~~~~ COLOR THEME CHANGE FOR THE PARTICLES ~~~~~~~~ */

document.addEventListener(
    "click",
    (event) => {
        changeColorTheme();
    },
    false // dispatch event in the bubbling phase not in the capturing phase
)
document.addEventListener(
    "keydown",
    (event) => {
        if(event.key === "c"){
            changeColorTheme();
        }
    },
    false // dispatch event in the bubbling phase not in the capturing phase
)

/* ~~~~~~~~ COLOR THEME CHANGE FOR THE PARTICLES ~~~~~~~~ */


/* ~~~~~~~~ BACKGROUND THEME CHANGE FOR THE PARTICLES ~~~~~~~~ */

document.addEventListener(
    "keydown",
    (event) => {
        if(event.key === "v"){
            changeBackgroundColorTheme();
        }
    },
    false // dispatch event in the bubbling phase not in the capturing phase
)

/* ~~~~~~~~ BACKGROUND THEME CHANGE FOR THE PARTICLES ~~~~~~~~ */

document.addEventListener(
    "mousemove",
    (event) => {
        MOUSE_COORDS.x = event.x;
        MOUSE_COORDS.y = event.y;
    },
    false // dispatch event in the bubbling phase not in the capturing phase
)

function resetMouseCoords() {
    MOUSE_COORDS.x = Math.floor(canvas.width / 2);
    MOUSE_COORDS.y = Math.floor(canvas.height / 2);
}

/* PROGRAM VARS */

let amountOfParticles = 50;
let particlesArray = new Array();
let alphaTransparency = 0.03;
let backgroundTheme = "0, 0, 0"; // ONLY RGB VALUES !
let colors = {
    0: ["#0A2459", "#0D2F73", "#16558C", "#147CA6", "#36B1BF"],
    1: ["#285059", "#30BF97", "#F2AE30", "#D97B29", "#D93636"],
    2: ["#666E73", "#A5BF7E", "#F2EDD0", "#F2B66D", "#D97B59"],
    3: ["#1F308C", "#4167D9", "#3B89BF", "#FF6424", "#FF001D"],
    4: ["#5089A5", "#B3E7F2", "#D95032", "#FBA481", "#183446"]
}
let colorPaletteNumber = 0;

let MOUSE_COORDS = {
    x: Math.floor(canvas.width / 2),
    y: Math.floor(canvas.height / 2)
}

/* PROGRAM VARS */

class Particle {
    constructor(pos_x, pos_y, radius, color, canvas, canvasRenderingContext) {
        // Class properties
        this.pos_x = pos_x;
        this.pos_y = pos_y;

        this.radius = radius;
        this.color = color;

        // Class canvas and canvas rendering context
        this.canvas = canvas;
        this.canvasRenderingContext = canvasRenderingContext;

        // Class vars
        this.startPointX = pos_x;
        this.startPointY = pos_y;

        this.angle = Math.random() * 360;
        this.angleVelocity = 0.0005;
        this.motionRadius = Math.random() * 100;
        this.mouseTrackVelocity = 0.05;

        this.lastPositions_AXIS = {
            x: this.startPointX,
            y: this.startPointY
        }
        this.lastMousePOS = {
            x: this.startPointX,
            y: this.startPointY
        }
    }
    draw() {
        this.canvasRenderingContext.beginPath();

        this.canvasRenderingContext.moveTo(this.lastPositions_AXIS.x, this.lastPositions_AXIS.y);
        this.canvasRenderingContext.lineTo(this.pos_x, this.pos_y);

        this.canvasRenderingContext.lineWidth = this.radius;
        this.canvasRenderingContext.strokeStyle = this.color;
        this.canvasRenderingContext.stroke();

        this.canvasRenderingContext.closePath();
    }
    circularMotion() {
        // Use trigonometry functions (sin and cos) to get the positions of the coordinates on X and Y axis
        let radians = this.angle * 180 / Math.PI;
        this.pos_x = this.lastMousePOS.x + Math.cos(radians) * this.motionRadius;
        this.pos_y = this.lastMousePOS.y + Math.sin(radians) * this.motionRadius;

        // Increase angle with the angle velocity || Reset angle in case it is bigger than 360
        this.angle += this.angleVelocity;
        if (this.angle > 360) {
            this.angle = 0;
        }
    }
    trackLastPosition() {
        this.lastPositions_AXIS.x = this.pos_x;
        this.lastPositions_AXIS.y = this.pos_y;
    }
    trackLastMousePosition(){
        this.lastMousePOS.x += (MOUSE_COORDS.x - this.lastMousePOS.x) * this.mouseTrackVelocity;
        this.lastMousePOS.y += (MOUSE_COORDS.y - this.lastMousePOS.y) * this.mouseTrackVelocity;
    }
    update() {
        this.trackLastMousePosition();
        this.trackLastPosition();
        this.circularMotion();
        this.draw();
    }
}

function createParticles(amount) {
    // Empty out particles array
    particlesArray = new Array();
    // Empty out canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < amount; i++) {
        let radius = Math.random() * 2 + 1;
        let color = colors[colorPaletteNumber][Math.floor(Math.random() * colors[colorPaletteNumber].length)];

        let particle = new Particle(
            Math.floor(canvas.width / 2), Math.floor(canvas.height / 2),
            radius, color,
            canvas, ctx
        )

        particlesArray.push(particle);
    }
}
createParticles(amountOfParticles);

// Animate particles
function animate() {
    // Clear out canvas
    ctx.fillStyle = `rgba(${backgroundTheme} ,${alphaTransparency})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particlesArray.map((particle) => {
        particle.update();
    });

    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);

// Change Color Theme by click
function changeColorTheme() {
    colorPaletteNumber += 1;
    if (colorPaletteNumber > Object.keys(colors).length - 1) {
        // Reset color palette number
        colorPaletteNumber = 0;
    }

    // Reset mouse coords
    resetMouseCoords();

    // After the color theme for the particles has been changed, we need to create new particles that have that color theme
    createParticles(amountOfParticles);
}
function changeBackgroundColorTheme(){
    // Swap
    switch(backgroundTheme){
        case "0, 0, 0":
            backgroundTheme = "255, 255, 255";
            canvas.style.backgroundColor = "white";
            break;
        case "255, 255, 255":
            backgroundTheme = "0, 0, 0";
            canvas.style.backgroundColor = "#000000";
            break;
    }
}