# JavaScript conditionals marking guide

The aim of the tasks is to demonstrate an understanding of the JavaScript features covered in the [Making decisions in your code — conditionals](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals) lesson in Learn Web Development on MDN.

Note: If there is an error in your code, it will be outputted into the results panel on the page, to help you try to figure out the answer (or into the browser's JavaScript console, in the case of the downloadable version).

## Task 1

In this task you are supposed to create your own basic `if ... else` statement that tests whether the season is summer or not, and stores an appropriate response in the `response` variable, which is then printed out in the results panel. The `else` clause should print some kind of generic response.

To finish off, you need to add an `else if` clause to also check whether it is winter, and if so, put an appropriate response inside `response`.

The finished code should look something like this:

```
let season = 'summer';
let response;

if (season === 'summer') {
  response = 'It\'s probably nice and warm where you are; enjoy the sun!';
} else if(season === 'winter') {
  response = 'I hope you are not too cold. Put some warm clothes on!';
} else {
  response = 'I don\'t know what the season is where you are. Hope you are well.';
}
```

## Task 2

Task 2 tests some more complex conditionals, like not equal, less than, greater than, etc., along with a nested structure.

You are given two variables containing an indicator of the answer machine being switched on or not (`true`/`false`), and a score. You are also given an uninitialized `response` variable.

You need to create one `if ... else` structure that checks whether the machine is switched on and puts a message into the `response` variable if it isn't, telling the user to switch the machine on.

Inside the `if` part, you need to nest an `if ... else if` structure that puts appropriate messages into the `response` variable depending on different scores. The conditional operator tests should look like this:

- `score < 0 || score > 100` - "This is not possible, an error has occurred." This could also be done just by an `else` clause, as the scores between 0 and 100 are all covered by the other clauses. But it's nice to be exact.
- `score >= 0 && score < 20` - "That was a terrible score — total fail!"
- `score >= 20 && score < 40` - "You know some things, but it\'s a pretty bad score. Needs improvement."
- `score >= 40 && score < 70` — "You did a passable job, not bad!"
- `score >= 70 && score < 90` — "That\'s a great score, you really know your stuff."
- `score >= 90 && score <= 100` — "What an amazing score! Did you cheat? Are you for real?"

The finished code should look something like this:

```
let response;
let score = 75;
let machineActive = false;

if (machineActive) {
  if (score < 0 || score > 100) {
    response = 'This is not possible, an error has occurred.';
  } else if(score >= 0 && score < 20) {
    response = 'That was a terrible score — total fail!';
  } else if(score >= 20 && score < 40) {
    response = 'You know some things, but it\'s a pretty bad score. Needs improvement.';
  } else if(score >= 40 && score < 70) {
    response = 'You did a passable job, not bad!';
  } else if(score >= 70 && score < 90) {
    response = 'That\'s a great score, you really know your stuff.';
  } else if(score >= 90 && score <= 100) {
    response = 'What an amazing score! Did you cheat? Are you for real?';
  }
} else {
  response = 'The machine is turned off. Turn it on to process your score.';
}
```

## Task 3

For the final task we have to offer in this set, we need you to first write an `if ... else` statement that checks whether `machineActive` is `true`. If so, set `machineResult` to a string telling the user they can successfully log in. If not, set it to a message telling them they need to activate the machine before they can log in.

Inside the `if` part of the structure, you need to write a ternary operator that checks whether `pwd` is equal to `cheese`. If so, it assigns a string saying that the login was successful; if not assign a string saying the log in failed. The result should be assigned to a variable called `pwdResult`.

Your solution should look something like this:

```
let machineActive = true;
let pwd = 'cheese';

let machineResult;
let pwdResult;

if (machineActive) {
  machineResult = 'Machine is active. Trying login.'
  pwdResult = pwd === 'cheese' ? 'Login successful.' : 'Password incorrect; login failed.'
} else {
  machineResult = 'Machine is inactive. Activate and try logging in again.';
}
```
