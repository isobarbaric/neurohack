// Get references to the elements
const liveVideo = document.getElementById("liveVideo");
const recordedVideo = document.getElementById("recordedVideo");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const replayButton = document.getElementById("replayButton");
const retakeButton = document.getElementById("retakeButton");
const backButton = document.getElementById("backButton");
const videoTakingInterface = document.getElementById("videoTakingInterface");
const videoReplayInterface = document.getElementById("videoReplayInterface");

let mediaRecorder;
let recordedChunks = [];

// Function to start recording
async function startRecording() {
  try {
    // Access the user's webcam
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    liveVideo.srcObject = stream;

    // Initialize the MediaRecorder
    mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    // Event handler for when data is available
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    // Event handler for when recording stops
    mediaRecorder.onstop = () => {
      // Create a blob from the recorded chunks
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      recordedVideo.src = URL.createObjectURL(blob);

      // Show the "Replay Video" and "Retake Video" buttons
      replayButton.style.display = "inline-block";
      retakeButton.style.display = "inline-block";
    };

    // Start recording
    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
  } catch (error) {
    console.error("Error accessing webcam:", error);
    alert("Error accessing webcam. Please ensure you have granted permission.");
  }
}

// Function to stop recording
function stopRecording() {
  mediaRecorder.stop();
  startButton.disabled = false;
  stopButton.disabled = true;

  // Stop all tracks in the stream
  const stream = liveVideo.srcObject;
  stream.getTracks().forEach((track) => track.stop());
  liveVideo.srcObject = null;
}

// Function to switch to the video replay interface
function replayVideo() {
  videoTakingInterface.style.display = "none";
  videoReplayInterface.style.display = "block";
  recordedVideo.play();
}

// Function to switch back to the video-taking interface and reset to initial state
function retakeVideo() {
    videoReplayInterface.style.display = "none";
    videoTakingInterface.style.display = "block";
  
    // Reset the recorded video
    recordedVideo.src = "";
    recordedChunks = [];
  
    // Hide the "Replay Video" and "Retake Video" buttons
    replayButton.style.display = "none";
    retakeButton.style.display = "none";
  
    // Reset the "Start Recording" and "Stop Recording" buttons to their initial state
    startButton.disabled = false;
    stopButton.disabled = true;
  
    // Clear the live video feed (optional, if you want to restart the webcam feed)
    if (liveVideo.srcObject) {
      liveVideo.srcObject.getTracks().forEach(track => track.stop());
      liveVideo.srcObject = null;
    }
  }

// Function to go back to the video-taking interface from the replay interface
function backToRecording() {
  videoReplayInterface.style.display = "none";
  videoTakingInterface.style.display = "block";
}

// Add event listeners to the buttons
startButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
replayButton.addEventListener("click", replayVideo);
retakeButton.addEventListener("click", retakeVideo);
backButton.addEventListener("click", backToRecording);
