document.getElementById('file-upload').addEventListener('change', async function(event) {
    const file = event.target.files[0];  // Get the selected file
    if (!file) return;  // If no file is selected, return

    // Create FormData to send file
    const formData = new FormData();
    formData.append("file", file);

    try {
        // Send the file to FastAPI backend (ensure correct port)
        const response = await fetch('http://127.0.0.1:8080/upload', { 
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            const fileUrl = result.file_url;  // Backend response
            const audioUrl = result.audio_url;

            // Redirect to audio.html with file and audio URLs
            window.location.href = `audio.html?file_url=${encodeURIComponent(fileUrl)}&audio_url=${encodeURIComponent(audioUrl)}`;
        } else {
            alert('File upload failed.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading the file.');
    }
});
