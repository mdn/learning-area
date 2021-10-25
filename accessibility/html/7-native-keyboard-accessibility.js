const buttons = document.querySelectorAll('button');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
        alert(event.target.getAttribute('data-message'));
    });
}