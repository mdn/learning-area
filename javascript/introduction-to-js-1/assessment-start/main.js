const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

let storyText = `It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.`
const insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
const insertY = ['the soup kitchen', 'Disneyland', 'the White House'];
const insertZ = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];


randomize.addEventListener('click', result);

function result() {

  if(customName.value !== '') {
    const name = customName.value;
    newStory.replace('Bob', name);
  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300 / 14);
    console.log(newStory.replace('300 pounds', weight + "stone"));
    const temperature =  Math.round(94 - 32 * .5556);
    console.log(newStory.replace('94 Fahrenheit', temperature + "centigrade"));
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}

let newStory = storyText;
let xItem = randomValueFromArray(insertX);
let yItem = randomValueFromArray(insertY);
let zItem = randomValueFromArray(insertZ);


newStory.replaceAll(':insertx:',xItem);
console.log(newStory);
newStory.replace(':inserty:',yItem);
console.log(newStory);
newStory.replace(':insertz:',zItem);
console.log(newStory);

