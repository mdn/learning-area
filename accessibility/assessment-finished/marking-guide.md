# Marking guide for "Accessibility troubleshooting"
The following guide outlines a marking guide for the MDN Learning Area Accessibility Topic — [Accessibility troubleshooting](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clear cut.

The overall mark awarded is out of 37. Work out their final mark, and then divide by 37 and multiply by 100 to give a percentage mark. For reference, you can find a [finished version of the site](index.html) that would be awarded top marks.

## Color

<dl>
<dt>The text is difficult to read because of the current color scheme. Can you do a test of the current color contrast (text/background), report the results of the test, and then fix it by changing the assigned colors?</dt>
<dd>Two marks for this — one for checking the current text/background contrast in a checker like WebAIM's [Color Contrast Checker](http://webaim.org/resources/contrastchecker/) and reporting the results in some way, and one for updating the current color scheme to one with good contrast (i.e. passes WCAG AA in the checker).</dd>
</dl>

## Semantic HTML

<dl>
  <dt>The content is still not very accessible - report on what happens when you try to navigate it using a screenreader.</dt>
  <dd>One mark; Your report should give some kind of indication that you can't jump between headings and use them as signposts, and you can't even tell where headings and paragraphs start and end.</dd>
  <dt>Can you update the article text to make it easier for screenreader users to navigate?</dt>
  <dd>Eight marks.
  <ul>
    <li>The line breaks (<code>&lt;br&gt;</code> tags) all need to be removed (2).</li>
    <li>The <code>&lt;font&gt;</code> elements need to be replaced with appropriate heading elements (<code>&lt;h1&gt;</code>, <code>&lt;h2&gt;</code>, <code>&lt;h3&gt;</code>) (2).</li>
    <li>The paragraphs need to be wrapped in paragraph elements (<code>&lt;p&gt;</code>)(2).</li>
    <li>In the CSS file, <code>font[size="7"]</code>/<code>font[size="6"]</code>/<code>font[size="5"]</code> need to be replaced with <code>h1</code>/<code>h2</code>/<code>h3</code>.</li>
  </ul>
  </dd>
  <dt>The navigation menu part of the site (wrapped in <code>&lt;div class="nav"&gt;&lt;/div&gt;</code>) could be made more accessible by putting it in a proper HTML5 semantic element. Which one should it be updated to? Make the update.</dt>
  <dd>Three marks.
  <ul>
    <li>The <code>&lt;div class="nav"&gt;&lt;/div&gt;</code> needs be replaced with <code>&lt;nav&gt;&lt;/nav&gt;</code></li>
    <li>In the CSS file, instances of <code>div[class="nav"]</code> need to be replaced with <code>nav</code>.</li>
  </ul>
  </dd>
</dl>

## The images

<dl>
  <dt>The images are currently inaccessible to screenreader users. Can you fix this?</dt>
  <dd>Three marks. You can fix this by adding in alternative text in any suitable way; see <a href="https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML#Text_alternatives">Text alternatives</a> — describing the image in the text and perhaps also using <code>aria-labelledby</code> to link the two is good. you could also use a plain old <code>alt</code> attribute.</dd>
</dl>

## The audio player

<dl>
  <dt>The audio isn't accessible to hearing impaired (deaf) people - can you add some kind of accessible alternative for these users?</dt>
  <dd>Two marks. Any transcript system works for this simple example - a link to a separate file, the transcript written in the same page, etc. They just need to listen to the audio file, write out the transcription, and add it to their page in some way.</dd>
  <dt>The audio isn't accessible to those using older browsers that don't support HTML5 audio. How can you allow them to still access the audio?</dt>
  <dd>Two marks. Adding a link to the audio into the alternative contained inside the <audio> tags is fine, or you could go further and provide some kind of Flash audio player as the alternative content.</dd>
</dl>

## The forms

<dl>
  <dt>The input element in the search form at the top could do with a label, but we don't want to add a visible text label that would potentially spoil the design and isn't really needed by sighted users. How can you add a label that is only accessible to screenreaders?</dt>
  <dd>Two marks. You can add a descriptive label into an <code>aria-label</code> attribute on the input element. This will then be read out by screenreaders when the input is encountered.</dd>
  <dt>The two input elements in the comment form have visible text labels, but they are not unambiguously associated with their labels — how do you achieve this? Note that you'll need to update some of the CSS rule as well.</dt>
  <dd>Four marks. The label text should be wrapped inside <code>&lt;label&gt;</code> elements, with <code>for</code> attributes containing the ID values of the input elements they are the labels for.</dd>
</dl>

## The show/hide comment control

<dl>
  <dt>The show/hide comment control button is not current keyboard-accessible. Can you make it keyboard accessible, both in terms of focusing it, and activating it using the return key?</dt>
  <dd>Two marks. This can be managed easily by changing the <code>&lt;div&gt;</code> element that currently marks the button up to a <code>&lt;button&gt;</code> element. Or you could use <code>tabindex</code> and JavaScript to fix the button; see <a href="https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML#Building_keyboard_accessibility_back_in">Building keyboard accessibility back in</a>. The former is a much easier method however. </dd>
</dl>

## The table

<dl>
  <dt>The data table is not currently very accessible — it is hard for screenreader users to associate data rows and columns together, and the table also has no kind of summary to make it clear what it shows. Can you add some features to your HTML to fix this problem?</dt>
  <dd>Six marks.
  <ul>
    <li>They should add a suitable summary of the table in a <code>summary</code> attribute or <code>&lt;caption&gt;</code> element.
    <li>They should turn each cell in the first row and column into headings (<code>&lt;th&gt;</code>).</li>
    <li>They should add <code>scope="col"</code> to the headings in the first row, and <code>scope="row"</code> to the headings in the first column.</li>
  </ul>
  </dd>
</dl>

## Other considerations

<dl>
  <dt>Can you list two more ideas for improvements that would make the website more accessible?</dt>
  <dd>Two marks for this. Anything reasonable really; the ideas we had are:
    <ul>
      <li>Add client-side validation to the comment form</li>
      <li>Use media queries to make the site more usable on mobile devices.</li>
      <li>Find a way to announce screenreader users how many comments are displayed when the show comments control button is clicked. For example, put the <code>role</code> attribute with <code>"alert"</code> value on the <code>h2</code> element in the comments section and update its text like so "Comments (1 available)".</li>
    </ul>
  </dd>
</dl>
