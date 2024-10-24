import React, {useState, useRef, useCallback, memo} from 'react'; 
import styled from "styled-components";
import Webcam from "react-webcam";


const WebcamStream = memo(() => {
    const Container = styled.div`
    `; 

    const Camera = styled.div`
    `; 

    const CameraButton = styled.button`
    `; 

    const webcamref = useRef(null); 
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const handleStartStream = useCallback(() => {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamref.current.stream, {
        mimeType: "video/webm"
      }); 

      mediaRecorderRef.current.addEventListener(
        "dataavailable", 
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
      console.log("Started");
    }, [webcamref, setCapturing, mediaRecorderRef]);

    const handleStopStream = useCallback(() => {
      console.log("Stopped");
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [webcamref, mediaRecorderRef, setCapturing]);

    const handleDataAvailable = useCallback((data) => {

      if(data.size > 0){
        setRecordedChunks((prev) => prev.concat(data));
      }
    }, [setRecordedChunks]);

  return (
    <>
        <Container>
            <Camera>
                <Webcam audio={false} ref={webcamref}/>
            </Camera>
            
              { capturing ? 
                (<button onClick = {handleStopStream}>Stop Camera</button>) 
                        : 
                (<button onClick = {handleStartStream}>Start Camera</button>)
              }

            
        </Container>
    </>
  )
})

export default WebcamStream