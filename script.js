function generateText() {
    // Get the element where the generated text will be displayed
    const displayText = document.getElementById('displayText');
    // Retrieve the text from the textarea
    const textInput = document.getElementById('textInput').value;
    // Retrieve the word count from the input field
    let wordCountInput = document.getElementById('wordCount').value;
    // Get the error message element
    const errorElement = document.getElementById('error');

    // Clear previous error message
    errorElement.classList.add('d-none');
    errorElement.innerText = '';

    // Check if text input is empty
    if (textInput.trim() === '') {
        errorElement.classList.remove('d-none');
        errorElement.innerText = 'Please enter some text before generating.';
        displayText.innerText = ''; // Clear previous output
        return; // Exit the function if text input is empty
    }

    // Calculate the number of words in the input text
    const inputWordCount = textInput.trim().split(/\s+/).length;

    // Check for negative word count input
    if (wordCountInput < 0) {
        errorElement.classList.remove('d-none');
        errorElement.innerText = 'The number of words cannot be negative. Please enter a positive number.';
        displayText.innerText = ''; // Clear previous output
        return; // Exit the function if input is negative
    }

    // Set the total length to the user input or default to 20 if no input
    let totalLength = wordCountInput ? parseInt(wordCountInput) : 20;

    // Ensure the word count input is greater than or equal to input words
    if (totalLength < inputWordCount) {
        errorElement.classList.remove('d-none');
        errorElement.innerText = 'The total number of words cannot be less than the number of words in the input text. Please enter a larger number.';
    }

    // Calculate the number of words needed to generate
    const len = totalLength - inputWordCount;

    // If the requested length is equal to the input length, directly display the input text
    if (len === 0) {
        displayText.innerText = textInput;
        return; // Exit the function
    }

    // Check if the requested length is shorter than the input length
    if (len < 0) {
        errorElement.classList.remove('d-none');
        errorElement.innerText = 'The requested length cannot be shorter than the input text. Please enter a larger number.';
        displayText.innerText = ''; // Clear previous output
        return; // Exit the function if the requested length is shorter than the input length
    }

    // Clear the display text if the requested length is shorter than the input text
    displayText.innerText = '';

    // Create the data object to be sent in the POST request
    const postData = {
        start: textInput,
        len: len
    };

    // Send a POST request to the server
    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.text())
    .then(data => {
        // Display the generated text in the designated area
        displayText.innerText = `${textInput} ${data}`; // Concatenate input and output text
    })
    .catch(error => {
        // Handle errors if any
        console.error('Error:', error);
        displayText.innerText = 'An error occurred while processing your request.';
    });
}

function clearText() {
    // Clear the text input, word count input, display area, and error message
    document.getElementById('textInput').value = '';
    document.getElementById('wordCount').value = '';
    document.getElementById('displayText').innerText = '';
    document.getElementById('error').classList.add('d-none');
}


