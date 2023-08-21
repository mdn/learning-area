
# Marking guide for "Sequencing animations"

The following guide outlines a marking guide for the MDN Learning Area JavaScript Topic — [Sequencing animations](https://developer.mozilla.org/en-US/Learn/JavaScript/Asynchronous/Sequencing_animations). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clear cut.

The overall mark awarded is out of 9.

The assessment asks for the animation sequence to be implemented in three different forms:

1. "Promise hell": something that works, but has the promise version of the "callback hell" problem.

2. "Promise chain": implemented as a promise chain. There are a few different ways to write this, because of the different forms an arrow function can take. We ask which is the most concise form.

3. "async/await": implemented using async and await.

## Promise hell

Three marks for this. The code should look something like:

```js
alice1.animate(aliceTumbling, aliceTiming).finished
  .then(() => {
    const alice2Animation = alice2.animate(aliceTumbling, aliceTiming).finished;
    alice2Animation.then(() => {
      alice3.animate(aliceTumbling, aliceTiming);
    });
  });
```

The main thing here is that we nest calls to `then()`, making the code much harder to read.

## Promise chain

Three marks for this. The code should look something like:

```js
alice1.animate(aliceTumbling, aliceTiming).finished
  .then(() => alice2.animate(aliceTumbling, aliceTiming).finished)
  .then(() => alice3.animate(aliceTumbling, aliceTiming).finished)
  .catch(error => console.error(`Error animating Alices: ${error}`));
```

This is the most concise version. It would be fine to have some different ways of writing the arrow functions, such as:

```js
alice1.animate(aliceTumbling, aliceTiming).finished
  .then(() => { return alice2.animate(aliceTumbling, aliceTiming).finished; })
  .then(() => { return alice3.animate(aliceTumbling, aliceTiming).finished; })
  .catch(error => console.error(`Error animating Alices: ${error}`));
```

## async/await

Three marks for this. The code should look something like:

```js
async function animateAlices() {
  try {
    await alice1.animate(aliceTumbling, aliceTiming).finished;
    await alice2.animate(aliceTumbling, aliceTiming).finished;
    await alice3.animate(aliceTumbling, aliceTiming).finished;
  }
  catch (error) {
    console.error(`Error animating Alices: ${error}`);
  }
}

animateAlices();
```
