# Marking guide for "Structuring a page of content"

The following guide outlines a marking guide for the MDN Learning Area HTML Topic — [Structuring a page of content](https://developer.mozilla.org/en-US/Learn/HTML/Introduction_to_HTML/Structuring_a_page_of_content). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clearly cut.

The overall mark awarded is out of 30. Work out their final mark, and then divide by 30 and multiply by 100 to give a percentage mark. For reference, you can find a [finished marked up page](index.html) that would be awarded top marks.

## Block/structural semantics

<dl>
<dt>The header (4 marks.)</dt>
<dd>They need to wrap the <code>&lt;h1&gt;</code>, first <code>&lt;img&gt;</code> and whole of the <code>&lt;ul&gt;</code> in a <code>&lt;header&gt;</code> element.</dd>
<dt>The navigation menu (4 marks.)</dt>
<dd>They need to wrap the <code>&lt;ul&gt;</code> in a <code>&lt;nav&gt;</code> element.</dd>
<dt>The main content (4 marks.)</dt>
<dd>They need to wrap both <code>&lt;h2&gt;</code>s, the first two <code>&lt;p&gt;</code>s and the last four <code>&lt;img&gt;</code>s in a <code>&lt;main&gt;</code> element.</dd>
<dt>The welcome text (4 marks.)</dt>
<dd>They need to wrap the first <code>&lt;h2&gt;</code> and the first two <code>&lt;p&gt;</code>s in an <code>&lt;article&gt;</code> element or a <code>&lt;section&gt;</code> element.</dd>
<dt>The image sidebar (4 marks.)</dt>
<dd>They need to wrap the second <code>&lt;h2&gt;</code> and the last four <code>&lt;img&gt;</code>s in an <code>&lt;aside&gt;</code> element.</dd>
<dt>The footer (4 marks.)</dt>
<dd>They need to wrap the last two <code>&lt;p&gt;</code>s in a <code>&lt;footer&gt;</code> element.</dd>
</dl>

## Other tasks

<dl>
<dt>Apply the provided CSS to the page by adding another <code>&lt;link&gt;</code> element just below the existing one provided at the start (4 marks.)</dt>
<dd>The element should look like this: <code>&lt;link rel="stylesheet" href="style.css"&gt;</code></dd>
<dt>You'll get bonus points if it validates as much as possible (2 marks.)</dt>
<dd>If the student's code validates, apart from the Google Font link element, they get the marks.</dd>
