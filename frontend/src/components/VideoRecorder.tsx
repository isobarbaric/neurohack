function VideoRecorder() {
  return (
    <div className="container">
      <h1>Video - Please do as the instructions say</h1>
      <p className="instructions">
        Click "Start Recording" to begin recording using your webcam. Click
        "Stop Recording" when you're done. You can replay or retake the video
        after recording.
      </p>

      <div id="videoTakingInterface">
        <div className="video-container">
		  {/*<video id="liveVideo" autoplay muted></video>*/}
        </div>
        <div className="controls">
          <button id="startButton">Start Recording</button>
          <button id="stopButton" disabled>
            Stop Recording
          </button>
          <button id="replayButton" className="hidden">
            Replay Video
          </button>
          <button id="retakeButton" className="hidden">
            Retake Video
          </button>
        </div>
      </div>

      <div id="videoReplayInterface" className="hidden">
        <div className="video-container">
          <video id="recordedVideo" controls></video>
        </div>
        <div className="controls">
          <button id="backButton">Back to Recording</button>
        </div>
      </div>
    </div>
  );
}

export default VideoRecorder;
