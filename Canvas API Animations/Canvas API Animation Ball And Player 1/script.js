/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/*
let circle = {
    X_POS : 100,
    Y_POS : 100,
    radius : 50,
    incrementation_x : 1,
    incrementation_y : 5
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(
        circle.X_POS, circle.Y_POS,
        circle.radius,
        0, Math.PI * 2,
        false
    );
    
    ctx.fillStyle = "purple";
    ctx.fill();
}
function update(){
    if(
        circle.X_POS + circle.radius > canvas.width || 
        circle.X_POS - circle.radius < 0
    ){
        circle.incrementation_x *= -1;
    }
    if(
        circle.Y_POS + circle.radius > canvas.height ||
        circle.Y_POS - circle.radius < 0
    ){
        circle.incrementation_y *= -1;
    }

    circle.X_POS += circle.incrementation_x;
    circle.Y_POS += circle.incrementation_y;

    draw();

    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
*/


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// let canvas = document.querySelector("canvas#canvas");
// let ctx = canvas.getContext("2d");

// class Circle{
//     constructor(POS_X, POS_Y, Radius, increment_x, increment_y, fillStyleColor, canvasRenderingContext, canvas = document.querySelector("canvas")){
//         // Circle properties

//         // COORDS
//         this.POS_X = POS_X;
//         this.POS_Y = POS_Y;

//         // Radius 
//         this.Radius = Radius;

//         // Incrementations 
//         this.increment_x = increment_x;
//         this.increment_y = increment_y;

//         // Fill style
//         this.fillStyleColor = fillStyleColor;

//         // Render context and canvas
//         this.canvasRenderingContext = canvasRenderingContext;
//         this.canvas = canvas;
//     }
//     drawCircle(){
//         // Empty canvas
//         this.canvasRenderingContext.clearRect(
//             0, 0,
//             this.canvas.width, this.canvas.height
//         );

//         // Draw circle
//         this.canvasRenderingContext.beginPath();
//         this.canvasRenderingContext.arc(
//             this.POS_X, this.POS_Y,
//             this.Radius,
//             0, Math.PI * 2,
//             false
//         );
        
//         this.canvasRenderingContext.fillStyle = this.fillStyleColor;
//         this.canvasRenderingContext.fill();
//     }
//     update(){
//         if(
//             this.POS_X + this.Radius > this.canvas.width ||
//             this.POS_X - this.Radius < 0
//         ){
//             this.increment_x *= -1;
//         }
//         if(
//             this.POS_Y + this.Radius > this.canvas.height ||
//             this.POS_Y - this.Radius < 0
//         ){
//             this.increment_y *= -1;
//         }

//         this.POS_X += this.increment_x;
//         this.POS_Y += this.increment_y;

//         this.drawCircle();
    
//         window.requestAnimationFrame(this.update.bind(this));
//     }
// }

// let circle = new Circle(
//     100, 100,
//     50,
//     5, 3,
//     "#FF0000", 
//     ctx, canvas
// );

// window.requestAnimationFrame(circle.update.bind(circle));

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// let image = document.querySelector("img#mainImage");

// let wizard = {
//     x : 50,
//     y : 50,
//     speed : 20,
//     width : 50,
//     height : 50
// }

// function clearOut(){
//     ctx.clearRect(
//         0, 0,
//         canvas.width, canvas.height
//     );
// }
// function drawPlayer(){
//     clearOut();

//     ctx.beginPath();
//     ctx.drawImage(
//         image,
//         wizard.x, wizard.y,
//         wizard.width, wizard.height
//     );
// };
// function checkForCollision(){
//     // Right wall
//     if(wizard.x + wizard.width > canvas.width){
//         wizard.x = canvas.width - wizard.width;
//     }
    
//     // Left wall
//     if(wizard.x < 0){
//         wizard.x = 0;
//     }

//     // Up wall
//     if(wizard.y < 0){
//         wizard.y = 0;
//     }

//     // Down wall
//     if(wizard.y + wizard.height > canvas.height){
//         wizard.y = canvas.height - wizard.height;
//     }
// }

// function update(){
//     checkForCollision();
//     drawPlayer();

//     // window.requestAnimationFrame(update);
// }

// function moveLeft(){
//     wizard.x -= wizard.speed;
//     update();
// }
// function moveRight(){
//     wizard.x += wizard.speed;
//     update();
// }
// function moveUp(){
//     wizard.y -= wizard.speed;
//     update();
// }
// function moveDown(){
//     wizard.y += wizard.speed;
//     update();
// }

// document.addEventListener(
//     "keydown",
//     (event) => {
//         if(event.key == "ArrowLeft"){
//             moveLeft();
//         }else if(event.key == "ArrowRight"){
//             moveRight();
//         }else if(event.key == "ArrowUp"){
//             moveUp();
//         }else if(event.key == "ArrowDown"){
//             moveDown();
//         }
//     },
//     false // dispatch event in the bubbling phase not in the capturing phase
// )

// update();

// window.requestAnimationFrame(update);
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const image = document.getElementById("source");

const player = {
    w : 50,
    h : 70,
    x : 20,
    y : 200,
    speed : 10,
    dx : 0,
    dy : 0
};

function drawPlayer(){
    ctx.drawImage(image, player.x, player.y, player.w, player.h);
}
function clear(){
    ctx.clearRect(
        0, 0,
        canvas.width, canvas.height
    )
}

function newPos(){
    player.x += player.dx;
    player.y += player.dy;

    detectWalls();
}

function detectWalls(){
    // Right wall 
    if(player.x + player.w > canvas.width){
        player.x = canvas.width - player.w;
    }
    
    // Left wall
    if(player.x < 0){
        player.x = 0;
    }

    // Up wall
    if(player.y < 0){
        player.y = 0;
    }

    // Bottom wall
    if(player.y + player.h > canvas.height){
        player.y = canvas.height - player.h;
    }
}

function update(){
    clear();
    drawPlayer();
    newPos();

    requestAnimationFrame(update);
}

requestAnimationFrame(update);

function moveUp(){
    player.dy = -player.speed;
}
function moveDown(){
    player.dy = player.speed;
}
function moveRight(){
    player.dx = player.speed;
}
function moveLeft(){
    player.dx = -player.speed;
}

function keyDown(e){
    if(e.key === "ArrowRight" || e.key === "Right"){
        moveRight();
    }else if(e.key === "ArrowLeft" || e.key === "Left"){
        moveLeft();
    }else if(e.key === "ArrowUp" || e.key === "Up"){
        moveUp();
    }else if(e.key === "ArrowDown" || e.key === "Down"){
        moveDown();
    }
}
function keyUp(e){
    if(
        e.key === "ArrowRight" || e.key === "Right" ||
        e.key === "ArrowLeft" || e.key === "Left" ||
        e.key === "ArrowUp" || e.key === "Up" ||
        e.key === "ArrowDown" || e.key === "Down"
    ){
        player.dx = 0;
        player.dy = 0;
    }
}

document.addEventListener(
    "keydown",
    keyDown,
    false // dispatch event in the bubbling phase not in the capturing phase
)
document.addEventListener(
    "keyup",
    keyUp,
    false // dispatch event in the bubbling phase not in the capturing phase
)
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
