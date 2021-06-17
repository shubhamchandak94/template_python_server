var backend_address = 'http://localhost:5000/';

document.getElementById('substrSubmit').onclick = function() {
             
    let string = document.getElementById('string');
    let start = document.getElementById('start');   
    let end = document.getElementById('end');   

    let result = document.getElementById('result');
    let error_message = document.getElementById('error_message');
    result.innerHTML = '';
    error_message.innerHTML = '';

    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = backend_address+'substring';

    // open a connection
    xhr.open("POST", url);

    // // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Print received data from server
                result.innerHTML = JSON.parse(this.responseText).substring;
            } else {
                // Print error
                if (JSON.parse(this.responseText).message)
                    error_message.innerHTML = JSON.parse(this.responseText).message;
                else
                    error_message.innerHTML = this.responseText;
            }
        } 
    };

    // Converting JSON data to string
    var data = JSON.stringify({ "string": string.value, "start": start.value, "end": end.value });
    console.log(data);
    // Sending data with the request
    xhr.send(data);
}

function getVersion() {
    let version = document.getElementById('version');
    let url = backend_address+'version';
    // Creating a XHR object
    let xhr = new XMLHttpRequest();

    // open a connection
    xhr.open("GET", url);
    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Print received data from server
                version.innerHTML = JSON.parse(this.responseText).version;
            } else {
                // Print error
                version.innerHTML = 'Can\'t get version';
            }
        } 
    };
    // Sending request
    xhr.send();    
}

getVersion(); // call getVersion to display the version