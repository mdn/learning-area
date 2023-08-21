# Marking guide for "Creating fancy letterheaded paper"
The following guide outlines a marking guide for the MDN Learning Area CSS assessment — [Creating fancy letterheaded paper](https://developer.mozilla.org/en-US/Learn/CSS/Styling_boxes/Creating_fancy_letterheaded_paper). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clear cut.

The overall mark awarded is out of 19. Work out their final mark, and then divide by 19 and multiply by 100 to give a percentage mark. For reference, you can find a [finished styled letterhead](index.html) that would be awarded top marks.

## The main letter

<dl>
<dt>"Apply the CSS to the HTML." (1 mark)</dt>
<dd>One mark for creating a suitable <code>&ltlink&gt;</code> element, or <code>&lt;style&gt;</code> element to apply the CSS with.</dd>
<dt>"Add a background declaration to the letter..." (6 marks)</dt>
<dd>This requires a <code>background</code> property with multiple values. This is the most complicated part of this assessment, and there are a number of marks involved:
  <ul>
    <li>One mark for getting the basic syntax right and the background applying successfully.</li>
    <li>One mark for putting the three required backgrounds in the right order — the linear gradient has to go at the top so it is seen over the top of the two images.</li>
    <li>One mark for getting the top background image correct — <code>url(top-image.png) no-repeat left top</code>.</li>
    <li>One mark for getting the bottom background image correct — <code>url(bottom-image.png) no-repeat left bottom</code>.</li>
    <li>Two marks for getting the linear gradient correct; something like this —  <code>linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.2))</code></li>
  </ul>
</dd>
<dt>"Add another background declaration that just adds the top image to the top of the letter, as a fallback for browsers that don't support the previous declaration." (2 marks)</dt>
<dd>One mark for adding a <code>background</code> property that just specifies <code>url(top-image.png) no-repeat left top</code> in it's value; one mark for putting it before the main <code>background</code> declaration.</dd>
<dt>"Add a white background color to the letter." (1 mark)</dt>
<dd>Easy — <code>background-color: white;</code>.</dd>
<dt>"Add a 1mm top and bottom solid border to the letter, in a color that is in keeping with the rest of the color scheme." (3 marks)</dt>
<dd>Two marks for an appropriate <code>border-top</code> and <code>border-bottom</code> declaration (one for each), and one mark for choosing an appropriate color to go with the top and bottom graphics (e.g. a red or brown for the default provided options).</dd>
</dl>

## The logo

<dl>
<dt>"To the <code>&lt;h1&gt;</code>, add the logo as a background image." (1 mark)</dt>
<dd>One mark for an appropriate use of <code>background</code> to add the logo image. For example <code>background-image: url(logo.png);</code>.</dd>
<dt>"Add a filter to the logo to give it a subtle drop shadow." (2 marks)</dt>
<dd>One mark for using the <code>filter</code> property, and one mark for a suitable value, e.g. <code>drop-shadow(3px 3px 3px black)</code>.</dd>
<dt>"Now comment out the filter and implement the drop shadow in a different (slightly more cross-browser compatible) way, which still follows the shape of the round image." (3 marks)</dt>
<dd>The marks available are:
  <ul>
    <li>One mark for commenting out the filter property.</li>
    <li>One mark for making the box circular. <code>border-radius: 64px;</code> or <code>border-radius: 50%;</code> would both be fine.</li>
    <li>One mark for appropriate use of the <code>box-shadow</code> property.</li>
  </ul>
</dd>


</dl>
