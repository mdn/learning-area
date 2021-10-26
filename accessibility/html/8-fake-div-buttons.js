const buttons = document.querySelectorAll('div');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
        alert(event.target.getAttribute('data-message'));
    });
}

// document.addEventListener('onkeydown', (event) => {
//     if (event.keyCode === 13) {
//         document.activeElement.onclick(event);
//     }
// });

document.onkeydown = function(event) {
    // console.log(event.key);
    if (event.key === 'Enter') {
        console.log('click');
        document.activeElement.click(event);
    }
};