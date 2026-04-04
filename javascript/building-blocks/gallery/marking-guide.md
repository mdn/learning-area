# Marking guide for "Image gallery"
The following guide outlines a marking guide for the MDN Learning Area JavaScript Topic — [Image gallery](https://developer.mozilla.org/en-US/Learn/JavaScript/Building_blocks/Image_gallery). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clear cut.

The overall mark awarded is out of 22. Work out their final mark, and then divide by 21 and multiply by 100 to give a percentage mark. For reference, you can find a [finished program](main.js) that would be awarded top marks.

## Declaring the array of filenames

1. **Declaring a constant that holds the names of image files**: One mark for this. It should be an array of strings, where each string is the name of one of the image files, such as `'pic1.jpg'`. It should be declared using `const`.

## Looping through the images

1. **Creating the loop**: Four marks for this — the actual solution is fairy simple, but there are a few details to get right (any suitable loop type can be used):
    * The initializer should start at 1, and the loop should iterate until a value of 5. This is useful, as the first image has the number 1 in its filename, then 2, 3, etc.
    * The iterator should add 1 to the initializer after each iteration.

2. **Building the image path for each loop iteration<**: Three marks for this. The student basically just needs to replace the `xxx` placeholder with a template literal that will use the initializer to build the image path in each case. The pattern we need is this: `images/pic${i}.jpg`.

## Adding an click event listener to each thumbnail image

1. **Find the value of the src attribute of the current image.**: Four marks for this. An anonymous function would make most sense:

  ```js
  newImage.addEventListener('click', e => displayedImage.src = e.target.src);
  ```

## Writing a handler that runs the darken/lighten button

1. **Adding an onclick handler**: Two marks; the `<button>` is referenced in the `btn` constant, so the handler will need to look something like `btn.addEventListener('click', () => {`. In this case, invoking a named function would also be ok, e.g. `btn.addEventListener('click', myFunction);`

2. **Checking the current class name set on the `<button>` element**: Two marks; this again uses `getAttribute()`, and you just need to run this on the `btn` constant — `const btnClass = btn.getAttribute('class');`

3. **The conditional statement**: Six marks for this. It is not that complex, but there is a fair bit of work to do here. The conditional statement just needs to look like this:

  ```js
  if (btnClass === 'dark') {
    /* ... */  
  } else {
    /* ... */
  }
  ```

  Then the student needs to grab the three lines provided in the assessment text, and modify it to set the things that are needed in each state. So a finished event handler could look something like this:

  ```js
  btn.addEventListener('click', () => {
    const btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') {
      btn.setAttribute('class','light');
      btn.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
      btn.setAttribute('class','dark');
      btn.textContent = 'Darken';
      overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
  });
  ```
