# Marking guide for "Mozilla splash page"
The following article outlines a marking guide for the MDN Learning Area HTML Assessment — [Mozilla splash page](https://developer.mozilla.org/en-US/Learn/HTML/Multimedia_and_embedding/Mozilla_splash_page). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clearly cut.

The overall mark awarded is out of 28. Work out their final mark, and then divide by 28 and multiply by 100 to give a percentage mark. For reference, you can find a [finished splash page](index.html) that would be awarded top marks.

## Preparing images

<dl>
<dt>A total of 6 marks should be awarded for this section</dt>
<ul>
  <li>1 for creating the 400px and 120px version of the Firefox logo.</li>
  <li>1 for creating the 400px and 120px version of the Addons image.</li>
  <li>1 for creating the 400px and 120px version of the Dinosaur logo.</li>
  <li>1 for leaving the MDN logo SVG as it is.</li>
  <li>1 for creating the 1200px and 600px version of the Red Panda image, but only if the former is landscape, and the latter is portrait and shows the panda close up.</li>
  <li>1 for optimizing them so they are nice and compact.</li>
  </ul>
</dd>
</dl>

## Adding a logo to the header

<dl>
<dt>A total of 2 marks should be awarded for this section</dt>
<ul>
  <li>1 for making the image <code>src</code> point to the 120px version of the Firefox logo.</li>
  <li>1 for giving the image appropriate <code>alt</code> text.</li>
</ul>
</dd>
</dl>

## Adding a video to the main article content

<dl>
<dt>A total of 2 marks should be awarded for this section</dt>
<ul>
  <li>1 for embedding the correct video.</li>
  <li>1 for making it 400px wide, and a reasonable amount tall.</li>
</ul>
</dd>
</dl>

## Adding responsive images to the further info links

<dl>
<dt>A total of 14 marks should be awarded for this section</dt>
<ul>
  <li>4 for each of the first three links. To get full marks for each one, the student must:
    <ul>
      <li>Use the correct image inside the link (Firefox logo for "Download Firefox", Dinosaur for mozilla.org, Add-ons image for the add-ons site.)</li>
      <li>Include an appropriate <code>src</code> and <code>alt</code> attribute.</li>
      <li>Include a <code>srcset</code> attribute that declares the 120px version of the image as 120w, and the 400px version of 400w.</li>
      <li>Include a <code>sizes</code> attribute that declares that the 120px version should be used if the viewport is 500px wide or narrower (<code>(max-width: 500px)</code>), and the 400px version should be used otherwise.</li>
    </ul>
  </li>
  <li>2 for embedding the SVG image inside the last link, just in a normal image element, with appropriate <code>src</code> attribute and <code>alt</code> text.</li>
</ul>
</dd>
</dl>

## An art directed red panda

<dl>
<dt>A total of 5 marks should be awarded for this section</dt>
<ul>
  <li>1 for using a <code>&lt;picture&gt;</code> element.</li>
  <li>2 for including an <code>&lt;img&gt;</code> element inside the <code>&lt;picture&gt;</code> element, pointing to the landscape version, with appropriate <code>alt</code> text.</li>
  <li>2 for including a <code>&lt;source&gt;</code> element with a <code>srcset</code> attribute pointing to the portrait version of the image, and a <code>media</code> attribute that causes the portrait image to show up only if the viewport is 600px wide or less (<code>(max-width: 600px)</code>.)</li>
</ul>
</dd>
</dl>
