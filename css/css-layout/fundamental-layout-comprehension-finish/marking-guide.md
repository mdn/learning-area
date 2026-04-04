# Marking guide for "Fundamental Layout Comprehension"

The following guide outlines a marking guide for the MDN Learning Area CSS Layout Topic. Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or somethign that isn't clearly cut.

The overall mark awarded is out of 25. Work out their final mark, and then divide by 25 and multiply by 100 to give a percentage mark. For reference, you can find a finished example in this folder that would be awarded top marks.

While the actual amount of code that is required to be added is relatively small, this task is about making the right choices for this layout.

**Display the navigation items in a row, with an equal amount of space between the items.**

Here the student should use flexbox, adding `display: flex` to `nav ul` (2 marks), and `justify-content: space-between` (2 marks) to distribute the additional space between the items.  

**The navigation bar should scroll with the content and then become stuck at the top of the viewport when it reaches it.**

The selector `nav` should have `position: sticky` (2 marks) plus an offset value of `top: 0` (2 marks). 

**The image that is inside the article should have text wrapped around it.**

The image should be floated left `float: left` (2 marks) with a right and bottom margin to move the text away from it (3 marks).

**The `<article>` and `<aside>` elements should display as a two column layout. The columns should be a flexible size so that if the browser window shrinks smaller the columns become narrower.**

Here the student would ideally use CSS Grid  `display: grid` (2 marks), with the `fr` unit for the columns `grid-template-columns: 3fr 1fr` (2 marks). It would also be possible to use flexbox, and that would be acceptable too. Percentages would work for the column tracks, but ideally they realise that the fr unit works nicely here. The actual proportions they pick don't really matter. A `grid-gap` or `gap` property should separate the tracks, e.g. `grid-gap: 20px` (2 marks).

**The photographs should display as a two column grid with a 1 pixel gap between the images.**

This should be grid layout, a flex layout would mean the last image would spread out across the two tracks. A grid layout with two 1fr tracks (4 marks) will get the display we want with a `grid-gap` of 1px (2 marks). In supporting browsers the `gap` property rather than `grid-gap` will work.