// Because we want to access DOM nodes, we initialize our script at page load.
window.addEventListener('load', () => {
    
    // These variables are used to store the form data
    const theText = document.getElementById('theText');
    const theFile = {
        dom    : document.getElementById('theFile'),
        binary : null
    };

    // Use the FileReader API to access file content
    const fileReader = new FileReader();

    // Because FileReader is asynchronous, store its result when it finishes to read the file
    fileReader.addEventListener('load', () => {
        theFile.binary = fileReader.result;
    });

    // At page load, if a file is already selected, read it.
    if (theFile.dom.files[0]) {
        fileReader.readAsBinaryString(theFile.dom.files[0]);
    }

    // If not, read the file once the user selects it.
    theFile.dom.addEventListener('change', () => {
        if (fileReader.readyState === FileReader.LOADING) {
            fileReader.abort();
        }
        fileReader.readAsBinaryString(theFile.dom.files[0]);
    });

    // sendData is our main function
    function sendData() {
        // If there is a selected file, wait it is read.
        // If there is not, delay the execution of the function.
        if (!theFile.binary && thefile.dom.files.length > 0) {
            setTimeout(sendData, 10);
            return;
        }

        // To construct our multipart form data request, we need an XMLHttpRequest instance.
        const httpRequest = new XMLHttpRequest();

        // We need a separator to define each part of the request
        const separator = 'blob';

        // Store our body request in a string.
        let requestBody = '';

        // So, if the user has selected a file
        if (theFile.dom.files[0]) {
            // Start a new part in our body's request
            requestBody += '--' + separator + '\r\n';
            // Describe it as form data
            requestBody += 
                // Describe it as form data
                'content-disposition: form-data;'  + 
                // Define the name of the form data
                'name="' + theFile.dom.name + '";' +
                // Provide the real name of the file
                'filename="' + theFile.dom.files[0].name + '"\r\n';
            // And the MIME type of the file
            requestBody += 'Content-Type: ' + theFile.dom.files[0].type + '\r\n';
            // There's a blank line between the metadata and the data
            requestBody += '\r\n';
            // Append the binary data to our body's request
            requestBody += theFile.binary + '\r\n';
        }

        // Text data is simpler
        // Start a new part in our body's request
        requestBody += '--' + separator + '\r\n';

        // Say it's form data, and name it
        requestBody += 'content-disposition: form-data; name="' + theText.name + '\r\n';
        // There's a blank line between the metadata and the data
        requestBody += '\r\n';

        // Append the text data to our body's request
        requestBody += theText.value + '\r\n';

        // Once we are done, "close" the body's request
        requestBody += '--' + separator + '--';

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

        // Add the required HTTP header to handle a multipart form data POST request
        httpRequest.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + separator);

        // And finally, send our data.
        httpRequest.send(requestBody);
    }

    // Access our form...
    const theForm = document.getElementById('theForm');

    // ...to take over the submit event
    theForm.addEventListener('submit', (event) => {
        event.preventDefault();
        sendData();
    });
});