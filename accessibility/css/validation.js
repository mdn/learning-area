const inputs = document.querySelectorAll('input');
const labels = document.querySelectorAll('label');
const form = document.querySelector('form');

let formItems = [];

const errorField = document.querySelector('.errors');
const errorList = document.querySelector('.errors ul');

for(let i = 0; i < inputs.length-1; i++) {
  let obj = {};
  obj.label = labels[i];
  obj.input = inputs[i];
  formItems.push(obj);
}

errorField.style.left = '-100%';

form.onsubmit = validate;

function validate(e) {
  errorList.innerHTML = '';
  for(let i = 0; i < formItems.length; i++) {
    let testItem = formItems[i];
    if(testItem.input.value === '') {
      errorField.style.left = '360px';
      createLink(testItem);
    }
  }

  if(errorList.innerHTML !== '') {
    e.preventDefault();
  }
}

function createLink(testItem) {
  const listItem = document.createElement('li');
  const anchor = document.createElement('a');
  anchor.textContent = testItem.input.name + ' field is empty: fill in your ' + testItem.input.name + '.';
  anchor.href = '#' + testItem.input.name;
  anchor.onclick = function(e) {
    testItem.input.focus();
    // Prevent the browser to follow the link.
    // In some browsers (e.g. firefox) following the link breaks the functionality
    e.preventDefault()
    // one more step to insure that the browser will not
    // follow the link and will not propagate
    return false;
  };
  listItem.appendChild(anchor);
  errorList.appendChild(listItem);
}
