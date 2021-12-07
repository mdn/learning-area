# JavaScript events marking guide

The aim of the tasks is to demonstrate an understanding of the JavaScript features covered in the [Introduction to events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events) lesson in Learn Web Development on MDN.

Note: If there is an error in your code, it will be outputted into the results panel on the page, to help you try to figure out the answer (or into the browser's JavaScript console, in the case of the downloadable version).

## Task 1

In our first events-related task, you need to create a simple event handler that causes the text inside the button to change when it is clicked on, and change back when it is clicked again.

The HTML should not be changed; just the JavaScript.

The finished code should look something like this:

```
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  if (btn.className === 'on') {
    btn.textContent = 'Machine is off';
    btn.className = "off";
  } else {
    btn.textContent = 'Machine is on';
    btn.className = "on";
  }
});
```

## Task 2

Now we'll look at keyboard events. To pass this assessment you need to build an event handler that moves the circle around the provided canvas when the WASD keys are pressed on the keyboard. The circle is drawn with the function `drawCircle()`.

The finished code should look something like this:


```
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function drawCircle(x, y, size) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fill();
}

let x = 50;
let y = 50;
const size = 30;

drawCircle(x, y, size);

// Add your code here

window.addEventListener('keydown', e => {
  switch(e.key) {
    case 'a':
      x -= 2;
      break;
    case 'd':
      x += 2;
      break;
    case 'w':
      y -= 2;
      break;
    case 's':
      y += 2;
      break;
  }

  drawCircle(x, y, size);
});
```

## Task 3

Our final events-related task involves making use of bubbling and event objects. You need to set a click listener on the buttons' parent element, which when invoked by clicking any of the buttons will use `e.target` to grab the `data-color` attribute of the particular button that was clicked, and set the background of the `button-bar` to that color.

You should be able to solve this without looping through all the buttons and giving each one their own event listener.

The code should look like this:

```
const buttonBar = document.querySelector('.button-bar');

  // Add your code here

function setColor(e) {
  buttonBar.style.backgroundColor = e.target.getAttribute('data-color');
}

buttonBar.addEventListener('click', setColor);
```
