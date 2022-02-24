const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight-85;
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,width,height);

const colorPicker = document.querySelector('input[type="color"]');
const sizePicker = document.querySelector('input[type="range"]');
const output = document.querySelector('.output');
const clearBtn = document.querySelector('button');

// covert degrees to radians
function degToRad(degrees) {
  return degrees * Math.PI / 180;
};

// update sizepicker output value

sizePicker.oninput = function() {
  output.textContent = sizePicker.value;
}

// store mouse pointer coordinates, and whether the button is pressed
let curX;
let curY;
let pressed = false;

// update mouse pointer coordinates
document.onmousemove = function(e) {
  curX = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
  curY = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
}

canvas.onmousedown = function() {
  pressed = true;
};

canvas.onmouseup = function() {
  pressed = false;
}

clearBtn.onclick = function() {
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0,0,width,height);
}

function draw() {
  if(pressed) {
    ctx.fillStyle = colorPicker.value;
    ctx.beginPath();
    ctx.arc(curX, curY-85, sizePicker.value, degToRad(0), degToRad(360), false);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();
