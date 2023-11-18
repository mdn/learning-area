# Images marking guide

The aim of the tasks is to demonstrate an understanding of the HTML features covered in the [Images in HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML) lesson in Learn Web Development on MDN.

## Task 1

This task tests your ability to embed a simple image on the page, give it some alternative text, and give it some `width` and `height` attributes. Ideally the answer should look something like this:

```
<h1>Basic image embed</h1>

<img src="images/blueberries.jpg"
     alt="A pile of blueberries, small, round, blue berries"
     width="615" height="419">
```

The filename and path must be correct for the image to show up. The `alt` text should describe the visual appearance of image for those that can't see it. Finally, the `width` and `height` attributes should contain the same values as the image's intrinsic width and height, so it displays at the correct size.

## Task 2

Here the student needs to add a `title` to the `<image>` element to create a tooltip that appears when moused over. The code would look something like this:

```
<h1>Basic image title</h1>

<img src="larch.jpg"
     alt="Several tall evergreen trees called larches"
     title="Number 1 in Monty Python's How to recognise different trees from quite a long way away">
```

Because screenreader support is unreliable and potentially unhelpful, information contained in the `title` attributes should be non-essential. Here were are just having a bit of fun.

## Task 3

In task 3 the student needs to create an image that is associated with a caption inside the HTML itself.

The finished would probably look like this:

```
<h1>Image and caption</h1>

<figure>
	<img src="firefox.png"
	     alt="An abstract flaming fox wrapping around a blue sphere"
	     width="446" height="460">
	<figcaption>The Firefox logo, newly abstracted for 2019!</figcaption>
</figure>
```

Note that the caption should contain additional information, and not just repeat the image description found in the `alt` text. 