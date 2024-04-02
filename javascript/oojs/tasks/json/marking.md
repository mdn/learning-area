# JSON marking guide

The aim of the task is to demonstrate an understanding of the JavaScript features covered in the [Working with JSON](https://wiki.developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) lesson in Learn Web Development on MDN.

Note: If there is an error in your code, it will be outputted into the results panel on the page, to help you try to figure out the answer (or into the browser's JavaScript console, in the case of the downloadable version).

## Task 1

The one and only task in this article concerns accessing JSON data and using it in your page. JSON data about some mother cats and their kittens is available in [sample.json](sample.json). The JSON is loaded into the page as a text string and made available in the `catString` parameter of the `displayCatInfo()` function, called when the provided promise chain (which starts by fetching the JSON data) is fulfilled. Your task is to fill in the missing parts of the `displayCatInfo()` function to store:

- The names of the three mother cats, separated by commas, in the `motherInfo` variable.
- The total number of kittens, and how many are male and female, in the `kittenInfo` variable.

The values of these variables are then printed to the screen inside paragraphs.

Some hints/questions:

- The JSON data is provided as text inside the `displayCatInfo()` function. You'll need to parse it into JSON using the `JSON.parse()` method.
- You'll probably want to use an outer loop to loop through the cats and add their names to the `motherInfo` variable string, and an inner loop to loop through all the kittens, add up the total of all/male/female kittens, and add those details to the `kittenInfo` variable string.
- The last mother cat name should have an "and" before it, and a full stop after it. How do you make sure this can work, no matter how many cats are in the JSON?
- Why are the `para1.textContent = motherInfo;` and `para2.textContent = kittenInfo;` lines inside the `displayCatInfo()` function, and. not at the end of the script? This has something to do with async code.

Your code should look something like this:

```js
function displayCatInfo(catString) {
  let total = 0;
  let male = 0;

  // Add your code here
  const cats = JSON.parse(catString);

  for (let i = 0; i < cats.length; i++) {
    for (const kitten of cats[i].kittens) {
      total++;
      if (kitten.gender === "m") {
        male++;
      }
    }

    if (i < cats.length - 1) {
      motherInfo += `${cats[i].name}, `;
    } else {
      motherInfo += `and ${cats[i].name}.`;
    }
  }

  kittenInfo = `There are ${total} kittens in total, ${male} males and ${
    total - male
  } females.`;

  // Don't edit the code below here!

  para1.textContent = motherInfo;
  para2.textContent = kittenInfo;
}
```
