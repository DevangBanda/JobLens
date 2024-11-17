import React, {useEffect, useState, useRef, useCallback} from "react";
import MicrophoneStream from "microphone-stream";
import { Buffer } from "buffer";


const useMicrophoneStream = () => {

    const [micStream, setMicStream] = useState(null);
    const [audioFormat, setAudioFormat] = useState(null);

    const startMicStream = useCallback(() => {
        const stream = new MicrophoneStream();
    
        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
          .then((mediaStream) => {
            stream.setStream(mediaStream);
            setMicStream(stream);
    
            // Handle audio data chunks
            stream.on('data', (chunk) => {
              const raw = MicrophoneStream.toRaw(chunk);
              // Process raw audio data as needed
            });
    
            // Handle audio format details
            stream.on('format', (format) => {
              setAudioFormat(format);
              console.log("Audio Format:", format);
            });
          })
          .catch((error) => {
            console.error("Error accessing microphone:", error);
          });
      }, []);
    
      // Function to stop the microphone stream
      const stopMicStream = useCallback(() => {
        if (micStream) {
          micStream.stop();
          setMicStream(null);
        }
      }, [micStream]);


        // Cleanup the microphone stream on component unmount
  useEffect(() => {
    return () => {
      if (micStream) {
        micStream.stop();
      }
    };
  }, [micStream]);

  return { startMicStream, stopMicStream, audioFormat };

}
export default useMicrophoneStream;