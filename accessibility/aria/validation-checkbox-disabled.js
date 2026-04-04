const inputs = document.querySelectorAll('input');
const labels = document.querySelectorAll('label');
const form = document.querySelector('form');

let formItems = [];

const errorField = document.querySelector('.errors');
const errorList = document.querySelector('.errors ul');

let checkbox;
let checkboxLabel;

const hiddenAlert = document.querySelector('.hidden-alert');

for(let i = 0; i < inputs.length-1; i++) {
  if(inputs[i].type !== 'checkbox') {
    let obj = {};
    obj.label = labels[i];
    obj.input = inputs[i];
    formItems.push(obj);
  } else {
    checkbox = inputs[i];
    checkboxLabel = labels[i];
  }
}

errorField.style.left = '-100%';

toggleMusician(false);

form.onsubmit = validate;

function validate(e) {
  errorList.innerHTML = '';
  for(let i = 0; i < formItems.length; i++) {
    let testItem = formItems[i];
    if(testItem.input.value === '' && testItem.input.disabled === false) {
      errorField.style.left = '390px';
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
  anchor.onclick = function() {
    testItem.input.focus();
  };
  listItem.appendChild(anchor);
  errorList.appendChild(listItem);
}

checkbox.onchange = function() {
  if(checkbox.checked) {
    toggleMusician(true);
  } else {
    toggleMusician(false);
  }
};

function toggleMusician(bool) {
  let instruItem = formItems[formItems.length-1];
  if(bool) {
    instruItem.input.disabled = false;
    instruItem.label.style.color = '#000';
    instruItem.input.setAttribute('aria-disabled', 'false');
    hiddenAlert.textContent = 'Instruments played field now enabled; use it to tell us what you play.';
  } else {
    instruItem.input.disabled = true;
    instruItem.label.style.color = '#999';
    instruItem.input.setAttribute('aria-disabled', 'true');
    hiddenAlert.textContent = 'Instruments played field now disabled.';
  }
}
