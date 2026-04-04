# JavaScript arrays marking guide

The aim of the tasks is to demonstrate an understanding of the JavaScript features covered in the [Arrays](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays) lesson in Learn Web Development on MDN.

Note: If there is an error in your code, it will be outputted into the results panel on the page, to help you try to figure out the answer (or into the browser's JavaScript console, in the case of the downloadable version).

## Task 1

We'll start off simple; the first thing you need to do here is create an array of three items. Choose whatever items you like — your favourite bands or foods, perhaps? Store in a variable called `myArray`.

Next, modify the first two items in the array to some different items, using simple bracket notation, e.g. `myArray[0] = 'pizza'`.

Last of all, add an item to the start of the array using `.unshift()`.

The answer should look something like this:

```js
let myArray = ["cats", "dogs", "chickens"];

myArray[0] = "horses";
myArray[1] = "pigs";

myArray.unshift("crocodiles");
```

## Task 2

Moving on, the next task provides a string for you to work on.

Here you are expected to start by splitting the string into an array using `.split('+')`. Store the array in `myArray`.

Next, store the length of the array (`myArray.length`) in a variable called `arrayLength`.

Last up, retrieve the last item in the array with `myArray[myArray.length - 1]`; store it in `lastItem`.

The example should look something like this:

```js
let myString = "Ryu+Ken+Chun-Li+Cammy+Guile+Sakura+Sagat+Juri";

let myArray = myString.split("+");

let arrayLength = myArray.length;

let lastItem = myArray[arrayLength - 1];
```

## Task 3

You should start by popping the last item off the array using `myArray.pop()`.

Next, add two new names to the end of the array using `myArray.push()`

For an added challenge, you'll need to use `.forEach()` or some kind of loop (we didn't cover these in the array article, so look them up) to go over each item in the array and add its index number after the name inside parentheses. Note that when using `forEach` you are performing operations on a copy of the array elements, not the array elements themselves, so you can't change them directly — you have to create the new array item and copy it back over.

Finally you need to stitch the array items together into a string using `myArray.join(' - ')`, and store the result in `myString`.

```js
let myArray = [
  "Ryu",
  "Ken",
  "Chun-Li",
  "Cammy",
  "Guile",
  "Sakura",
  "Sagat",
  "Juri",
];

myArray.pop();

myArray.push("Zangief");
myArray.push("Ibuki");

myArray.forEach(function (element, index) {
  let newElement = `${element} (${index})`;
  myArray[index] = newElement;
});

let myString = myArray.join(" - ");
```

## Task 4

You should start by finding the index of `"Eagles"`, using `birds.indexOf()`.

Next, use the index with `birds.splice()` to remove the `"Eagles"` item.

Finally, you can use `birds.filter()` to get an array containing only birds starting with "E".

The function passed to `filter()` can use `bird.startsWith()` to test whether the bird starts with "E".

```js
const eaglesIndex = birds.indexOf("Eagles");
birds.splice(eaglesIndex, 1);

function startsWithE(bird) {
  return bird.startsWith("E");
}
const eBirds = birds.filter(startsWithE);
```
