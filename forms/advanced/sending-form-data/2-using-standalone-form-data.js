const btn = document.querySelector('button');

function sendData(data) {
    const httpRequest = new XMLHttpRequest();
    const formData = new FormData();

    // Push our data into our FormData object
    for(name in data) {
        formData.append(name, data[name]);
    }

    // Define what happens on successful data submission
    httpRequest.addEventListener('load', () => {
        alert('Yeah! Datasentand response loaded.');
    });

    // Define what happens in case of error
    httpRequest.addEventListener('error', () => {
        alert('Oops! Something went wrong.');
    });

    // Set up our request
    httpRequest.open('POST', 'https://example.com/cors.php');

    // Send our FormData object; HTTP headers are set automatically
    httpRequest.send(formData);
}

btn.addEventListener('click', () => {
    sendData({text: 'ok'});
});