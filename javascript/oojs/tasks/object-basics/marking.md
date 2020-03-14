# JavaScript object basics marking guide

The aim of the tasks is to demonstrate an understanding of the JavaScript features covered in the [JavaScript object basics](https://wiki.developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics) lesson in Learn Web Development on MDN.

Note: If there is an error in your code, it will be outputted into the results panel on the page, to help you try to figure out the answer (or into the browser's JavaScript console, in the case of the downloadable version).

## Task 1

In this task you are provided with an object literal, and your tasks are to

* Store the value of the `name` property inside `catName`, using bracket notation.
* Run the `greeting()` method using dot notation (it will log the greeting to the browser DevTools' console).
* Update the `color` property value to `black`.
    
The finished code should look something like this:

```
let cat = {
  name : 'Bertie',
  breed : 'Cymric',
  color : 'white',
  greeting: function() {
    console.log('Meow!');
  } 
}

let catName = cat['name'];
cat.greeting();
cat.color = 'black';
```

## Task 2

In our next task, we want you to have a go at creating your own object literal to represent one of your favourite bands. The required members are:

* `name`: A string representing the band name.
* `nationality`: A string representing the country the band comes from.
* `genre`: What type of music the band plays.
* `members`: A number representing the number of members the band has.
* `formed`: A number representing the year the band formed.
* `split`: A number representing the year the band split up, or `false` if they are still together.
* `albums`: An array representing the albums released by the band. Each array item should be an object containing the following members:
  * `name`: A string representing the name of the album.
  * `released`: A number representing the year the album was released.

Include at least two albums in the `albums` array.   

Once you've done this, you should then write a string to the variable `bandInfo`, which will contain a small biography detailing their name, nationality, years active, and style, and the title and release date of their first album.

The finished code should look something like this:

```
let bandInfo;

let band = {
  name : 'Black Sabbath',
  nationality : 'British',
  genre : 'heavy metal',
  members : 4,
  formed : 1968,
  split : 2017,
  albums : [
    {
       name : 'Black Sabbath',
       released : 1970
    },
    {
       name : 'Paranoid',
       released : 1970
    },
    {
       name : 'Master of Reality',
       released : 1971
    },
    {
       name : 'Vol. 4',
       released : 1972
    }
  ]
}

bandInfo = `The ${ band.nationality } ${ band.genre } band ${ band.name } were active ${ band.formed }–${ band.split }. Their first album, ${ band.albums[0].name }, was released in ${ band.albums[0].released }.`;
```

## Task 3

Finally in our object basics assessment, we want you to return to the `cat` object literal from Task #1. We want you to rewrite the `greeting()` method so that it logs "Hello, said Bertie the Cymric." to the browser DevTools' console, but in a way that will work across _any_ cat object of the same structure, regardless of its name or breed.

When you are done, write your own object called `cat2`, which has the same structure, exactly the same `greeting()` method, but a different `name`, `breed`, and `color`.

Call both `greeting()` methods to check that they log appropriate greetings to the console.

"How would you make the code more DRY?": By creating a `cat` class in which to define the properties and method so they are only defined once, and then creating instances of that class. 

The code should look like this:

```
let cat = {
  name : 'Bertie',
  breed : 'Cymric',
  color : 'white',
  greeting: function() {
    console.log(`Hello, said ${ this.name } the ${ this.breed }.`);
  } 
}

let cat2 = {
  name : 'Elfie',
  breed : 'Aphrodite Giant',
  color : 'ginger',
  greeting: function() {
    console.log(`Hello, said ${ this.name } the ${ this.breed }.`);
  } 
}

cat.greeting();
cat2.greeting();
```