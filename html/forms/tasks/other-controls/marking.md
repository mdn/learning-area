# Other controls marking guide

The aim of the tasks is to demonstrate an understanding of the features covered in the [Other form controls](https://developer.mozilla.org/en-US/docs/Learn/Forms/Other_form_controls) lesson in Learn Web Development on MDN.

## Task 1

In our first "other controls" assessment, we'll get you to create a multi-line text input.

1. Create a basic multi-line text input. You should use a `<textarea>` element for this.
2. Associate it semantically with the provided "Comment" label. Use the same value that the `for` attribute already has, for the `id` of the `<textarea>`.
3. Give the input 35 columns, and 10 rows of space in which to add comments. The `cols` and `rows` attributes are what you need here.
4. Give the comments a maximum length of 100 characters. This requires use of the `maxlength` attribute.

The finished markup should look something like this:

```
<form>
  <h2>Enter your comment</h2>
  <ul>
    <li>
      <label for="name">Name:</label>
      <input type="text" name="name" id="name">
    </li>
    <li>
      <label for="comment">Comment:</label>
      <textarea id="comment" name="comment"
                cols="35" rows="10"
                maxlength="100">Enter comment here</textarea>
    </li>
    <li>
      <button>Submit comment</button>
    </li>
  </ul>
</form>
```


## Task 2

Now it's time to have a go at implementing a drop-down select menu, to allow a user to pick their favourite food from the choices provided.

1. Create your basic select box structure. You should use a `<select>` element for this, inside which you should nest an `<option>` element for each choice.
2. Associate it semantically with the provided "Comment" label. Use the same value that the `for` attribute already has, for the `id` of the `<select>`.
3. Inside the list, split the choices up into 2 subgroups — "mains" and "snacks". To do this, you should use `<optgroup>` elements inside the main `<select>`, with appropriate `label` attributes.

The finished markup should look something like this:

```
<form>
  <ul>
    <li>
      <label for="food">Pick your favorite food:</label>
      <select name="food" id="food">
        <optgroup label="mains">
          <option>Salad</option>
          <option>Curry</option>
          <option>Pizza</option>
          <option>Fajitas</option>
        </optgroup>
        <optgroup label="snacks">
          <option>Biscuits</option>
          <option>Crisps</option>
          <option>Fruit</option>
          <option>Breadsticks</option>
        </optgroup>
      </select>
    </li>
    <li>
      <button>Submit choice</button>
    </li>
  </ul>
</form>
```

## Task 3

In our final task of this set, we start with much the same list of food choices. However, this time we want to do things differently:

1. Create a basic text input that is semantically associated with the provided label. This is done as you'd expect — use a simple `<input type="text">` with an `id` that matches the label's `for` value.
2. Put the food choices into a list that can be associated with a form input. For this, you need to wrap each option in an `<option>` element, and wrap the whole series of them in a `<datalist>` element.
3. Associate the list with your text input, so that when you type characters, any of the list options that match the character sequence are given in a dropdown list as autocomplete suggestions. To do this, you need to give the `<datalist>` an `id`, and then given the `<input>` a `list` attribute whose value matches the `<datalist>`'s `id`.

The finished markup should look something like this:

```
<form>
  <ul>
    <li>
      <label for="food">Enter your favorite food:</label>
      <input type="text" name="food" id="food" list="food-suggest">
      <datalist id="food-suggest">
          <option>Salad</option>
          <option>Curry</option>
          <option>Pizza</option>
          <option>Fajitas</option>
          <option>Biscuits</option>
          <option>Crisps</option>
          <option>Fruit</option>
          <option>Breadsticks</option>
      </datalist>
    </li>
    <li>
      <button>Submit choice</button>
    </li>
  </ul>
</form>
```
