window.addEventListener('load', () => {
    // Access the form element...
    const form = document.getElementById('myForm');

    function sendData() {
        const httpRequest = new XMLHttpRequest();

        // Bind the FormData object and the form element
        const formData = new FormData(form);

        // Define what happens on successful data submission
        httpRequest.addEventListener('load', (event) => {
            alert(event.target.responseText);
        });

        // Define what happens in case of error
        httpRequest.addEventListener('error', (event) => {
            alert('Oops! Something went wrong.');
            console.error(event.target);
        })

        // Set up our request
        httpRequest.open('POST', 'https://example.com/cors.php');

        // The data sent is what the user provided in the form
        httpRequest.send(formData);
    }

    // ...and take over its submit event.
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        sendData();
    });
});