let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

amplitude = 200;
phase = 0.01;



function animate() {
    ctx.beginPath();
    
    // Move to the middle of the page at the start X AXIS
    ctx.moveTo(0, canvas.height / 2);

    for (let angularFrequency = 0; angularFrequency < canvas.width; angularFrequency++) {
        ctx.lineTo(angularFrequency, canvas.height / 2 + Math.sin(angularFrequency * phase) * amplitude)
    }

    ctx.stroke();
    ctx.closePath();

    window.requestAnimationFrame(animate);

    amplitude++;
    phase += 0.01;

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(amplitude == 250){
        amplitude = 200;
    }
    if(phase == 0.1){
        phase = 0.01;
    }
}

window.requestAnimationFrame(animate);