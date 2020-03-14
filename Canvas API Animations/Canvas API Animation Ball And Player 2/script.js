let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d"); // canvasRenderingContext 2D


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CIRCLE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

class Circle{
    constructor(POS_X, POS_Y, increment_X_VALUE, increment_Y_VALUE, color, radius, canvas, canvasRenderingContext2D){
        // Circle properties
        this.POS_X = POS_X;
        this.POS_Y = POS_Y;
        this.increment_X_VALUE = increment_X_VALUE;
        this.increment_Y_VALUE = increment_Y_VALUE;
        this.color = color;
        this.radius = radius;

        // Canvas and canvas rendering context ( 2d format )
        this.canvas = canvas;
        this.canvasRenderingContext2D = canvasRenderingContext2D;
    }
    clear(){
        this.canvasRenderingContext2D.clearRect(
            0, 0,
            this.canvas.width, this.canvas.height
        );
    }
    drawCircle(){
        this.clear();

        this.canvasRenderingContext2D.beginPath();
        this.canvasRenderingContext2D.arc(
            this.POS_X, this.POS_Y,
            this.radius, 
            0, Math.PI * 2,
            false
        );

        this.canvasRenderingContext2D.fillStyle = this.color;
        this.canvasRenderingContext2D.fill();
    }
    changePos(){
        this.POS_X += this.increment_X_VALUE;
        this.POS_Y += this.increment_Y_VALUE;
    }
    check_and_StopFromCollision(){
        // Right and Left Walls
        if(this.POS_X + this.radius > canvas.width || this.POS_X - this.radius < 0){
            this.increment_X_VALUE *= -1;
        }

        // Bottom and Up walls
        if(this.POS_Y + this.radius > canvas.height  || this.POS_Y - this.radius < 0){
            this.increment_Y_VALUE *= -1;
        }
    }
    update(){
        this.changePos();
        this.check_and_StopFromCollision();
        this.drawCircle();

        window.requestAnimationFrame(this.update.bind(this));
    }
}

let circle = new Circle(
    100, 100,
    5, 3,
    "#FF0000", 
    50,
    canvas, ctx
);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// window.requestAnimationFrame(circle.update.bind(circle));

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PLAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

class Player{
    constructor(POS_X, POS_Y, width, height, speed, image, canvas, canvasRenderingContext2D){
        // Class properties
        this.POS_X = POS_X;
        this.POS_Y = POS_Y;
        this.width = width;
        this.height = height;
        this.increment_X_VALUE = 0;
        this.increment_Y_VALUE = 0;
        this.speed = speed;

        this.image = image;

        // Class canvas and canvas rendering context ( 2D format )
        this.canvas = canvas;
        this.canvasRenderingContext2D = canvasRenderingContext2D;

        var self = this;

        /* KEY MOVEMENT */
        document.addEventListener(
            "keydown",
            (event) => {
                if(event.key == "ArrowRight" || event.key == "Right"){
                    self.moveRight();
                }else if(event.key == "ArrowLeft" || event.key == "Left"){
                    self.moveLeft();
                }else if(event.key == "ArrowUp" || event.key == "Up"){
                    self.moveUp();
                }else if(event.key == "ArrowDown" || event.key == "Down"){
                    self.moveDown();
                }
            },
            false // dispatch event in the bubbling phase not in the capturing phase
        )
        document.addEventListener(
            "keyup",
            (e) => {
                if(
                    e.key === "ArrowRight" || e.key === "Right" ||
                    e.key === "ArrowLeft" || e.key === "Left" ||
                    e.key === "ArrowUp" || e.key === "Up" ||
                    e.key === "ArrowDown" || e.key === "Down"
                ){
                    self.increment_X_VALUE = 0;
                    self.increment_Y_VALUE= 0;
                }
            },
            false // dipsatch event in the bubbling phase not in the capturing phase
        )
        /* KEY MOVEMENT */
    }
    clear(){
        this.canvasRenderingContext2D.clearRect(
            0, 0,
            this.canvas.width, this.canvas.height
        )
    }
    drawPlayer(){
        this.clear();

        this.canvasRenderingContext2D.beginPath();
        this.canvasRenderingContext2D.drawImage(
            this.image,
            this.POS_X, this.POS_Y,
            this.width, this.height
        );
        
        this.canvasRenderingContext2D.fill();
    }
    checkForCollision(){
        // Right wall
        if(this.POS_X + this.width > this.canvas.width){
            this.POS_X  = this.canvas.width - this.width;
        }

        // Left wall
        if(this.POS_X < 0){
            this.POS_X = 0;
        }
        
        // Up wall
        if(this.POS_Y < 0){
            this.POS_Y = 0;
        }

        // Bottom wall
        if(this.POS_Y + this.height > this.canvas.height){
            this.POS_Y = this.canvas.width - this.height;
        }
    }
    newPos(){
        this.POS_X += this.increment_X_VALUE;
        this.POS_Y += this.increment_Y_VALUE;
        
        this.checkForCollision();
    }
    update(){
        this.drawPlayer();
        this.newPos();

        window.requestAnimationFrame(this.update.bind(this));
    }

    // Key movement
    moveRight(){
        this.increment_X_VALUE = this.speed;
    }
    moveLeft(){
        this.increment_X_VALUE = -this.speed;
    }
    moveUp(){
        this.increment_Y_VALUE = -this.speed;
    }
    moveDown(){
        this.increment_Y_VALUE += this.speed;
    }
}

let image = document.getElementById("source");
let player = new Player(
    50, 50,
    50, 70,
    10, 
    image, 
    canvas, ctx
);

window.requestAnimationFrame(player.update.bind(player));
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */