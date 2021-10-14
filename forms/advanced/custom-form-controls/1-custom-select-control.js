NodeList.prototype.forEach = function (callback) {
    Array.prototype.forEach.call(this, callback);
}

// This function updates the displayed value and synchronizes it with the native control.
// It takes two parameters:
// select : the DOM node with the class `select` containing the value to update
// index  : the index of the value to be selected
function updateValue(select, index) {
    // We need to get the native control for the given custom control
    // In our example, that native control is a sibling of the custom control
    const nativeWidget = select.previousElementSibling;

    // We also need  to get the value placeholder of our custom control
    const value = select.querySelector('.value');

    // And we need the whole list of options
    const optionList = select.querySelectorAll('.option');

    // We set the selected index to the index of our choice
    nativeWidget.selectedIndex = index;

    // We update the value placeholder accordingly
    value.innerHTML = optionList[index].innerHTML;

    // And we highlight the corresponding option of our custom control
    highlightOption(select, optionList[index]);
}

// This function returns the current selected index in the native control
// It takes one parameter:
// select : the DOM node with the class `select` related to the native control
function getIndex(select) {
    // We need to access the native control for the given custom control
    // In our example, that native control is a sibling of the custom control
    const nativeWidget = select.previousElementSibling;

    return nativeWidget.selectedIndex;
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

window.addEventListener('load', () => {
    const selectList = document.querySelectorAll('.select');

    // Each custom control needs to be initialized
    selectList.forEach((select) => {
        const optionList = select.querySelectorAll('.option');
        const selectedIndex = getIndex(select);

        // We make our custom control focusable
        select.tabIndex = 0;

        // We make the native control no longer focusable
        select.previousElementSibling.tabIndex = -1;

        // We make sure that the default selected value is correctly displayed
        updateValue(select, selectedIndex);

        // Each time a user clicks on an option, we update the value accordingly
        optionList.forEach((option, index) => {
            option.addEventListener('click', () => {
                updateValue(select, index);
            });
        });

        // Each time a user uses their keyboard on a focused control, we update the value accordingly
        select.addEventListener('keyup', (event) => {
            let length = optionList.length;
            let index = getIndex(select);

            // When the user hits the down arrow, we jump to the next option
            if (event.keyCode === 40 && index < length - 1) index++;

            // When the user hits the up arrow, we jump to the previous option
            if (event.keyCode === 38 && index > 0) index--;

            updateValue(select, index);
        });
    });
});