# Marking guide for "Typesetting a community school homepage"

The following guide outlines a marking guide for the MDN Learning Area HTML Topic — [Typesetting a community school homepage](https://developer.mozilla.org/en-US/Learn/CSS/Introduction_to_CSS/Fundamental_CSS_comprehension). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clear cut.

The overall mark awarded is out of 40. Work out their final mark, and then divide by 40 and multiply by 100 to give a percentage mark. For reference, you can find a [finished typeset homepage](index.html) that would be awarded top marks.

## Fonts

<dl>
<dt>"download a couple of free-to-use fonts" (3 marks)</dt>
<dd>the student will get one mark for the suitability of each of the two fonts (the description in the question says "the fonts should be chosen to give the page a fairly serious, formal, trustworthy feel — a serif side-wide font for the general text body, coupled with sans-serif or slab serif for the headings might be nice.") and one mark for the fonts being ok to use.</dd>
<dt>"Use a suitable service to generate bulletproof <code>@font-face</code> code" (2 marks)</dt>
<dd>The student will get the marks by using a service like fontsquirrel's generator to create bulletproof <code>@font-face</code> code. You can check it against the example linked above. If it is not cross-browser, or fails to apply the fonts, then they get no marks.</dd>
<dt>"Apply your body font to the whole page, and your heading font to your headings." (3 marks)</dt>
<dd>The body font should be applied to the <code>&lt;html&gt;</code> element, and the heading font should be applied only to <code>&lt;h1&gt;</code> and <code>&lt;h2&gt;</code>. One mark for each. Also, one bonus mark for providing something of a fallback for each in a font stack, and not just a single font.</dd>
</dl>

## General text styling

<dl>
<dt>"Give the page a site-wide <code>font-size</code> of 10px" (1 mark)</dt>
<dd><code>font-size: 10px;</code> should be applied to the <code>&lt;html&gt;</code> element.</dd>
<dt>"Give your headings and other element types appropriate font-sizes defined using a suitable relative unit." (3 marks)</dt>
<dd>Award between 0 and 2 marks for the sizing, depending on how well thought out it looks. Also award one mark if a sensible relative unit such as em or rem is used.</dd>
<dt>"Give your body text a suitable <code>line-height</code>." (1 mark)</dt>
<dd>Between about 1.4 and 1.6 is ideal, and will get the mark.</dd>
<dt>"Center your top level heading on the page." (1 mark)</dt>
<dd>Setting <code>text-align: center;</code> on the <code>h1</code> will get the mark. Flexbox would also do. Anything else is probably too convoluted to get the mark.</dd>
<dt>"Give your headings a little bit of <code>letter-spacing</code>..." (1 mark)</dt>
<dd>Generally something small like 1 or 2 pixels (0.1 or 0.2 rem) will work ok, depending on the font.</dd>
<dt>"Give your body text some letter-spacing and word-spacing, as appropriate." (1 mark)</dt>
<dd>About 0.5 or 1 pixel of letter spacing and about 3px of word spacing will look ok to help the text breathe a bit, depending on the font.</dd>
<dt>"Give the first paragraph after each heading in the <code>&lt;section&gt;</code> a little bit of text-indentation, say 20px." (2 marks)</dt>
<dd>A good little test of selector and background knowledge. The selector should be <code>h2 + p</code>, and the declaration used should be <code>text-indent: 20px;</code>. One mark for each.</dd>
</dl>

## Links

<dl>
<dt>"Give the link, visited, focus, and hover states some colors that go with the color of the horizontal bars at the top and bottom of the page." (3 marks)</dt>
<dd>The link state rules should be laid out in the proper order of <code>a</code>, <code>a:link</code>, <code>a:visited</code>, <code>a:focus</code>, <code>a:hover</code>, and <code>a:active</code> to get the first mark. For the second mark, make the link and visited states have a color that goes with the page. For the third mark, make the focus AND hover states have a different color, or you could even just give them the same color, because of the next instruction. It is acceptable for link and visited to have the same styling, and focus and hover.</dd>
<dt>"Make it so that links are underlined by default, but when you hover or focus them, the underline disappears." (2 marks)</dt>
<dd>The links will have <code>text-decoration: underline</code> set by default. You could just set <code>text-decoration: none;</code> on the focus and hover states. The method of using <code>border-bottom</code> is also acceptable.</dd>
<dt>"Remove the default focus outline from ALL the links on the page." (1 mark)</dt>
<dd>You just need to set <code>outline: none</code> on all links (<code>a</code>).</dd>
<dt>"Give the active state a noticeably different styling so it stands out nicely, but make it still fit in with the overall page design." (2 marks)</dt>
<dd>they can get one mark for something totally crazy that stands out, or two marks for something tasteful that stands out.</dd>
<dt>"Make it so that external links have the external link icon inserted next to them." (4 marks)</dt>
<dd>This is worth four marks because it is fairly complex. They can get a mark each for:
  <ul>
    <li>Using a suitable attribute selector that only selects links containing "http" in their <code>href</code> attribute.</li>
    <li>Including some padding to make way for the link to be displayed.</li>
    <li>Including the correct <code>background-*</code> properties or <code>background</code> shorthand to place the background image, and to make it not repeat.</li>
    <li>Including the <code>background-size</code> property to resize the icon to something appropriate dynamically, OR resizing it in an image editor to an appropriate size.</li>
  </ul>
</dd>
</dl>

## Lists

<dl>
<dt>"Make sure the spacing of your lists and list items works well with the styling of the overall page." (1 mark)</dt>
<dd>This will basically work ok anyway, but one bonus mark is being awarded for students that set 16px (1.6rem) for the top and bottom margins of <code>&lt;ul&gt;</code> and <code>&lt;ol&gt;</code>. This is to make sure the spacing will always be correct, even if two lists were to be placed next to one another.</dd>
<dt>"Give your list items a nice bullet, appropriate for the design of the page. It is up to you whether you choose a custom bullet image or something else." (1 mark)</dt>
<dd>This is really up to the student: they can give <code>&lt;ul&gt;</code> and <code>&lt;ol&gt;</code> a simple <code>list-style-type</code> or something a bit more interesting; whatever they feel like.</dd>
</dl>

## Navigation menu

<dl>
<dt>"Style your navigation menu so that it has an appropriate look for the look and feel for the page." (8 marks)</dt>
<dd>The mark award for this one question is quite high, because it is fairly complex and has multiple parts. Ideally, they should:
  <ul>
    <li>Start every selector with <code>nav</code> to make sure only the nav menu is affected.</li>
    <li>Set the left padding on the <code>&lt;ul&gt;</code> to 0.</li>
    <li>Set some top margin on the <code>&lt;ul&gt;</code> to bring the text of the top bullet in line with the headings on the other columns, and some bottom margin on the <code>&lt;li&gt;</code>s to space the menu items out a bit.</li>
    <li>Set <code>list-style-type: none;</code> on the <code>&lt;li&gt;</code> to get rid of the bullets.</li>
    <li>Make the links sizeable by setting them to <code>display: inline-block</code>.</li>
    <li>Give the links appropriate styling to make them look nice and fit in with the style of the page. This could include center aligned text, line height, larger font size, color, border, whatever, as long as it looks ok.</li>
    <li>Give the focus and hover states different styling so the nav menu responds when interacted with.</li>
    <li>Give the active state a different style again, so it is obvious when a link becomes activated.</li>
  </ul>  
</dd>
</dl>
