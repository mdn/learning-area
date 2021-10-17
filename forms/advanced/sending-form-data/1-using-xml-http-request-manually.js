const btn = document.querySelector('button');

function sendData(data) {
    console.log('Sending Data');

    const httpRequest = new XMLHttpRequest();

    let urlEncodedData = '';
    let urlEncodedDataPairs = [];
    let name;

    // Turn the data object into an array of URL-encoded key/value pairs.
    for(name in data) {
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }

    // Combine the pairs into a single string and replace all %-encoded spaces to
    // the '+' character; matches the behavior of browser form submissions.
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    // Define what happens on successful data submission
    httpRequest.addEventListener('load', () => {
        alert('Yeah! Data sent and response loaded.');
    });

    // Define what happens in case of error
    httpRequest.addEventListener('error', () => {
        alert('Oops! Something went wrong.');
    });

    // Set up our request
    httpRequest.open('POST', 'https://example.com/cors.php');

    // Add the required HTTP header for form data POST requests
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Finally, send our data.
    httpRequest.send(urlEncodedData);
}

btn.addEventListener('click', () => {
    sendData({test:'ok'});
});