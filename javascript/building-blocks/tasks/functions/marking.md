# JavaScript functions marking guide

The aim of the tasks is to demonstrate an understanding of the JavaScript features covered in the [Functions — reusable blocks of code](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals), [Build your own function](https://wiki.developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Build_your_own_function), and [https://wiki.developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Return_values](https://wiki.developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Return_values) lessons in Learn Web Development on MDN.

Note: If there is an error in your code, it will be outputted into the results panel on the page, to help you try to figure out the answer (or into the browser's JavaScript console, in the case of the downloadable version).

## Task 1

In the first task, you have to create a simple function that prints a random name from the provided array to the provided paragraph, and then run it once.

The finished code should look something like this:

```
const names = ['Chris', 'Li Kang', 'Anne', 'Francesca', 'Mustafa', 'Tina', 'Bert', 'Jada']
const para = document.querySelector('p');

function chooseName() {
  const randomNumber = Math.floor(Math.random() * names.length);
  const choice = names[randomNumber];
  para.textContent = choice;
}

chooseName();
```


## Task 2

For our second functions-related task, you need to create a function that draws a rectangle on the provided `<canvas>`, based on five input variables — `x`, `y`, `width`, `height`, and `color`.

You'll want to clear the canvas before drawing, so that when the code is updated in the case of the live version, you don't get lots of rectangles drawn on top of one another.

The finished code should look something like this:

```
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const x = 50;
const y = 60;
const width = 100;
const height = 75;
const color = 'blue';

function drawSquare(x, y, width, height, color) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

drawSquare(x, y, width, height, color);
```

## Task 3

In this task, you return to the problem posed in Task 1, with the aim of improving it. The three improvements we are expecting here are:

1. Refactor the code that generates the random number into a separate function that takes two generic bounds that the random number should be between, and returns the result.
2. Update the `chooseName()` function so that it makes use of the random number function, takes the array to choose from as a parameter (making it more flexible), and returns its result.
3. Print this returned result into the paragraph.   

```
const names = ['Chris', 'Li Kang', 'Anne', 'Francesca', 'Mustafa', 'Tina', 'Bert', 'Jada']
const para = document.querySelector('p');

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function chooseItem(array) {
  const choice = array[random(0, array.length)];
  return choice;
}

para.textContent = chooseItem(names);
```

## Task 4

In this task, you are asked to change the named `isShort()` function into an arrow function expression.

The finished code should look something like this:

```
const names = ['Chris', 'Li Kang', 'Anne', 'Francesca', 'Mustafa', 'Tina', 'Bert', 'Jada']
const para = document.createElement('p');

const shortNames = names.filter(name => name.length < 5);
para.textContent = shortNames;
```
