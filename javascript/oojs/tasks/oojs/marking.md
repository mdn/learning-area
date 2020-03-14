# Object-oriented JavaScript marking guide

The aim of the tasks is to demonstrate an understanding of the JavaScript features covered in the [Object-oriented JavaScript for beginners](https://wiki.developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS), [Object prototypes](https://wiki.developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes), and [Inheritance in JavaScript](https://wiki.developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance) lessons in Learn Web Development on MDN.

Note: If there is an error in your code, it will be outputted into the results panel on the page, to help you try to figure out the answer (or into the browser's JavaScript console, in the case of the downloadable version).

## Task 1

In this task we provide you with a constructor. We want you to:

* Add a new method to the `Shape` class's prototype, `calcPerimeter()`, which calculates its perimeter and logs the result to the console.
* Create a new instance of the `Shape` class called `square`. Give it a `name` of `square` and a `sideLength` of `5`.
* Call your `calcPerimeter()` method on the instance, to see whether it logs the calculation result to the browser DevTools' console as expected.
* Create a new instance of `Shape` called `triangle`, with a `name` of `triangle` and a `sideLength` of `3`. Do it using the `square` instance `constructor()`, rather than using the `Shape()` constructor.
* Call `triangle.calcPerimeter()` to check that it works OK.

Your code should look something like this:

```
function Shape(name, sides, sideLength) {
  this.name = name;
  this.sides = sides;
  this.sideLength = sideLength;
}

Shape.prototype.calcPerimeter = function() {
  console.log(`The ${ this.name }'s perimeter length is ${ this.sides * this.sideLength }.`);
}

let square = new Shape('square', 4, 5);

square.calcPerimeter();

let triangle = new Shape('triangle', 3, 3);

triangle.calcPerimeter();
```

## Task 2

Next up we want you to take the `Shape` class you saw in Task #1 (plus the `calcPerimeter()` method) and recreate it using ES class syntax instead. 

Test that it works by creating the `square` and `triangle` object instances as before (using `new Shape()`), and then calling their `calcPerimeter()` methods.

Your code should look something like this:

```
class Shape {
  constructor(name, sides, sideLength) {
    this.name = name;
    this.sides = sides;
    this.sideLength = sideLength;
  }

  calcPerimeter() {
    console.log(`The ${ this.name }'s perimeter length is ${ this.sides * this.sideLength }.`);
  };
}

let square = new Shape('square', 4, 5);
let triangle = new Shape('triangle', 3, 3);

square.calcPerimeter();
triangle.calcPerimeter();
```

## Task 3

Finally, we'd like you to start with the `Shape` class you created in the last task.

We'd like you to create a `Square` class that inherits from `Shape`, and adds a `calcArea()` method that calculates the square's area.

Create a instance of the `Square` called square with appropriate property values, and call its `calcPerimeter()` and `calcArea()` methods to show that it works ok.

Your code should look something like this:

```
class Shape {
  constructor(name, sides, sideLength) {
    this.name = name;
    this.sides = sides;
    this.sideLength = sideLength;
  }

  calcPerimeter() {
    console.log(`The ${ this.name }'s perimeter length is ${ this.sides * this.sideLength }.`);
  };
}

class Square extends Shape {
  constructor(sideLength) { 
    super('square', 4, sideLength); 
  }
  
  calcArea() {
    console.log(`The ${ this.name }'s area is ${ this.sideLength * this.sideLength } squared.`);
  };
}

let square = new Square(4);


square.calcPerimeter();
square.calcArea();
```

