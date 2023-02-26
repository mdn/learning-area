const randomit = document.querySelector(".randomit");

const enterName = document.getElementById("enterName");

const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

const storyText =
  "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

const insertX = [
  "David the Handsom",
  "Charles the Brave",
  "Honda the baseball hero",
];

const insertY = ["Dark place", "Humid forest", "Swamp of sexy girls"];

const insertZ = [
  "running like a Wild horse even they",
  "slowly moving like a snail eating an ice cream that",
  "walking while their footstep smoke in dust even",
];

//when click it provides the result
randomit.addEventListener("click", result);

function result() {
  let newStory = storyText;

  //For each one they basically have to initialise the new variable, and declare it's value as the corresponding array passed to the randomValueFromArray() function
  const xItem = randomValueFromArray(insertX);

  const yItem = randomValueFromArray(insertY);

  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replaceAll(":insertx:", xItem); //replace the placeholder with xItem

  newStory = newStory.replaceAll(":inserty:", yItem); //replace the placeholder with yItem

  newStory = newStory.replaceAll(":insertz:", zItem); //replace the placeholder with zItem

  //this line needs to be called twice if values is called
  if (enterName.value !== "") {
    const name = enterName.value;
    newStory = newStory.replaceAll("Bob", name);
  }

  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(300 * 0.0714286)} stone`;
    const temperature = `${Math.round(((94 - 32) * 5) / 9)} centigrade`;
    newStory = newStory.replaceAll("94 fahrenheit", temperature); //replace the 94 fahrenheit with temperature value
    newStory = newStory.replaceAll("300 pounds", weight); //replace the 300 pounds with weight value
  }

  story.textContent = newStory; //Return the text content of an element
  story.style.visibility = "visible"; //visibility property sets or returns whether an element should be visible
}
