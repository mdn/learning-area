# Basic HTML text marking guide

The aim of the tasks is to demonstrate an understanding of the HTML features covered in the [HTML text fundamentals](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals) lesson in Learn Web Development on MDN.

## Task 1

This task covers understanding of HTML headings and paragraphs. Ideally the answer should look something like this:

```html
<h1>Basic HTML Animals</h1>

<p>This is the first paragraph in our page. It introduces our animals.</p>

<h2>The Llama</h2>

<p>
  Our Llama is a big fan of list items. When she spies a patch of them on a web
  page, she will eat them like sweets, licking her lips as she goes.
</p>

<h2>The Anaconda</h2>

<p>
  The crafty anaconda likes to slither around the page, travelling rapidly by
  way of anchors to sneak up on his prey.
</p>
```

It doesn't make sense for the subheadings to be a higher level than the top-level heading, or for the paragraphs to be marked up with something other than `<p>`.

## Task 2

In task 2 the student needs to wrap the first list in a `<ul>` element, and the second list in a `<ol>`. The individual list items for both lists need to be wrapped in `<li>` elements.

The finished code should look like this:

```html
<h1>Looking at lists</h1>

<p>Turn the following list of my favorite vegetables into an unordered list.</p>

<ul>
  <li>Cucumber</li>
  <li>Broccoli</li>
  <li>Asparagus</li>
  <li>Pepper</li>
</ul>

<p>Turn the following directions into an ordered list.</p>

<ol>
  <li>First knock on the door</li>
  <li>When prompted, say the magic word</li>
  <li>Wait for at least 5 seconds</li>
  <li>Turn the handle and push</li>
</ol>
```

## Task 3

The last task aims to test understanding of using basic inline elements such as `<strong>` and `<em>`. Simply, the student needs to markup a couple of words appropriately using each one.

The final code should look like this:

```html
<h1>Emphasis and importance</h1>

<p>
  There are two things I care about — <strong>music</strong> and
  <strong>friends</strong>. Someday I <em>might</em> be able to get my friends
  interested in each other, <em>and</em> my music!
</p>
```
