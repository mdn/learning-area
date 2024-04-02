# Basic controls marking guide

The aim of the tasks is to demonstrate an understanding of the features covered in the [Basic native form controls](https://developer.mozilla.org/en-US/docs/Learn/Forms/Basic_native_form_controls) lesson in Learn Web Development on MDN.

## Task 1

This task starts you off nice and gently by asking you to create two input elements, for a user's ID and password, along with a submit button.

1. Create appropriate inputs for user ID and password — you need to use appropriate `<input>` elements, with `type`s of `text` and `password` respectively. They should also have `id`s and `name`s.
2. You should also associate them with their text labels semantically — use `<label>` elements appropriately, with `for` attributes as required.
3. Create a submit button inside the remaining list item, with button text of "Log in". Either `<button>Log in</button>`, or `<input type="submit" value="Log in">` will do.
4. Try submitting your form to see if it submits successfully (there will be no redirect, but you should see the data attached to the page URL).

The finished markup should look something like this:

```html
<form>
  <ul>
    <li>
      <label for="uid">User ID</label>
      <input type="text" id="uid" name="uid" />
    </li>
    <li>
      <label for="pwd">Password</label>
      <input type="password" id="pwd" name="pwd" />
    </li>
    <li>
      <button>Log in</button>
    </li>
  </ul>
</form>
```

## Task 2

The next task requires you to create working sets of checkboxes and radio buttons, from the provided text labels.

1. Turn the first fieldset's contents into a set of radio buttons — you should only be able to select one pony character at once. `<input type="radio">` is the key here. You should use the same `name` attribute value for all the inputs, so that it associates the radio buttons into the same group.
2. Make it so that the first radio button is selected upon page load. This is done by setting the `checked` attribute on the first input.
3. Turn the second fieldset's content into a set of checkboxes. `<input type="checkbox">` is needed here. We've given each input the same `name` attribute value because the items are related.
4. Add a couple more hotdog choices of your own.

Note: It is usually better if you set `value` attributes explicitly on radio buttons and checkboxes, as well as the usually `type`, `id`, and `name`. If you don't, their value defaults to `on` when submitted, which is often not what you want.

The finished markup should look something like this:

```html
<form>
  <fieldset>
    <legend>Who is your favorite pony?</legend>
    <ul>
      <li>
        <label for="pinkie">Pinkie Pie</label>
        <input type="radio" id="pinkie" name="pony" value="pinkie" checked />
      </li>
      <li>
        <label for="rainbow">Rainbow Dash</label>
        <input type="radio" id="rainbow" name="pony" value="rainbow" />
      </li>
      <li>
        <label for="twilight">Twilight Sparkle</label>
        <input type="radio" id="twilight" name="pony" value="twilight" />
      </li>
    </ul>
  </fieldset>
  <fieldset>
    <legend>Hotdog preferences</legend>
    <ul>
      <li>
        <label for="vegan">Vegan</label>
        <input type="checkbox" id="vegan" name="hotdog" value="vegan" />
      </li>
      <li>
        <label for="onions">Onions</label>
        <input type="checkbox" id="onions" name="hotdog" value="onions" />
      </li>
      <li>
        <label for="mustard">Mustard</label>
        <input type="checkbox" id="mustard" name="hotdog" value="mustard" />
      </li>

      <li>
        <label for="ketchup">Ketchup</label>
        <input type="checkbox" id="ketchup" name="hotdog" value="ketchup" />
      </li>
    </ul>
  </fieldset>
  <button>Submit</button>
</form>
```

## Task 3

The final task in this set requires you to create a file picker.

1. Create a basic file picker. Use `<input type="file">`
2. Allow the user to pick multiple files at once. Do this by including the `multiple` attribute.
3. Allow the file picker to accept JPG and PNG images. To do this, you need to include the `accept` attribute, and give it a value of `image/png, image/jpeg`.

The finished markup should look something like this:

```html
<form>
  <ul>
    <li>
      <label for="gallery-img">Choose gallery images to upload</label>
      <input
        type="file"
        id="gallery-img"
        name="gallery-img"
        multiple
        accept="image/png, image/jpeg"
      />
    </li>
  </ul>
  <button>Submit</button>
</form>
```
