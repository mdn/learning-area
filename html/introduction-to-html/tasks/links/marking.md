# Links marking guide

The aim of the tasks is to demonstrate an understanding of hyperlinks, as covered in the [Creating hyperlinks](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks) lesson in Learn Web Development on MDN.

## Task 1

The first task covers some link basics — setting a link destination, giving it a descriptive title, and creating an email link. The solution should look something like this:

```html
<h1>Information on Whales</h1>

<p>
  For more information on our conservation activities and which Whales we study,
  see our
  <a
    href="whales.html"
    target="_blank"
    title="includes information on Blue Whales and Sperm Whales"
    >Whales page</a
  >.
</p>

<p>
  If you want to ask our team more questions, feel free to
  <a href="mailto:whales@example.com?subject=Question%20about%20Whales"
    >email us</a
  >.
</p>
```

The title needs to contain some supplemental information about the page that is useful but not essential for knowing what the linked page is about. If the subject was included on the email link, it really needs `%20` escape characters included so that you get spaces in the subject line.

## Task 2

Our second task here tests the student's knowledge of absolute and relative paths, as well as link fragments

The finished list code should look like this:

```html
<h1>List path tests</h1>

<ul>
  <li>
    <a href="blue/blue-whale.jpg" target="_blank">
      Link me to the blue whale image
    </a>
  </li>
  <li>
    <a href="../narwhal/narwhal.png" target="_blank">
      Link me to the narwhal image
    </a>
  </li>
  <li>
    <a href="https://www.google.co.uk/imghp" target="_blank">
      Link me to Google image search
    </a>
  </li>
  <li>
    <a href="#bottom">Link me to the paragraph at the bottom of the page</a>
  </li>
</ul>
```

## Task 3

Our final task in this set is concerned with good practices for link text; the code should look something like this:

```html
<p>
  We do lots of work with Narwhals. To find out more, visit our
  <a href="narwhals.html" target="_blank">Narwhals page</a>.
</p>

<p>
  You can <a href="mailto:whales@example.com">email our support team</a> if you
  have any more questions.
</p>

<p>
  You can also
  <a href="factfile.pdf" target="_blank">download our factfile (PDF, 4MB)</a>
  for lots more information, including an FAQ.
</p>
```

Basically, all three paragraphs need to be rewritten with good link text, and the third one needs to have a warning added to the link to say that it is a large download.
