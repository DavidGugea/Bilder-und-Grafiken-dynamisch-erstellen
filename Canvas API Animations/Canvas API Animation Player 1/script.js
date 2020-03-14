let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let image = document.getElementById("source");

let player = {
    x : 20,
    y : 50,
    speed : 7,
    dx : 0,
    dy : 0,
    w : 50,
    h : 70
}

function clear(){
    ctx.clearRect(
        0, 0,
        canvas.width, canvas.height
    );
};
function draw(){
    clear();

    ctx.beginPath();
    ctx.drawImage(
        image,
        player.x, player.y,
        player.w, player.h
    );
    
    ctx.fill();
};
function check_and_stopFromCollision(){
    // Right wall
    if(player.x + player.w > canvas.width){
        player.x = canvas.width - player.w;
    }

    // Left wall
    if(player.x < 0){
        player.x = 0;
    }

    // Bottom wall
    if(player.y + player.h > canvas.height){
        player.y = canvas.height - player.h;
    }

    // Up wall
    if(player.y < 0){
        player.y = 0;
    }
}
function newPos(){
    player.x += player.dx;
    player.y += player.dy;

    check_and_stopFromCollision();
};
function update(){
    draw();
    newPos();

    window.requestAnimationFrame(update);
};

window.requestAnimationFrame(update);

function moveRight(){
    player.dx = player.speed;
}
function moveLeft(){
    player.dx = - player.speed;
}
function moveUp(){
    player.dy = -player.speed;
}
function moveDown(){
    player.dy = player.speed;
}
function keydown(ev){
    if(ev.key == "ArrowRight" || ev.key == "Right"){
        moveRight();
    }
    if(ev.key == "ArrowLeft" || ev.key == "Left"){
        moveLeft();
    }
    if(ev.key == "ArrowUp" || ev.key == "Up"){
        moveUp();
    }
    if(ev.key == "ArrowDown" || ev.key == "Down"){
        moveDown();
    }
}
function keyup(ev){
    if(
        ev.key == "ArrowRight" || ev.key == "Right" ||
        ev.key == "ArrowLeft" || ev.key == "Left" ||
        ev.key == "ArrowUp" || ev.key == "Up" ||
        ev.key == "ArrowDown" || ev.key == "Down"
    ){
        player.dx = 0;
        player.dy = 0;
    }
}

document.addEventListener(
    "keydown",
    keydown,
    false // dispatch event in the bubbling phase not in the capturing phase
)
document.addEventListener(
    "keyup",
    keyup,
    false // dispatch event in the bubbling phase not in the capturing phase
)