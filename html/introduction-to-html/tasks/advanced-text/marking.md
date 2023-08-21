# Advanced HTML text marking guide

The aim of the tasks is to demonstrate an understanding of the HTML features covered in the [Advanced text formatting](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting) lesson in Learn Web Development on MDN.

## Task 1

This task covers understanding of HTML description lists. Ideally the answer should look something like this:

```
<h1>Advanced HTML Animals</h1>

<dl>
  <dt>Llama</dt>
  <dd>Tall, woolly quadruped, pointy ears. Sometimes rideable, but grumpy and spits a lot. Big fan of list items.</dd>
  <dt>Anaconda</dt>
  <dd>A very large constrictor snake; travels rapidly by way of anchors to sneak up on his prey.</dd>
  <dt>Hippopotamus</dt>
  <dd>His description is bottomless.</dd>
</dl>
```

## Task 2

Our second task is designed to test knowledge of a number of different slightly-more-obscure semantic elements.

The finished code should look like this:

```
<h1>Advanced text semantics</h1>

<p>Let's start with a quote:</p>

<blockquote cite="https://developer.mozilla.org/en-US/docs/Learn/Accessibility"><p><abbr>HTML</abbr>, Hypertext Markup Language is by default accessible, if used correctly.</p></blockquote>

<p><abbr>CSS</abbr>, Cascading Style Sheets, can also be used to make web pages more, or less, accessible.</p>

<p>Chemical Formulae: H<sub>2</sub>O (Water), C<sub>2</sub>H<sub>6</sub>O (Ethanol).</p>

<p>Dates: <time datetime="2019-12-25">December 25<sup>th</sup> 2019</time> (Christmas Day), <time datetime="2019-11-02">November 2<sup>nd</sup> 2019</time> (Día de los Muertos).</p>
```
