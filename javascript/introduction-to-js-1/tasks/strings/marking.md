# JavaScript strings marking guide

The aim of the tasks is to demonstrate an understanding of the JavaScript features covered in the [Handling text — strings in JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings) and [Useful string methods](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods) lessons in Learn Web Development on MDN.

Note: If there is an error in your code, it will be outputted into the results panel on the page, to help you try to figure out the answer (or into the browser's JavaScript console, in the case of the downloadable version).

## Task 1

The first task asks you to store a new string in a variable to go along with the existing one, which contains the missing half of the famous quote. Call the new variable you add `quoteEnd`.

You'll also need to escape the apostrophe in the existing string so that it doesn't throw an error.

Finally, you'll need to concatenate the two strings together, and store the result in a variable called `finalQuote`.

The answer should look something like this:

```
const quoteStart = 'Don\'t judge each day by the harvest you reap ';
const quoteEnd = 'but by the seeds that you plant.'

const finalQuote = `${quoteStart}${quoteEnd}`;
```


## Task 2

Next up, task 2 requires the student to:

* Check the length of the provided string using `.length`, and store the result in a variable called `quoteLength`.
* Find the index of the substring 'green eggs and ham' using `.indexOf` and store it in `index`.
* Use a combination of the variables you have, `.length`, and `.slice()`, to trim down the original quote to 'I do not like green eggs and ham.', and store it in `revisedQuote`.

```
const quote = 'I do not like green eggs and ham. I do not like them, Sam-I-Am.';
const substring = 'green eggs and ham';

const quoteLength = quote.length;

const index = quote.indexOf(substring);

const revisedQuote = quote.slice(0, index + substring.length + 1);
```

## Task 3

For our next string task, we return to our Green Eggs and Ham revised quote, which someone has messed up. You need to:

* Fix the casing. The best way to do this is to put it all in lower case using `.toLowerCase()`, and then put the first letter in uppercase using `replace()`, `slice()`, and `toUpperCase()`. Store the new quote in `fixedQuote`.
* Replace `green eggs and ham` with whatever food you really don't like using `replace()`.
* Add a full stop to the end of the sentence using some means.

Your code should look something like this:

```
const quote = 'I dO nOT lIke gREen eGgS anD HAM';

let fixedQuote = quote.toLowerCase();
const firstLetter = fixedQuote.slice(0,1);
fixedQuote = fixedQuote.replace(firstLetter, firstLetter.toUpperCase());

fixedQuote = fixedQuote.replace('green eggs and ham', 'pickled onions');

const finalQuote = `${fixedQuote}.`;
```

## Task 4

Our final string task looks at your ability to use template literals. Your answer is expected to take the existing string literal, `myString`, turn it into a template literal, and include four placeholders in place of the asterisks:

* The `theorem` string.
* The value of `a`.
* The value of `b`.
* The length of the hypotenuse, if `a` and `b` are the lengths of the two shortest sides of a right-angled triangle. You can use pythagoras' theorem to work this out.

Your code should look something like this:

```
const theorem = 'Pythagorean theorem';

const a = 5;
const b = 8;

const myString = `Using ${ theorem }, we can work out that that if the two shortest sides of a right-angled triangle have lengths of ${ a } and ${ b }, the length of the hypotenuse is ${ Math.sqrt((a**2) + (b**2)) }.`;
```

You could use a different form of the fourth placeholder, such as `Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))` or `${ Math.sqrt((a * a) + (b * b)) }`.
