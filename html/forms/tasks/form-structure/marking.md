# Form structure marking guide

The aim of the tasks is to demonstrate an understanding of the features covered in the [How to structure a web form](https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form) lesson in Learn Web Development on MDN.

## Task 1

The only task in this test your skills assessment looks at your knowledge of simple form structure. You are asked to:

1. Separate out the first two and second two form fields into two distinct containers, each with a descriptive legend (use "Personal details" for the first two, and "Comment information" for the second two). This is what the `<fieldset>` and `<legend>` elements are made for.
2. Mark up each text label with an appropriate element so that it is semantically associated with its respective form field. This needs the `<label>` element, and the `for` attribute if you are choosing not to wrap the `<label>` around the `<input>`.
3. Add a suitable set of structural elements around the label/field pairs to separate them out. Ordered/unordered lists would be ideal, but something like `<div>`s would also be acceptable.

The finished markup should look something like this:

```html
<form>
  <fieldset>
    <legend>Personal details</legend>
    <ul>
      <li>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
      </li>
      <li>
        <label for="age">Age:</label>
        <input type="number" id="age" name="age" />
      </li>
    </ul>
  </fieldset>
  <fieldset>
    <legend>Comment information</legend>
    <ul>
      <li>
        <label for="comment">Comment:</label>
        <input type="text" id="comment" name="comment" />
      </li>
      <li>
        <label for="email">Email (include if you want a reply):</label>
        <input type="email" id="email" name="email" />
      </li>
    </ul>
  </fieldset>
</form>
```
