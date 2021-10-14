NodeList.prototype.forEach = function (callback) {
    Array.prototype.forEach.call(this, callback);
}

// This function will be used each time we want to deactivate a custom control
// It takes one parameter
// select : the DOM node with the `select` class to deactivate
function deactivateSelect(select) {
    
    // If the control is not active there is nothing to do
    if (!select.classList.contains('active')) return;

    // We need to get the list of options for the custom control
    const optList = select.querySelector('.optList');

    // We close the list of option
    optList.classList.add('hidden');

    // and we deactivate the custom control itself
    select.classList.remove('active');
}

// This function will be used each time the user wants to (de)activate the control
// It takes two parameters:
// select : the DOM node with the `select` class to activate
// selectList : the list of all the DOM nodes with the `select` class
function activeSelect(select, selectList) {

    // If the control is already active there is nothing to do
    if (select.classList.contains('active')) return;

    // We have to turn off the active state on all custom controls
    // Because the deactivateSelect function fulfills all the requirements of the
    // forEach callback function, we use it directly without using an intermediate
    // anonymous function.
    selectList.forEach(deactivateSelect);

    // And we turn on the active state for this specific control
    select.classList.add('active');
}

// This function will be used each time the user wants to open/closed the list of options
// It takes one parameter:
// select : the DOM node with the list to toggle
function toggleOptList(select) {
    // The list is kept from the control
    const optList = select.querySelector('.optList');

    // We change the class of the list to show/hide it
    optList.classList.toggle('hidden');
}

// This function will be used each time we need to highlight an option
// It takes two parameters:
// select : the DOM node with the `select` class containing the option to highlight
// option : the DOM node with the `option` class to highlight
function highlightOption(select, option) {

    // We get the list of all option available for our custom select element
    const optionList = select.querySelectorAll('.option');

    // We remove the highlight from all options
    optionList.forEach((other) => {
        other.classList.remove('highlight');
    });

    // We highlight the right option
    option.classList.add('highlight');
}

// We handle the event binding when the document is loaded.
window.addEventListener('load', () => {
    document.body.classList.remove('no-widget');
    document.body.classList.add('widget');
});

window.addEventListener('load', () => {
    const selectList = document.querySelectorAll('.select');

    // Each custom control needs to be initialized
    selectList.forEach((select) => {

        // as well as all its `option` elements
        const optionList = select.querySelectorAll('.option');

        // Each time a user hovers their mouse over an option, we highlight the given option
        optionList.forEach((option) => {
            option.addEventListener('mouseover', () => {
                // Note: the `select` and `option` variable are closures available in the scope of our function call.
                highlightOption(select, option);
            });
        });

        // Each times the user clicks on or taps a custom select element
        select.addEventListener('click', () => {
            // Note: the `select` variable is a closure available in the scope of our function call.

            // We toggle the visibility of the list of options
            toggleOptList(select);
        });

        // In case the control gains focus
        // The control gains the focus each time the user clicks on it or each time
        // they use the tabulation key to access the control
        select.addEventListener('focus', () => {
            // Note: the `select` and `selectList` variable are closures available in the scope of our function call.

            // We activate the control
            activeSelect(select, selectList);
        });

        // In case the control loses focus
        select.addEventListener('blur', () => {
            // Note: the `select` variable is a closure available in the scope of our function call.

            // We deactivate the control
            deactivateSelect(select);
        });

        // Loose focus if the user hits `esc`
        select.addEventListener('keyup', (event) => {

            // deactivate on keyup of `esc`
            if (event.keyCode === 27) {
                deactivateSelect(select);
            }
        });
    });
});