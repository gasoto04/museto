document.getElementById('uploadButton').addEventListener('click', function() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (!file) {
        alert("Please select a file before clicking 'Upload'");
        return;
    }

    var formData = new FormData();
    formData.append('file', file);

    // Assuming you have a server endpoint to handle the file upload
    fetch('YOUR_SERVER_ENDPOINT', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('File uploaded successfully');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('File upload failed');
    });
});
