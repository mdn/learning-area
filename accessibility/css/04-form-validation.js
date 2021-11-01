const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const labels = document.querySelectorAll('label');

let formItems = [];

const errorField = document.querySelector('.errors');
const errorList = document.querySelector('.errors ul');

function createLink(testItem) {
    const listItem = document.createElement('li');
    const acnhor = document.createElement('a');

    acnhor.textContent = `${testItem.input.name} field is empty: fill in your ${testItem.input.name}.`;
    acnhor.href = `#${testItem.input.name}`;
    acnhor.onclick = () => {
        testItem.input.focus();
    };

    listItem.appendChild(acnhor);
    errorList.appendChild(listItem);
}

function validate(e) {
    errorList.innerHTML = '';
    
    for (let i = 0; i < formItems.length; i++) {
        let testItem = formItems[i];
        if (testItem.input.value === '') {
            errorField.style.left = '360px';
            createLink(testItem);
        }
    }

    if (errorList.innerHTML !== '') {
        e.preventDefault();
    }
}

for (let i = 0; i < labels.length; i++) {
    let obj = {};
    
    obj.label = labels[i];
    obj.input = inputs[i];

    formItems.push(obj);
}

console.log(formItems);

errorField.style.left = '-100%';

form.onsubmit = validate;