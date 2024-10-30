import React, { useState, useRef, useCallback } from 'react'; 
import styled from "styled-components";
import Webcam from "react-webcam";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Camera = styled.div``; 
const CameraButton = styled.button``; 

const WebcamStream = () => {
  
  const webcamref = useRef(null); 
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleStartStream = useCallback(() => {
    setCapturing(true);
    
    const options = {

      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      mimeType: "video/mp4; codecs=vp9,opus",
    };

    try {
      mediaRecorderRef.current = new MediaRecorder(webcamref.current.stream, options); 
      
      mediaRecorderRef.current.addEventListener(
        "dataavailable", 
        handleDataAvailable
      );

      mediaRecorderRef.current.start();
    } catch(error) {
    }
  }, [setCapturing]);

  const handleStopStream = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, []);

  const handleDataAvailable = useCallback((event) => {
    if (event.data && event.data.size > 0) {
      setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <Container>
      <Webcam    muted={true}     audio={true}
        audioConstraints={{
          sampleSize: 8,
          echoCancellation: true,
          suppressLocalAudioPlayback: true,
          noiseSuppression: true
        }} 

        ref={webcamref} />
      {capturing ? (
        <CameraButton onClick={handleStopStream}>Stop Capture</CameraButton>
      ) : (
        <CameraButton onClick={handleStartStream}>Start Capture</CameraButton>
      )}
      {recordedChunks.length > 0 && (
        <CameraButton onClick={handleDownload}>Download</CameraButton>
      )}
    </Container>
  );
};

export default WebcamStream;
