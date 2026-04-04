# CSS and JS accessibility marking guide

The aim of these tasks is to demonstrate an understanding of the techniques covered in the [CSS and JavaScript accessibility best practices](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/CSS_and_JavaScript) lesson in Learn Web Development on MDN.

## Task 1

In the first task you are presented with a list of links. However, their accessibility is pretty bad — there is no way to really tell that they are links, or to tell which one the user is focussed on.

We'd like you to assume that the existing ruleset with the `a` selector is supplied by some CMS, and that you can't change it — instead, you need to create new rules to make the links look and behave like links, and for the user to be able to tell where they are in the list.

The CSS could look something like this:

```css
li a {
  text-decoration: underline;
  color: rgb(150, 0, 0);
}

li a:hover,
li a:focus {
  text-decoration: none;
  color: rgb(255, 0, 0);
}
```

## Task 2

In this next task you are presented with a simple bit of content — just headings and paragraphs. There are accessibility issues with the colors and sizing of the text; we'd like you to:

1. Explain what the problems are, and what the guidelines are that state the acceptable values for color and sizing.
2. Select new values for the color and font-size that fix the problem.
3. Update the CSS with these new values to fix the problem.
4. Test the code to make sure the problem is now fixed. Explain what tools or methods you used to select the new values and test the code.

The answers:

1. (Q1) The problems are that first of all, the color contrast is not acceptable, as per WCAG criteria [1.4.3 (AA)](https://www.w3.org/TR/WCAG21/#contrast-minimum) and [1.4.6 (AAA)](https://www.w3.org/TR/WCAG21/#contrast-enhanced), and secondly, the text is sized using vw units, which means that it is not zoomable in most browsers. [WCAG 1.4.4 (AA)](https://www.w3.org/TR/WCAG21/#resize-text) states that text should be resizable.
2. (Qs 2 and 3) to fix the code, you need to

   - Choose a much better contrasting set of background and foreground colors.
   - Use some different units to size the text (such as rem or even px), or even implement something that uses a combination of vw and other units, if you want it resizable but still relative in part to the viewport size

3. For testing:

- You can test color contrast using a tool such as [aXe](https://www.deque.com/axe/), The [Firefox Accessibility Inspector](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector), or even a simple standalone web page tool like the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).
- For text resizing, you'd need to load the example in a browser and try to resize it. Resizing vw unit-sized text works in Safari, but not Firefox or Chromium-based browsers.

For the updated code, something like this would work for the updated color scheme:

```css
main {
  padding: 20px;
  background-color: red;
}

h1,
h2,
p {
  color: black;
}
```

And something like this would work for the font sizing:

```css
h1 {
  font-size: calc(2.5rem);
}

h2 {
  font-size: calc(2rem);
}

p {
  font-size: calc(1.2rem);
}
```

Or this, if you want to do something a bit cleverer that gives you resizable viewport-relative units:

```css
h1 {
  font-size: calc(1.5vw + 1rem);
}

h2 {
  font-size: calc(1.2vw + 0.7rem);
}

p {
  font-size: calc(1vw + 0.4rem);
}
```

## Task 3

In our final task here, you have some JavaScripting to do. We have a simple app that presents a list of animal names. Clicking one of the animal names causes a further description of that animal to appear in a box below the list.

But it is not very accessible — in its current state you can only operate it with the mouse. We'd like you to add to the HTML and JavaScript to make it keyboard acessible too.

Answers:

1. To begin with, you'll need to add `tabindex="0"` to the list items to make them focusable via the keyboard.
2. Then you'll need to add in another event listener inside the `forEach()` loop, to make the code respond to keys being pressed while the list items are selected. It is probably a good idea to make it respond to a specific key, such as "Enter", in which case something like the following is probably acceptable:

```css
item.addEventListener('keyup', function(e) {
  if(e.key === 'Enter') {
    handleSelection(e);
  }
});
```
