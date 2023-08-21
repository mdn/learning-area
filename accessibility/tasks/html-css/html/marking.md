# HTML accessibility marking guide

The aim of these tasks is to demonstrate an understanding of the techniques covered in the [HTML: A good basis for accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML) lesson in Learn Web Development on MDN.

## Task 1

In this task we will test your understanding of text semantics, and why they are good for accessibility. You don't need to worry too much about recreating the _exact_ same look and text sizing, as long as the semantics are good.

The given text is a simple information panel with action buttons:

```
<font size="7">Need help?</font>
<br><br>
If you have any problems with our products, our  support center can offer you all the help you need, whether you want:
<br><br>
1. Advice choosing a new product
<br>
2. Tech support on an existing product
<br>
3. Refund and cancellation assistance
<br><br>
<font size="5">Contact us now</font>
<br><br>
Our help center contains live chat, e-mail addresses, and phone numbers.
<br><br>
<div class="button">Find Contact Details</div>
<br><br>
<font size="5">Find out answers</font>
<br><br>
Our Forums section contains a large knowledge base of searchable previously asked questions, and you can always ask a new question if you can't find the answer you're looking for.
<br><br>
<div class="button">Access forums</div>
```

But of course, this is terrible for semantics and accessibility. A much better set of markup would look like so:

```
<h2>Need help?</h2>

<p>If you have any problems with our products, our  support center can offer you all the help you need, whether you want:</p>
<ul>
  <li>Advice choosing a new product</li>
  <li>Tech support on an existing product</li>
  <li>Refund and cancellation assistance</li>
</ul>
<h3>Contact us now</h3>

<p>Our help center contains live chat, e-mail addresses, and phone numbers.</p>

<button>Find Contact Details</button>

<h3>Find out answers</h3>

<p>Our Forums section contains a large knowledge base of searchable previously asked questions, and you can always ask a new question if you can't find the answer you're looking for.</p>

<button>Access forums</button>
```

You can get a couple of extra marks for:

1. Just using `<button>`, not `<button class="button">` (repeating semantics is unnecessary), and updating the CSS selector to make sure the button still picks up the styles
2. Using an unordered list, not an ordered list — the list of items doesn't really need to be in any order.

## Task 2
In the second task, you have a form containing three input fields. You need to:

1. Semantically associate the input with their labels.
2. Assume that these inputs will be part of a larger form, and wrap them in an element that associates them all together as a single related group.
3. Give the group a description/title that summarises all of the information as personal data.

This is fairly simple, especially if you have previously worked through our [Web forms](https://developer.mozilla.org/en-US/docs/Learn/Forms) module. You need to:

1. Use `<label>` elements and `id`s to associate labels with inputs.
2. Use a `<fieldset>` to associate the elements together as one group.
3. Use a `<legend>` to give the `<fieldset>` a description/title.

Your answer should end up looking something like this:

```
<form>
  <fieldset>
  <legend>Personal data</legend>
    <ul>
      <li>
        <label for="name">Name</label>
        <input type="text" name="name" id="name">
      </li>
      <li>
        <label for="age">Age</label>
        <input type="number" name="age" id="age">
      </li>
      <li>
        <label for="email">Email address</label>
        <input type="email" name="email" id="email">
      </li>
    </ul>
  </fieldset>
</form>
```

# Task 3

In this task you are required to turn all the information links in the paragraph into good, accessible links.

1. The first two links just go to regular web pages.
2. The third link goes to a PDF, and it's large — 8MB.
3. The fourth link goes to a Word document, so the user will need some kind of application installed that can handle that.

Initially the paragraph looks like this:

```
<p>For more information about our activities, check out our fundraising page (<a href="/fundraising">click here</a>), education page (<a href="/education">click here</a>), sponsorship pack (<a href="/resources/sponsorship.pdf">click here</a>), and assessment sheets (<a href="/resources/assessments.docx">click here</a>).</p>
```

But you should update it to something like this:

```
<p>For more information about our activities, check out our <a href="/fundraising">fundraising page</a>, <a href="/education">education page</a>, <a href="/resources/sponsorship.pdf">sponsorship pack (PDF, 8MB)</a>, and <a href="/resources/assessments.docx">assessment sheets (Word document)</a>.</p>
```

## Task 4

In our final HTML accessibility task, you are given a simple image gallery, which has some accessibility problems. Can you fix them?

1. The header image has an accessibility issue, and so do the gallery images.
2. You could take the header image further and implement it using CSS for better accessibility. Why is this better, and what would a solution look like?

So, on to the answers:

1. The header image is decorative, so doesn't really need alt text. The best solution if you are going to use decorative HTML images is to put `alt=""`, so a screenreader will just read out nothing — rather than a description, or the image file name. It is not part of the content. 
2. The gallery images need alt text, and they are part of the content. The updated HTML could look something like this:

```
<header>
  <img src="images/star.png" alt="">
  <h1>Groovy images</h1>
</header>
<main>
  <img src="images/teapot.jpg" alt="a black teapot placed on a shelf just inside a window">
  <img src="images/football.jpg" alt="A black and white round panelled ball">
</main>
```

3. It would be arguable better to implement the background header image using CSS background images. To do this, you would remove the following line:

```
<img src="images/star.png" alt="A star that I use to decorate my page">
```

And add in a CSS rule along these lines:

```
h1 {
  background: url(images/star.png) no-repeat left;
  padding-left: 50px;
}
```