# Marking guide for "Fundamental CSS comprehension"
The following guide outlines a marking guide for the MDN Learning Area HTML Topic — [Fundamental CSS comprehension](https://developer.mozilla.org/en-US/Learn/CSS/Introduction_to_CSS/Fundamental_CSS_comprehension). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clear cut.

The overall mark awarded is out of 35. Work out their final mark, and then divide by 35 and multiply by 100 to give a percentage mark. For reference, you can find a [finished business card](https://mdn.github.io/learning-area/css/introduction-to-css/fundamental-css-comprehension-finished/) that would be awarded top marks.

## Basic setup

<dl>
<dt>"create a new file in the same directory as your HTML and image files" (1 mark)</dt>
<dd>The first task — creating your CSS file — is only worth one mark. It is pretty easy, although you won't be able to do much without getting this right.</dd>
<dt>"Link your CSS to your HTML file via a <code>&lt;link&gt;</code> element" (2 marks)</dt>
<dd>Slightly more challenging, but again pretty easy.</dd>
<dt>"copy and paste them into the top of your new CSS file. Use them as a test to make sure your CSS is properly applied to your HTML." (1 mark)</dt>
<dd>This is just copy and paste, so not really worth much.</dd>
<dt>"Above the two rules, add a CSS comment with some text inside it to indicate that this is a set of general styles for the overall page. "General page styles" would do. Also add three more comments..." (2 marks)</dt>
<dd>Good commenting is important. You should award 0.5 marks for each of the four comments, as long as they are written in a sensible place with meaningful text.</dd>
</dl>

## Taking care of the provided selectors and rulesets

<dl>
<dt>"look at the four selectors, and calculate the specificity for each one." (2 marks)</dt>
<dd>The correct specificity for each one is as follows (half a mark each):
  <ul>
    <li>0012</li>
    <li>0011</li>
    <li>0011</li>
    <li>0010</li>
  </ul>
</dd>
<dt>"Now it's time to put the right selector on the right rule set!" (4 marks)</dt>
<dd>The correct pairing are as follows (1 mark for each):
  <ul>
    <li><code>.card article img</code> goes with the fourth ruleset.</li>
    <li><code>.card footer</code> goes with the third ruleset.</li>
    <li><code>.card header</code> goes with the second ruleset.</li>
    <li><code>.card</code> goes with the first ruleset.</li>
  </ul>
</dd>
<dt>"Beware! There are two errors in the provided rulesets." (2 marks)</dt>
<dd>The errors are as follows (one mark for fixing each one):
  <ul>
    <li><code>background-colour</code> in the first ruleset: colour > color.</li>
    <li><code>max-height: 100%</code> in the fourth rule needs a semi-colon at the end of it.</li>
  </ul>
</dd>
</dl>

## New rulesets you need to write

<dl>
<dt>"Write a ruleset that targets both the card header, and card footer..." (3 marks)</dt>
<dd>The correct rule should look <a href="https://github.com/mdn/learning-area/blob/master/css/introduction-to-css/fundamental-css-comprehension-finished/style.css#L30-L33">something like this</a>. Since the default font size as set on the <code>&lt;html&gt;</code> element is 10px, 1em is 10px, so the height (30px) should be represented by 3em, and the padding by 1em. 10 + 30 + 10 = 50.  
</dd>
<dt>"The default margin applied to the <code>&lt;h2&gt;</code> and <code>&lt;p&gt;</code> elements by the browser will interfere with our design" (3 marks)</dt>
<dd>The correct rule should look <a href="https://github.com/mdn/learning-area/blob/master/css/introduction-to-css/fundamental-css-comprehension-finished/style.css#L24-L26">something like this</a>. Simply setting the margin to 0 on all paragraphs and the <code>&lt;h2&gt;</code> should be fine.</dd>
<dt>"To stop the image from spilling out of the main business card content (the <code>&lt;article&gt;</code> element), we need to give it a specific height." (3 marks)</dt>
<dd>The correct rule should look <a href="https://github.com/mdn/learning-area/blob/master/css/introduction-to-css/fundamental-css-comprehension-finished/style.css#L57-L60">something like this</a>. The height needs to be 12ems (as 12 x the base size of 10px = 120px), and the color needs to be RGBA — black expressed in RGB (0,0,0) with an alpha channel value of about 0.1-0.3.</dd>
<dt>"Write a ruleset that gives the <code>&lt;h2&gt;</code> an effective font size of 20px (but expressed in ems) and an appropriate line height to place it in the center of the header's content box..." (3 marks)</dt>
<dd>The correct rule should look <a href="https://github.com/mdn/learning-area/blob/master/css/introduction-to-css/fundamental-css-comprehension-finished/style.css#L46-L48">something like this</a>. The height needs to be 2ems (2 x 10 = 20), and the line height would be expressed best as 1.5 (1.5 x 20px = 30px, the height of the header content.) Setting line height to 30px would also be ok.</dd>
<dt>"Write a ruleset that gives the <code>&lt;p&gt;</code> an effective font size of 15px (but expressed in ems) and an appropriate line height to place it in the center of the footer's content box..." (3 marks)</dt>
<dd>The correct rule should look <a href="https://github.com/mdn/learning-area/blob/master/css/introduction-to-css/fundamental-css-comprehension-finished/style.css#L50-L53">something like this</a>. The height needs to be 1.5ems (1.5 x 10 = 15), and the line height would be expressed best as 2 (2 x 15px = 30px, the height of the header content.) Setting line height to 30px would also be ok.</dd>
<dt>"As a last little touch, give the paragraph inside the <code>&lt;article&gt;</code> an appropriate padding value so that its left edge lines up with the <code>&lt;h2&gt;</code> and footer paragraph, and set its color to be fairly light so it is easy to read." (3 marks)</dt>
<dd>The correct rule should look <a href="https://github.com/mdn/learning-area/blob/master/css/introduction-to-css/fundamental-css-comprehension-finished/style.css#L67-L70">something like this</a>. The padding needs to be 1em, and the color needs to be set to some kind of lighter color that will show up well against the darker background we set earlier. Pure white would be ok, or something similar.</dd>
</dl>

## Other things to think about
<dl>
<dt>"You'll get bonus marks if you write your CSS for maximum readability, with a separate declaration on each line." (2 marks)</dt>
<dd>If the CSS is arranged in a readable  manner, with a separate declaration on each line (or similar), then they get the marks. If not, then they don't.</dd>
<dt>"You should include <code>.card</code> at the start of the selector chain in all your rules, so that these rules wouldn't interfere with the styling of any other elements if the business card were to be put on a page with a load of other content." (1 mark)</dt>
<dd>A nice little addition to include in the assessment for promoting the idea of "compartmentalisation", or "namespacing" of CSS so different sets of rules don't interfere with one another. Not that important in this particular context, but it would be nice for the student to include.</dd>
</dl>
