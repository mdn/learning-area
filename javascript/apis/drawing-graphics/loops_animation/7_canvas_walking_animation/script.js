const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,width,height);

ctx.translate(width/2,height/2);

const image = new Image();
image.src = 'walk-right.png';
image.onload = draw;

let sprite = 0;
let posX = 0;

function draw() {
  ctx.fillRect(-(width/2),-(height/2),width,height);
  ctx.drawImage(image, (sprite*102), 0, 102, 148, 0+posX, -74, 102, 148);

  if (posX % 13 === 0) {
    if (sprite === 5) {
      sprite = 0;
    } else {
      sprite++;
    }
  }

  if (posX > width/2) {
    let newStartPos = -((width/2) + 102);
    posX = Math.ceil(newStartPos);
    console.log(posX);
  } else {
    posX += 2;
  }

  window.requestAnimationFrame(draw);
};
