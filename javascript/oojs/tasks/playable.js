var section = document.querySelector('section');
var editable = document.querySelector('.editable');
var textareaJS = document.querySelector('.playable-js');
var reset = document.getElementById('reset');
var jsCode = textareaJS.value;

function fillCode() {
    editable.textContent = textareaJS.value;
    section.innerHTML = ' ';
    try {
      eval(editable.textContent);
    } catch(e) {
      let para = document.createElement('p');
      para.textContent = e;
      section.appendChild(para);
    }
}

reset.addEventListener('click', function () {
    textareaJS.value = jsCode;
    fillCode();
});

textareaJS.addEventListener('input', fillCode);
window.addEventListener('load', fillCode);
