import React, { useState, useRef, useEffect } from 'react';
 // Already imported the AppLayoutCSS in main.tsx

const Recorder: React.FC = () => {
  // State variables
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(0);
  const [recordingTimer, setRecordingTimer] = useState<number>(0);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const countdownRef = useRef<number | null>(null);
  const recordingTimerRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioURL(audioURL);
        audioChunksRef.current = [];
      };

      // Start countdown
      setCountdown(3);
      countdownRef.current = window.setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // Start recording after countdown
      setTimeout(() => {
        if (countdownRef.current) {
          clearInterval(countdownRef.current);
        }
        setCountdown(0);
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.start();
        }
        setIsRecording(true);

        // Start recording timer
        setRecordingTimer(10);
        recordingTimerRef.current = window.setInterval(() => {
          setRecordingTimer((prev) => prev - 1);
        }, 1000);

        // Stop recording after 10 seconds
        setTimeout(() => {
          stopRecording();
        }, 10000);
      }, 3000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      setRecordingTimer(0);
    }
  };

  const handleDownload = () => {
    if (audioURL) {
      const a = document.createElement('a');
      a.href = audioURL;
      a.download = 'recording.wav';
      a.click();
      URL.revokeObjectURL(audioURL);
    }
  };

  const handleConfirm = () => {
    setIsConfirming(true); // Show confirmation UI
  };

  const handleCancel = () => {
    setIsConfirming(false); // Hide confirmation UI
  };

  useEffect(() => {
    return () => {
      // Cleanup intervals on component unmount
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="recorder-container">
      <h1>Audio Recorder</h1>
      <div className="recorder-box">
        {!isConfirming && !isRecording && (
          <button className="start-button" onClick={handleConfirm}>
            Start Recording
          </button>
        )}
        {isConfirming && !isRecording && (
          <div className="confirmation-box">
            <p>Are you sure you want to start recording?</p>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={startRecording}>
                Yes, Start Recording
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {!isRecording && countdown > 0 && (
          <p className="countdown-text">Recording starts in: {countdown} seconds</p>
        )}
        {isRecording && (
          <>
            <p className="recording-timer">Recording will stop in: {recordingTimer} seconds</p>
            <button className="stop-button" onClick={stopRecording}>
              Stop Recording
            </button>
          </>
        )}
        {audioURL && (
          <div className="playback-box">
            <audio controls src={audioURL} className="audio-player" />
            <button className="download-button" onClick={handleDownload}>
              Download Recording
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recorder;