# WAI-ARIA marking guide

The aim of these tasks is to demonstrate an understanding of the techniques covered in the [WAI-ARIA Basics](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics) lesson in Learn Web Development on MDN.

## Task 1

In our first ARIA task, we present you with a section of non-semantic markup, which is obviously meant to be a list. Assuming you are not able to change the elements used, how can you allow screenreader users to recognize this as a list? 

The `list` and `listitem` roles are what you need here. The updated markup would look like so:

```
<div role="list">
  <div role="listitem">Pig</div>
  <div role="listitem">Gazelle</div>
  <div role="listitem">Llama</div>
  <div role="listitem">Majestic moose</div>
  <div role="listitem">Hedgehog</div>
</div>
```

## Task 2

In our second WAI-ARIA task, we present a simple search form, and we want you to add in a couple of WAI-ARIA features to improve its accessibility:

1. How can you allow the search form to be called out as a separate landmark on the page by screenreaders, to make it easily findable?
2. How can you give the search input a suitable label, without explicitly adding a visible text label to the DOM?

Answers:

1. Give the `<form>` element a `role="search"`. Most screenreaders will explicitly call this out as a search form, and/or include it as a separate landmark in the page's landmarks list.
2. Include label text inside an `aria-label=""` attribute on the `<input>` element. This way it won't be visible on the page, but it will be read out by screenreaders.

The finished HTML should look something like this:

```
<form role="search">
  <input type="search" name="search"
    aria-label="Search for your favorite content on our site">
</form>
```

## Task 3
For this final WAI-ARIA task, we return to an example we previously saw in the [CSS and JavaScript skilltest](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/CSS_and_JavaScript/Test_your_skills:_CSS_and_JavaScript_accessibility). As before, we have a simple app that presents a list of animal names. Clicking one of the animal names causes a further description of that animal to appear in a box below the list. Here, we are starting with a mouse- and keyboard-accessible version.  

The problem we have now is that when the DOM changes to show a new description, screenreaders cannot see what has changed. Can you update it so that description changes are announced by the screenreader?

There are two ways to solve this:

* Add an `aria-live=""` attribute to the animal-description `<div>` to turn it into a live region, so when its content changes, the updated content will be read out by a screenreader. The best value is probably `assertive`, which makes the screenreader read out the updated content as soon as it changed. `polite` means that the screenreader will wait until other descriptions have finished before it starts reading out the changed content.
* Add a `role="alert"` attribute to the animal-description `<div>`, to make it have alert box semantics. This has the same effect on the screenreader as setting `aria-live="assertive"` on it.


