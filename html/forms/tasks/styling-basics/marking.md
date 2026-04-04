# Styling basics marking guide

The aim of the tasks is to demonstrate an understanding of the features covered in the [Styling web forms](https://developer.mozilla.org/en-US/docs/Learn/Forms/Styling_web_forms) lesson in Learn Web Development on MDN.

## Task 1

Our basic form styling assessment is fairly free-form, and you have a lot of flexibility over what you end up doing here. But your CSS should aim to fulfill the following requirements:

1. Add some kind of lightweight "reset" to make fonts, padding, margin, and sizing more consistent to begin with.
2. On top of that, add in some nice, consistent styling for the inputs and button.
3. Use some kind of layout technique to make the inputs and labels line up neatly. Flexbox or Grid would be ideal for this, or CSS tables if you prefer something a bit more compatible with old browsers.

The finished CSS could look something like this:

```css
* {
  box-sizing: border-box;
}

body {
  background-color: #fff;
  color: #333;
  font: 1em / 1.4 Helvetica Neue, Helvetica, Arial, sans-serif;
  padding: 1em;
  margin: 0;
  width: 400px;
}

button,
input,
select {
  font-family: inherit;
  font-size: 100%;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

li:last-of-type {
  margin-top: 30px;
}

label {
  flex: 0 40%;
  text-align: right;
  padding-right: 10px;
}

input,
select {
  flex: auto;
  height: 2em;
}

input,
select,
button {
  display: block;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

select {
  padding: 5px;
}

button {
  margin: 0 auto;
  padding: 5px 20px;
  line-height: 1.5;
  background: #eee;
}

button:hover,
button:focus {
  background: #ddd;
}
```
