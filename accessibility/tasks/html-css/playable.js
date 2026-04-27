var section = document.querySelector('section');
var editable = document.querySelector('.editable');
var textareaHTML = document.querySelector('.playable-html');
var textareaCSS = document.querySelector('.playable-css');
var reset = document.getElementById('reset');
var htmlCode = textareaHTML.value;
var cssCode = textareaCSS.value;

function fillCode() {
    editable.textContent = textareaCSS.value;
    section.replaceChildren(...parseToHtml(textareaHTML.value));
}
function parseToHtml(string) {
  try {
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(string, "text/html");
    const nodes = Array.from(parsedHTML.body.childNodes);

    return nodes.filter(n => n.tagName !== "SCRIPT");

  } catch (error) {
    console.log("Error While Parsing HTML: ", error);
    return [];
  }
}
reset.addEventListener('click', function () {
    textareaHTML.value = htmlCode;
    textareaCSS.value = cssCode;
    fillCode();
});

textareaHTML.addEventListener('input', fillCode);
textareaCSS.addEventListener('input', fillCode);
window.addEventListener('load', fillCode);