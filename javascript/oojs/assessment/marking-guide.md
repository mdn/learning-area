# Marking guide for "Adding features to our bouncing balls demo"

The following guide outlines a marking guide for the "Introducing JavaScript Objects" module assessment, part of the MDN Learning Area JavaScript Topic — see [Adding features to our bouncing balls demo](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clear cut.

The overall mark awarded is out of 44. Work out their final mark, and then divide by 44 and multiply by 100 to give a percentage mark. For reference, you can find a [finished program](main.js) that would be awarded top marks.

## Shape class

* **The `Shape` class definition**: One mark for this.
* **The `Shape` constructor**: Three marks for this. You need to copy the original `Ball()` constructor and remove the `color` and `size` definitions.

## Ball class

* **The `Ball` class definition**: Two marks for deriving from `Shape` using `extends`.

* **The `Ball` constructor**: Six marks for this in total:
  * Two marks for using `super(x, y, velX, velY);` to initialize the `Shape` properties.
  * Two marks for initializing `color` and `size` properties, which should be the same as the ones in the original `Ball` constructor.
  * Two marks for initializing `exists` to `true` in the constructor.


## EvilCircle class

* **The `EvilCircle` class definition**: Two marks for deriving from `Shape` using `extends`.

* **The `EvilCircle` constructor**: Six marks for this in total:
  * Two marks for using `super(x, y, velX, velY);` to initialize the `Shape` properties.
  * Two marks for initializing `color` and `size` properties.
  * Two marks for including the `keydown` event listener code.

* **`draw()`**: Three marks for this.

* **`checkBounds()`**: Five marks for this.

* **`collisionDetect()`** Two marks for this.

## Bringing the evil circle into the program

* **Creating an <code>EvilCircle</code> instance**: Two marks for this. You need to create a new instance of the `EvilCircle`. This must be done in a way that it only runs once, not with every loop iteration. The easiest way to do this is to just include the lines outside the loop function definition, before `loop()` is called.

* **Update the `loop()` code so that the ball functions are only called inside the loop if the current ball exists**: Two marks for this.

* **Call the evil ball instance's `draw()`, `checkBounds()`, and `collisionDetect()` methods**: Two marks for this.

## Implementing the score counter

* **Adding a `<p>` element**: One mark.
* **Adding the provided CSS rule to the bottom of the CSS file**: One mark — the CSS rule needs to be copied exactly as shown in to the bottom of the CSS file.
* **JavaScript updates**: Four marks in total. You need to complete the following tasks:
  * Create a variable that stores a reference to the paragraph — something like this is fine.
  * Keep a count of the number of balls on screen in some way.
  * Increment the count and display the updated number of balls present each time a ball is added to the scene.
  * Decrement the count and display the updated number of balls present each time the evil circle eats a ball (causes it not to exist).
