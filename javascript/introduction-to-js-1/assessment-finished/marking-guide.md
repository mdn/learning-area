# Marking guide for "Silly story generator"
The following guide outlines a marking guide for the MDN Learning Area JavaScript Topic — [Silly story generator](https://developer.mozilla.org/en-US/Learn/JavaScript/First_steps/Silly_story_generator). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clear cut.

The overall mark awarded is out of 39. Work out their final mark, and then divide by 39 and multiply by 100 to give a percentage mark. For reference, you can find a [finished program](main.js) that would be awarded top marks.

## Basic setup

<dl>
<dt>Create <code>main.js</code></dt>
<dd>One mark for this; it is pretty simple.</dd>
<dt>Apply the external JS file to your HTML</dt>
<dd>One mark for this too.</dd>
</dl>

## Initial variables and functions

<dl>
<dt>Copy the code from section 1 of the raw text file into <code>main.js</code>.</dt>
<dd>One mark for this.</dd>
<dt>Store the big long text string inside a variable called <code>storyText</code>.</dt>
<dd>One mark for this — creating a simple variable and storing a string inside it is not complex.</dd>
<dt>Store the three sets of strings inside three arrays called <code>insertX</code>, <code>insertY</code>, and <code>insertZ</code>.</dt>
<dd>6 marks for this — 2 for each array. Creating an array of strings is not quite as simple as a string variable.</dd>
</dl>

## Placing the event handler and incomplete function
Only one mark for this bit — it's just more simple copy and paste.

## Completing the result() function

<dl>
<dt>Create a new variable called <code>newStory</code>, and set it's value to equal <code>storyText</code>.</dt>
<dd>One mark for this — another simple variable definition.</dd>
<dt>Create three new variables called <code>xItem</code>, <code>yItem</code>, and <code>zItem</code>...</dt>
<dd>6 marks for this, 2 for each correct definition. For each one they basically have to initialise the new variable, and declare it's value as the corresponding array passed to the <code>randomValueFromArray()</code> function. So for example, <code>const xItem = randomValueFromArray(insertX);</code>.</dd>
<dt>Next we want to replace the three placeholders in the newStory string...</dt>
<dd>8 marks, two for each of the four lines needed. For each of these lines, we need to call the <code>replace()</code> string method on <code>newStory</code>, giving it as parameters the placeholder first of all (e.g. <code>'insertx:'</code>), and then the variable value to replace the placeholder with (e.g. <code>xItem</code>). We need to store the result of that method call in <code>newStory</code>, so the result of each line is that <code>newStory</code> will be made equal to itself, but with some substitutions made. An example correct line is <code>newStory = newStory.replace(':insertx:',xItem);</code>. As an extra stipulation, the <code>xItem</code> line needs to be called twice, as using <code>replace()</code> like this only replaces the first instance of the matched substring. If you use an appropriate regular expression (see later on) then it'll match both instances.</dd>
<dt>Inside the second <code>if</code> block, we are checking to see if the <code>uk</code> radio button has been selected...</dt>
<dd>There are four parts to this question. Let's go through each one in turn:
  <ul>
    <li>Four marks for this, 2 for each formula. The two required formulae are <code>pounds x 0.0714286 = stone</code> and <code>(Fahrenheit - 32) * (5 / 9) = centigrade. </code></li>
    <li>Two marks for this. They need to replace <code>300</code> with <code>300*0.0714286</code>, and then concatenate <code>' stone'</code> onto the end of the whole line, so in total, the value of <code>weight</code> is <code>Math.round(300*0.0714286) + ' stone'</code>.</li>
    <li>Two marks for this. They need to replace <code>94</code> with <code>(94-32) * 5 / 9</code>, and then concatenate <code>' centigrade'</code> onto the end of the whole line, so in total, the value of <code>temperature</code> is <code>Math.round((94-32) * 5 / 9) + ' centigrade'</code>.</li>
    <li>Four marks in total for these; they are just the same as the other <code>replace()</code> lines that came before them. For these two lines we need <code>newStory = newStory.replace('94 fahrenheit',temperature);</code> and
    <code>newStory = newStory.replace('300 pounds',weight);</code></li>
  </ul>
</dd>
<dt>Finally, in the second-to-last line of the function, make the <code>textContent</code> property of the <code>story</code> variable...</dt>
<dd>One mark for this, as it's pretty easy; just add the <code>newStory</code> variable into the line — <code>story.textContent = newStory;</code>.</dd>
</dl>
