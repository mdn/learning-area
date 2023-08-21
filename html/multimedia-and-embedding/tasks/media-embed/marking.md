# Media and embedding marking guide

The aim of the tasks is to demonstrate an understanding of the HTML features covered in the [Video and audio content](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content) and [From object to iframe — other embedding technologies](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies) lessons in Learn Web Development on MDN.

## Task 1

This task tests your ability to put together a simple audio player with a single source. Ideally the answer should look something like this:

```
<h1>Basic audio embed</h1>

<audio src="media/audio.mp3" controls>
  <p>Your browser doesn't support HTML5 audio. Here is a <a href="media/audio.mp3">link to the audio</a> instead.</p> 
</audio>
```

The filename and path must be correct for the audio to show up. The `controls` attribute should be included so we can easily play the audio, and the fallback text is also a best practice, although most browsers will support this now. 

## Task 2

In this next task we're doing something a bit more complex; a full-featured video player with multiple sources. The code would look something like this:

```
<h1>Video embed</h1>

<video controls muted
       width="320" height="240">
  <source src="media/video.mp4" type="video/mp4">
  <source src="media/video.webm" type="video/webm">
  <track kind="subtitles" src="media/subtitles_en.vtt" srclang="en">
  <p>Your browser doesn't support HTML5 video. Here is a <a href="media/video.mp4">link to the video</a> instead.</p>
</video>
```

Here we've got a number of things that need to be put in place:

* `controls` to make the controls appear.
* `width` and `height` as requested.
* `muted` to make sure no sound is played, as per the requirements.
* two separate `<source>` elements pointing to the two different video formats, to provide support in older browsers that don't support MP4 and instead support WebM. Each should be given a `type` attribute to indicate what the video's MIME type is, so the browser can tell up front if it can play with video without needing to start downloading it.
* A `<track>` element to display the subtitles, with appropriate `kind`, `src`, and `srclang` attributes.
* Suitable fallback content, as before.

Note that the subtitles will not load if you try to run the example locally, due to browser security policy. To see the subtitles you must run the example from an actual web server.

## Task 3

In task 3 the student needs to test embedding techniques.

The finished code would probably look like something this:

```
<h1>Embedding</h1>

<object data="media/mypdf.pdf" type="application/pdf"
        width="400" height="400">
</object>

<hr>

<iframe width="560" height="315" src="https://www.youtube.com/embed/SB-qEYVdvXA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


```

In the first example, you just need to look up the correct code to embed a PDF in the page, making sure you get the path to the PDF file correct.

In the second example, you'll need to go to YouTube, Google Maps, or a similar site, find the embed functionality, and copy over the embed code into the live example. This code will look markedly different depending on what service you use. 