# Advanced form styling marking guide

The aim of the tasks is to demonstrate an understanding of the features covered in the [Advanced form styling](https://wiki.developer.mozilla.org/en-US/docs/Learn/Forms/Advanced_form_styling) and [UI pseudo-classes](https://wiki.developer.mozilla.org/en-US/docs/Learn/Forms/UI_pseudo-classes) lessons in Learn Web Development on MDN.

## Task 1

In our first advanced styling tasks, we want you to handle making a search input as consistent as possible across browsers — a trickier task than with standard text inputs, even on modern browsers.

We've already provided you with a basic reset to build upon. 

1. First of all, try giving the search box a consistent width, height, padding, and border color across browsers. This is pretty self-explanatory; `line-height` tends to work better than `height` for keeping a consistent height in which the input text is vertically-centered. 
2. You'll find that some browsers will not behave in terms of the form element's height. This is due to native OS styling being used in some cases. How can you remove this native styling? The answer here is `-webkit-appearance: none;`.
3. Once you've removed the native styling, you'll need to add back one of the features it was providing, to keep same look and feel we originally had. How do you do this? Answer: rounded corners! We need `border-radius`.
4. One thing that is inconsistent across browsers (particularly looking at Safari here) is the position of the standard blue focus outline. How can you remove this? Answer: `outline: none;`
5. There is a major problem with just getting rid of the blue focus outline. What is it? Can you add some kind of styling back in so that users can tell when the search box is being hovered or focused? Answer: Use some kind of styling applied to the input using the `:hover` and `:focus` pseudo-classes.
6. Another thing that commonly denotes a search box is a magnifying glass icon. We've made one available in the same directory as `search-24px.png`, plus a `<div>` element after the search input to help you attach it, should you need it. Can you figure out a sensible way to attach it, and can you use some CSS to get it to sit to the right of the search box, and be lined up vertically as well? Answer: There are many ways to do this, but the easiest is probably to make it a background image of the `<div>`, and then use flexbox to line it up.


The finished CSS could look something like this:

```
body {
  background-color: #fff;
  color: #333;
  font: 1em / 1.4 Helvetica Neue, Helvetica, Arial, sans-serif;
  padding: 1em;
  margin: 0;
}

* {
  box-sizing: border-box;
}

button,
input,
select {
  font-family: inherit;
  font-size: 100%;
  padding: 0; margin: 0;
}

input[type="search"] {
  line-height: 1.5rem;
  padding: 5px;
  border: 2px solid #ccc;
  width: 200px;

  -webkit-appearance: none;
  border-radius: 6px;

  outline: none;
}

input[type="search"]:hover, input[type="search"]:focus {
  border: 2px solid red;
  box-shadow: 1px 1px 1px gray;
}

div {
  width: 36px;
  height: 24px;
  background: url(search-24px.png) no-repeat center;
  background-size: 18px;
}

form {
  display: flex;
  align-items: center;
}
```

## Task 2

In our next task we provide you with a set of three radio buttons. We want you to give them custom styling.

We've already provided you with a basic reset to build upon. 

1. First of all, get rid of their default styling. Again, `-webkit-appearance: none;` is what you need here.
2. Next, give the radio buttons a reasonable base style — the style they have when the page first loads. This can be anything you like, but you probably want to set a width and height (of somewhere between about 18 and 24 pixels), and a subtle border and/or background color.
3. Now give the radio buttons a different style for when they are selected. You'll need to use the `:checked` pseudo-class for selecting when the radio button is selected. If you want to do something a bit more fancy, you can also use a combination of `:checked` and `::before` or `::after` to use some generated content to provide a central glyph, or image. You'd need to use absolute positioning on the generated content and relative positioning on the radio button to help line things up. Bear in mind that using an actual text character is a pain to align, so using a background image would be more successful.
4. Align the radio buttons nicely with the labels. A simple bit of flexbox would work nicely here as well.


The finished CSS could look something like this:

```
body {
  background-color: #fff;
  color: #333;
  font: 1em / 1.4 Helvetica Neue, Helvetica, Arial, sans-serif;
  padding: 1em;
  margin: 0;
}

* {
  box-sizing: border-box;
}

button,
input,
select {
  font-family: inherit;
  font-size: 100%;
  padding: 0; margin: 0;
}

input[type="radio"] {
  -webkit-appearance: none;

  height: 24px;
  width: 24px;
  border: 2px solid #ccc;
}

input[type="radio"]:checked {
  border: 2px solid red;
  position: relative;
}

input[type="radio"]:checked::before {
  content: '';
  background-color: red;
  width: 12px;
  height: 12px;
  position: absolute;
  top: 4px;
  left: 4px;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

label {
  width: 150px;
  margin-right: 10px;
}
```

## Task 3

In our final task for this assessment series, we provide you with a feedback form that is already nicely-styled — you've already seen something similar if you've worked through our UI pseudo-classes article, and now we want you to come up with your own solution.

What we'd like you to do is make use of some advanced pseudo-classes to provide some useful indicators of validity.

1. First of all, we want you to provide some specific styling to visually indicate which inputs have to be filled in — they cannot be left empty. The basis of doing this is use of the `:required` pseudo-class. Apart from that, you can use whatever styling you like, as long as it reasonably indicates what inputs are required. In our case, we've used `:required` plus an adjacent combinator to attach some generated content to the `<span>` that appears after the input, but the provided solution doesn't have to be this complex.
2. Second, we want you to provide a useful visual indicator of whether the data entered inside each input is valid or not. This requires use of the `:valid` and `:invalid` pseudo-classes. Again, any reasonable solution is OK here, and attaching something to the trailing `<span>` in each case remains an option.



The finished CSS could look something like this:

```
body {
  background-color: #fff;
  color: #333;
  font: 1em / 1.4 Helvetica Neue, Helvetica, Arial, sans-serif;
  padding: 1em;
  margin: 0;
}

* {
  box-sizing: border-box;
}

button,
input,
select {
  font-family: inherit;
  font-size: 100%;
  padding: 0; margin: 0;
}

fieldset {
  padding: 10px 30px 0;
  width: 400px;
}

legend {
  color: white;
  background: black;
  padding: 5px 10px;
}

fieldset > div {
  margin-bottom: 20px;
  display: flex;
  flex-flow: row wrap;
}

button, label, input {
  display: block;
  font-family: inherit;
  font-size: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  height: 30px;
}

input {
  box-shadow: inset 1px 1px 3px #ccc;
  border-radius: 5px;
}

input:hover, input:focus {
  background-color: #eee;
}

button {
  width: 60%;
  margin: 0 auto;
}

input + span {
  position: relative;
}

input:required + span::after {
  font-size: 0.7rem;
  position: absolute;
  content: "required";
  color: white;
  background-color: black;
  padding: 5px 10px;
  top: -26px;
  left: -70px;
}

input + span::before {
  position: absolute;
  right: -20px;
  top: 5px;
}

input:invalid {
  border: 2px solid red;
}

input:invalid + span::before {
  content: '✖';
  color: red;
}

input:valid + span::before {
  content: '✓';
  color: green;
}
```