# Marking guide for "Marking up a letter"

The following guide outlines a marking guide for the MDN Learning Area HTML Topic — [Marking up a letter](https://developer.mozilla.org/en-US/Learn/HTML/Introduction_to_HTML/Marking_up_a_letter). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or somethign that isn't clearly cut.

The overall mark awarded is out of 45.5. Work out their final mark, and then divide by 45.5 and multiply by 100 to give a percentage mark. For reference, you can find a [finished marked up letter](index.html) that would be awarded top marks.

## Block/structural semantics

<dl>
<dt>You should structure the overall document with an appropriate structure including doctype, and <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code> and <code>&lt;body&gt;</code> elements (5 marks)</dt>
<dd>They need to:
<ul>
  <li>Provide an HTML5 doctype (<code>&lt;!doctype html&gt;</code>, 1 mark)</li>
  <li>Include a <code>&lt;head&gt;</code> element just below that (1 mark)</li>
  <li>Wrap the content in a <code>&lt;body&gt;</code> element (1 mark)</li>
  <li>Wrap head and body in an <code>&lt;html&gt;</code> element (1 mark)</li>
  <li>You get one bonus mark for including a lang attribute in the <code>&lt;html&gt;</code> tag (1 mark)</li>
</ul>
</dd>
<dt>The letter in general should be marked up with a structure of paragraphs and headings, with the exception of the below points. There is one top level heading (the "Re:" line) and two second level headings (6 marks)</dt>
<dd>They need to:
  <ul>
  <li>Mark up the "Re:" line as an <code>&lt;h1&gt;</code> element (1 mark)</li>
  <li>Mark up the "Starting dates", "Subjects of study" and "Exotic dance moves" as <code>&lt;h2&gt;</code> elements (3 marks)</li>
  <li>Mark up all appropriate structural elements that shouldn't be headings or lists as paragraphs (2 marks)</li>
</ul>
</dd>
<dt>The semester start dates, study subjects and exotic dances should be marked up using an appropriate list type (6 marks)</dt>
<dd>This is fairly simple. Looking at the different lists and their context/usage, the reader should know to:
<ul>
  <li>Mark up the semester start dates as an unordered list (<code>&lt;ul&gt;</code>/<code>&lt;li&gt;</code>), or arguably an ordered list (<code>&lt;ol&gt;</code>/<code>&lt;li&gt;</code>) — either is ok (2 marks)</li>
  <li>Mark up the study subjects as an ordered list (<code>&lt;ol&gt;</code>/<code>&lt;li&gt;</code>) (2 marks)</li>
  <li>Mark up the exotic dances as a description list (<code>&lt;dl&gt;</code>/<code>&lt;dd&gt;</code>/<code>&lt;dt&gt;</code>) (2 marks)</li>
</ul>
</dd>
<dt>The two addresses should be put inside <code><code>&lt;address&gt;</code></code> elements. Each line of the address should sit on a new line, but not be in a new paragraph. (3 marks)</dt>
<dd>Wrap both of the addresses in an <code>&lt;address&gt;</code> element, and put a <code>&lt;br&gt;</code> element at the end of each line of the address, except for the last line in each case.</dd>
</dl>

## Inline semantics

<dl>
<dt>The names of the sender and receiver (and "Tel" and "Email") should be marked up with strong importance (2 marks, half a mark each)</dt>
<dd>"Dr. Eleanor Gaye", "Miss Eileen Dover", "Tel", and "Email" should be wrapped in a <code>&lt;strong&gt;</code> element.</dd>
<dt>The four dates in the document should be given appropriate elements containing machine-readable dates (2 marks, half a mark each)</dt>
<dd>All four dates should be marked up using a <code>&lt;time&gt;</code> element. Each one should have a datetime attribute containing a machine readable date. For example <code>&lt;time datetime="2016-01-20"&gt;20 January 2016&lt;/time&gt;</code></dd>
<dt>The first address and first date in the letter should be given a class attribute value of "sender-column"; the CSS you'll add later will then cause these to be right aligned, as should be the case in a classic letter layout. (2 marks)</dt>
<dd>The first <code>&lt;p&gt;</code> element in the document should be given an attribute of class="sender-column"; the first date should be wrapped in a <code>&lt;p&gt;</code>, which should also be given the class="sender-column" attribute.</dd>
<dt>The five acronyms/abbreviations in the main text of the letter should be marked up to provide expansions of each acronym/abbreviation. (2.5 marks, half a mark each)</dt>
<dd>Each acronym/abbreviation in the main text of the letter — "PhD", "HTML", "CSS", "BC" and "Esq" — should be wrapped in an <code>&lt;abbr&gt;</code> element with a title attribute, for example <code>&lt;abbr title="Cascading Style Sheets"&gt;CSS&lt;/abbr&gt;</code></dd>
<dt>The six sub/superscripts should be marked up appropriately (3 marks, half a mark each).</dt>
<dd>The four numbers in the chemical formulae should be wrapped in a <code>&lt;sub&gt;</code> element, e.g. <code>H&lt;sub&gt;2&lt;/sub&gt;O</code>. The rightmost number in both exponential expressions should be wrapped in a <code>&lt;sup&gt;</code> element, e.g. <code>10&lt;sup&gt;3&lt;/sup&gt;</code>.</dd>
<dt>Try to mark up at least two appropriate words in the text with strong importance/emphasis (1 mark, half a mark each)</dt>
<dd>This is very open to interpretation; anything that seems appropriate should be fine.</dd>
<dt>There are two places where a hyperlink should be added; add appropriate links with titles. For the location that the links point to, just use http://example.com (4 marks)</dt>
<dd>
  The two places should have an <code>&lt;a&gt;</code> element wrapped around reasonable words to make the link. Each element should have an href attribute pointing to a dummy URL, such as "http://www.example.com" or "*", and a title attribute that describes what the link should point to. Half a mark should be taken off if the link text is inappropriate, and/or attributes are missing.
  <ul>
    <li>First instance: something like <code>&lt;a href="http://www.example.com" title="table of awesome university important dates"&gt;important university dates&lt;/a&gt;</code></li>
    <li>Second instance: something like <code>&lt;a href="http://www.example.com" title="Dr Gaye's exotic dance research"&gt;exotic dance research page&lt;/a&gt;</code></li>
  </ul>
</dd>
<dt>The university motto quote and citation should be marked up with appropriate elements (2 marks)</dt>
<dd>"Be excellent to each other" should be wrapped in a <code>&lt;q&gt;</code> element, and "The memoirs of Bill S Preston, Esq" should be wrapped in a <code>&lt;cite&gt;</code> element</dd>
</dl>

## The head of the document

<dl>
  <dt>The character set of the document should be specified as utf-8 using an appropriate meta tag (1 mark)</dt>
  <dd>The answer should be <code>&lt;meta charset="utf-8"&gt;</code> or equivalent, included inside the <code>&lt;head&gt;</code> element.</dd>
  <dt>The author of the letter should be specified in an appropriate meta tag (1 mark)</dt>
  <dd>The answer should be something like <code>&lt;meta name="author" content="Dr. Eleanor Gaye"&gt;</code>, included inside the <code>&lt;head&gt;</code> element.</dd>
  <dt>The provided CSS should be included inside an appropriate tag (2 marks)</dt>
  <dd>The CSS from the provided CSS file should be pasted inside a <code>&lt;style&gt;</code> element, included inside the <code>&lt;head&gt;</code> element. OR, it would also be acceptable (in fact better) if the student put the CSS inside an external CSS file and linked it via a <code>&lt;link&gt;</code> element.</dd>
</dl>

## Other tasks

<dl>
<dt>You'll get bonus points if it validates as much as possible (2 marks.)</dt>
<dd>If the student's code validates, apart from the Google Font link element, they get the marks.</dd>
