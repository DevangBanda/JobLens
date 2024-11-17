import React, {useEffect, useState, useRef} from "react";
import {
  TranscribeStreamingClient,
  StartStreamTranscriptionCommand,
} from "@aws-sdk/client-transcribe-streaming";
import MicrophoneStream from "microphone-stream";
import { Buffer } from "buffer";

const useMediaRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);

    const startRecording = async() => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const options = {
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2500000,
                mimeType: "video/mp4",
              };
            mediaRecorderRef.current = new MediaRecorder(stream, options);
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                chunksRef.current.push(event.data);
                console.log(chunksRef.current);
              };

            mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'audio/mp3' });
            setAudioBlob(blob); // Store the audio Blob
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
          console.log(audioBlob);
        }
      };

      return {
        isRecording,
        audioBlob,
        startRecording,
        stopRecording,
      };



    // const [recorder, setRecorder] = useState(null);
    // const [isRecording, setIsRecording] = useState(false);
    // const [chunks, setChunks] = useState([]);



  
    // useEffect(() => {
    //   const init = async () => {
    //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    //     setRecorder(new MediaRecorder(stream));
    //   };
    //   init();
    // }, []);

    // const startRecording = () => {
    //     if (recorder && !isRecording) {
    //       setChunks([]);
    //       recorder.start();
    //       setIsRecording(true);
    //     }
    //   };

    // const stopRecording = () => {
    // if (recorder && isRecording) {
    //     recorder.stop();
    //     setIsRecording(false);
    //     console.log(chunks);
    // }
    // };

    // const handleOnDataAvailable = (event) => {
    //     setChunks([...chunks, event.data]);
    //     console.log("handle");
    //     console.log(chunks);
    //   };
    
    //   const getRecording = () => {
    //     if (chunks.length) {
    //       const blob = new Blob(chunks, { type: chunks[0].type });
    //       return URL.createObjectURL(blob);
    //     }
    //     return null;
    //   };
  

    //   return {
    //     isRecording,
    //     startRecording,
    //     stopRecording,
    //     getRecording,
    //   };
};

export default useMediaRecorder;