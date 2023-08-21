const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,width,height);

const image = new Image();
image.src = 'firefox.png';
image.addEventListener('load', () => ctx.drawImage(image, 20, 20, 185, 175, 50, 50, 185, 175));
