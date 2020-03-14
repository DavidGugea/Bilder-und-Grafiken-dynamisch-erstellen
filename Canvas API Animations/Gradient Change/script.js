let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();

window.addEventListener(
    "resize",
    resize,
    false // dispatch event in the bubbling phase not in the capturing phase
)

let rgb0 = 0;
let rgb1 = 0;
let rgb2 = 0;

function animateGradient(){
    let gradient = context.createLinearGradient(
        0, 0, canvas.width, canvas.height
    );

    gradient.addColorStop(0, `rgb(${rgb0}, 0, 0)`);
    gradient.addColorStop(0.5, `rgb(0, ${rgb1}, 0)`);
    gradient.addColorStop(1, `rgb(0, 0, ${rgb2})`);

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    rgb0++;
    rgb1++;
    rgb2++;

    window.requestAnimationFrame(animateGradient);
}

window.requestAnimationFrame(animateGradient);