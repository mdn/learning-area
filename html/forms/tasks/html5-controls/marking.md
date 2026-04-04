# HTML5 controls marking guide

The aim of the tasks is to demonstrate an understanding of the features covered in the [The HTML5 input types](https://wiki.developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types) lesson in Learn Web Development on MDN.

## Task 1

First let's explore some of the new HTML5 input types.

Create appropriate inputs for a user to update their details for:

1. Email
2. Website
3. Phone number
4. Favourite color

The appropriate input types to use here are `email`, `url`, `tel`, and `color`.

The finished markup should look something like this:

```html
<form>
  <h2>Edit your preferences</h2>
  <ul>
    <li>
      <label for="e-mail">Email</label>
      <input type="email" id="e-mail" name="e-mail" />
    </li>
    <li>
      <label for="website">Website</label>
      <input type="url" id="website" name="website" />
    </li>
    <li>
      <label for="phone">Phone number</label>
      <input type="tel" id="phone" name="phone" />
    </li>
    <li>
      <label for="fave-color">Favorite color</label>
      <input type="color" id="fave-color" name="fave-color" />
    </li>
    <li>
      <button>Update preferences</button>
    </li>
  </ul>
</form>
```

## Task 2

Next, we want you to implement a slider control to allow the user to choose a maximum number of people to invite to their party.

1. Implement a basic slider control to go along with the provided label. This requires `<input type="range">`.
2. Give it a minimum value of 1, maximum value of 30, and initial value of 10. To do this, you should use the `min`, `max`, and `value` attributes.
3. Create a corresponding output element to put the current value of the slider into. Give it a class of `invite-output`, and semantically associate it with the input. If you do this correctly, the JavaScript included on the page will automatically update the output value when the slider is moved. To achieve this, you need to use an `<output>` element, give it a `class` attribute with value `invite-output`, and give it a `for` attribute with value `max-invite`.

The finished markup should look something like this:

```html
<form>
  <ul>
    <li>
      <label for="max-invite">Select maximum number of invitations</label>
      <input
        type="range"
        id="max-invite"
        name="max-invite"
        min="1"
        max="30"
        value="10"
      />
      <output class="invite-output" for="max-invite"></output>
    </li>
    <li>
      <button>Submit</button>
    </li>
  </ul>
</form>
```
