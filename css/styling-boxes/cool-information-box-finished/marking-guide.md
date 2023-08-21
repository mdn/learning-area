# Marking guide for "A cool looking box"
The following guide outlines a marking guide for the MDN Learning Area CSS assessment — [A cool looking box](https://developer.mozilla.org/en-US/Learn/CSS/Styling_boxes/A_cool_looking_box). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clear cut.

The overall mark awarded is out of 22. Work out their final mark, and then divide by 22 and multiply by 100 to give a percentage mark. For reference, you can find a [finished styled box](index.html) that would be awarded top marks.

## General tasks

<dl>
<dt>"Apply the CSS to the HTML." (1 mark)</dt>
<dd>One mark for creating a suitable <code>&ltlink&gt;</code> element, or <code>&lt;style&gt;</code> element to apply the CSS with.</dd>
</dl>

## Styling the box

<dl>
<dt>"A reasonable width for a large box." (1 mark)</dt>
  <dd>One mark for giving the <code>div</code> a <code>width</code> of around 150-300px. This is fairly hard to not get, as long as it isn't set to 1000px, or 50px.</dd>
<dt>"A reasonable height for a large box, centering the text vertically." (1 mark)</dt>
  <dd>One mark for giving the <code>div</code> a <code>line-height</code> of around 8-10. Again, award the mark as long as it doesn't look ridiculous.</dd>
<dt>"Horizontally Centered box." (1 mark)</dt>
<dd>One mark for giving the <code>div</code> <code>margin</code> of <code>0 auto</code>, or <code>auto</code>, or similar.</dd>
<dt>"A slight Increase in font size, to around 17-18px computed style. Use rems." (2 marks)</dt>
<dd>One mark for setting an appropriate <code>font-size</code> (somewhere between 1.0625-1.125rem), and one mark for a good explanation. Something like recalling that the default font size is 16px, and calculating an exact rem value (e.g. 17/16), or approximating it and checking it in the browser dev tools, will do fine.</dd>
<dt>"A base color for the design. Give the box this color as its background color." (1 mark)</dt>
<dd>One mark for choosing a reasonable color and setting it as a <code>background-color</code>. Easy.</dd>
<dt>"A contrasting color for the text; a black text shadow. Make it readable." (2 marks)</dt>
<dd>One mark for setting a contrasting color and one mark for a tight <code>text-shadow</code>. Something like <code>1px 1px 1px black</code> is fine, but nothing too diffuse.</dd>
<dt>"A fairly subtle border radius." (1 mark)</dt>
<dd>One mark for setting a fairly subtle <code>border-radius</code> value like 10-15px, or 1rem perhaps. 20px at the most; nothing too ridiculous.</dd>
<dt>"A 1 pixel solid border with a color similar to the base color, but a slightly darker shade." (2 marks)</dt>
<dd>One mark for setting the <code>border</code> as <code>1px solid [a color]</code>, and one mark for setting the color to a slightly darker shade than the base color, e.g. if your base color is <code>rgb(255,0,0)</code>, set it to <code>rgb(200,0,0)</code>.</dd>
<dt>"A linear semi-transparent black gradient that goes towards the top left corner. Make it completely transparent at the start, a gradient to around 0.2 opacity by 30%, and remaining at the same color until the end." (4 marks)</dt>
<dd>An ideal value would be <code>background-image: linear-gradient(to top left, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 30%, rgba(0,0,0,0));</code>. The student can get:
  <ul>
    <li>One mark for knowing how to use a <code>linear-gradient</code>.</li>
    <li>One mark for getting the direction value right: <code>to top left</code> (<code>to left top</code> is also fine)</li>
    <li>One mark for using <code>rgba()</code> or <code>hsla()</code> colors correctly, with an opacity channel value of 0.2 or similar.</li>
    <li>One mark for the correct use of an 0.2 opacity color stop at 30% along.</li>
  </ul>
</dd>
<dt>"Multiple box shadows." (6 marks)</dt>
<dd>The mark scheme is as follows:
  <ul>
    <li>One mark for getting the basic <code>box-shadow</code> syntax correct.</li>
    <li>One mark for the simple, non-inset box shadow. Something like this is fine: <code>2px 2px 5px black</code>. But not too diffuse.</li>
    <li>Two marks for the top left shadow. It should have a positive offset to move it down and right - making it hug the top and left edges, and use a semi-transparent white. A good example: <code>inset 2px 2px 3px rgba(255,255,255,0.6)</code>.</li>
    <li>Two marks for the bottom right shadow. It should have a negative offset to move it up and left - making it hug the bottom and right edges, and use a semi-transparent black. A good example: <code>inset -2px -2px 3px rgba(0,0,0,0.6)</code>.</li>
  </ul>
</dd>
</dl>
