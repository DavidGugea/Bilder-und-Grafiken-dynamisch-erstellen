canvas = document.querySelector("canvas");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

ctx = canvas.getContext("2d");

console.log(ctx.fillStyle);
ctx.save();
console.log(ctx.fillStyle);
ctx.fillRect(canvas.width / 2, canvas.height / 2, 50, 50);

ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.restore();
console.log(ctx.fillStyle);