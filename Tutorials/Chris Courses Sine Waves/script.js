const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

c.beginPath();

c.moveTo(0, canvas.height / 2);

for(let i = 0 ; i < canvas.width ; i++){
    c.lineTo(i, canvas.height / 2 + Math.sin(i * 0.01) * 200);
}

c.stroke();