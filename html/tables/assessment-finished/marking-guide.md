# Marking guide for "Structuring planet data"
The following guide outlines a marking guide for the MDN Learning Area HTML Topic — [Structuring planet data](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Structuring_planet_data). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clearly cut.

The overall mark awarded is out of 34. Work out their final mark, and then divide by 34 and multiply by 100 to give a percentage mark. For reference, you can find a [finished marked up page](planets-data.html) that would be awarded top marks.

## Block/structural semantics

<dl>
  <dt>Giving the table a basic high level structure — an outer container, a table header, and a table body (3 marks.)</dt>
  <dd>This is pretty simple. The student just needs to include a <code>&lt;table&gt;</code> element in the page, with a <code>&lt;thead&gt;</code> and <code>&lt;tbody&gt;</code> as children.</dd>
  <dt>Add the provided caption to your table. (2 marks)</dt>
  <dd>Again, simple, but it needs it be put in the right place — the provided caption needs to be put in a <code>&lt;caption&gt;</code> element, right below the opening <code>&lt;table&gt;</code> tag.</dd>
  <dt>Add a row to the table header containing all the column headers (5 marks).</dt>
  <dd>The student needs to:
    <ul>
      <li>Put the cells of the row inside a <code>&lt;tr&gt;</code> element and use <code>&lt;th&gt;</code> elements for the cells because they are headers (2 marks).</li>
      <li>Put the column header text in each cell correctly, copied from the raw data (1 mark).</li>
      <li>Leave a two-column gap at the start of the row — this is best done with a single cell with <code>colspan="2"</code> set on it, but we would accept two cells (2 marks).</dd>
      <li>Note: Giving the planet names column a header of "Name" is recommended, but they won't lose a mark if they forget this.</li>
    </ul>
  </dd>
  <dt>Create all the content rows inside the table body, remembering to make all the row headings into headings semantically (15 marks).</dt>
  <dd>This is the most difficult part of the table — it requires getting all the group row headings in the right rows, and making them span the right number of rows and columns.
    <ul>
      <li>First of all, each row needs to be put inside the <code>&lt;tbody&gt;</code> (1 mark).</li>
      <li>Each row needs to contain a <code>&lt;th&gt;</code> element containing the planet name at the start followed by nine <code>&lt;td&gt;</code> elements containing the planet's data (5 marks). Give full marks if this is mostly right with a couple of typos, but start to reduce the mark at your discretion if significant data points are wrong, wrongly placed, or omitted. Take two marks off if the planet names are not put in headers.</li>
      <li>The first body row needs to contain an extra <code>&lt;th&gt;</code> element at the start of it, containing "Terrestrial planets", with <code>rowspan="4"</code> and <code>colspan="2"</code> (2 marks).</li>
      <li>The fifth body row needs to contain two extra <code>&lt;th&gt;</code> elements at the start, containing "Jovian planets" and "Gas giants" respectively. The former needs <code>rowspan="4"</code>, and the latter needs <code>rowspan="2"</code> (3 marks).</li>
      <li>The seventh body row needs to contain an extra <code>&lt;th&gt;</code> element at the start, containing "Ice giants", with <code>rowspan="2"</code> (2 marks).</li>
      <li>The ninth body row needs to contain an extra <code>&lt;th&gt;</code> element at the start, containing "Dwarf planets", with <code>colspan="2"</code> (2 marks).</li>
    </ul>
  </dd>
  <dt>Add attributes to make the row and column headers unambiguously associated with the rows, columns, or rowgroups that they act as headings for (5 marks).</dt>
  <dd>
    The student needs to add the <code>scope</code> value to all the <code>&lt;th&gt;</code> elements, giving them appropriate values as shown below:
    <ul>
      <li><code>col</code>: All the <code>&lt;th&gt;</code> elements in the table header row.</li>
      <li><code>row</code>: All the <code>&lt;th&gt;</code> elements containing planet names, and the one containing "Dwarf planets" (it is also a heading over only one row).</li>
      <li><code>rowgroup</code>: The <code>&lt;th&gt;</code> elements containing "Terrestrial planets", "Jovian planets", "Gas giants", and "Ice giants".</li>
    </ul>
  </dd>
  <dt>Add a black border just around the column that contains all the planet name row headers (4 marks).</dt>
  <dd>The easiest way to do this is to:
    <ol>
      <li>Add a <code>&lt;colgroup&gt;</code> element just below the <code>&lt;caption&gt;</code> element.</li>
      <li>Inside this, nest two <code>&lt;col&gt;</code> elements, one with a <code>span="2"</code> attribute, and the other with a <code>style</code> attribute along the lines of <code>style="border: 2px solid black"</code>.</li>
      <li>Notes: It would be acceptable to define all the columns in the table inside the colgroup, although you don't need to. Adding the style to each cell in the column individual would not be acceptable — this would put the styling around every cell in the column, not the column.</li>
    </ol>
  </dd>
</dl>
