import React, {useCallback, useEffect, useRef, useState} from 'react'; 
import Navbar from '../Components/Navbar';
import styled from 'styled-components';
import Sidebar from '../Components/Sidebar';
import Button from '../Components/Button';
import AddIcon from '@mui/icons-material/Add';
import {jobDescUpload, sendAudioFile} from "../../api/app";
import axios, { formToJSON } from 'axios';
import useSpeechRecognition from '../Hooks/useSpeechRecoginitionHook';
import WebcamStream from '../Components/WebcamStream';
import { useEventCallback } from '@mui/material';
import useMicrophoneStream from '../Hooks/useMicrophoneStream';
import useAwsHook from '../Hooks/useAwsHook';
import useMicRecorderHook from '../Hooks/useMicRecorderHook';

const BodyDiv = styled.div`
height: 100vh;
width: 100vw;
display: flex;
align-items: center;
flex-direction: column;
gap: 20px;
background-color: #000000;
color: white;
height: 100vh;
`;

const Main = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center; 
margin: 20px 20px;
gap:15px;
width: 90%;
`;

//Main Dash Bar
const Dash = styled.div`
flex: 0.75;
display: flex;
flex-direction: column;
gap: 10px;
padding: 8px;
background-color: ${({theme}) => theme.top_primary};
color: ${({theme}) => theme.top_text_primary};
height: 100%;
border: 1px solid${({theme}) => theme.top_primary};
border-radius: 20px;
`;

const Row = styled.div`
display: flex; 
flex-direction: row;
flex: 1;
justify-content: space-around;`;

const JobDescDiv = styled.div`
flex: 1;
margin: 5px;
border: 2px solid white;
border-radius: 15px;
position: relative;
`;

const QuestionsDiv = styled.div`
flex: 1;
margin: 5px;
border: 2px solid white;
border-radius: 15px;
`;

const Top = styled.div`
flex: 0.2;
display: flex;
align-items: center;
height:20%;
justify-content: space-around;`;

const BTN = styled.button`
padding: 0px;
display: flex;
border-radius: 10px;
width: 30%;
align-items:center; 
background-color: ${({theme}) => theme.component_text_primary};`;

const Bottom = styled.div`
flex: 0.8;
height: 80%;
background-color: white;
border-radius: inherit;
overflow: auto;
`;

//FeedBack Bar
const FeedBar = styled.div`
flex: 0.25;
display: flex;
flex-direction: column;
gap: 10px;
padding: 8px;
background-color: ${({theme}) => theme.top_primary};
color: ${({theme}) => theme.top_text_primary};
height: 100%;
border: 1px solid${({theme}) => theme.top_primary};
border-radius: 20px;
`;


const Dashboard = () => {

  let outputRef = useRef();
  const [outText, setOutText] = useState("");
  console.log("render");
  const [captureVid, setCaptureVid] = useState(false);

  const [testFile, setTestFile] = useState(null);
  
  //Speech Recognition custom hook
  const {text, 
        isListening, 
        startListening, 
        stopListening,
        finalText,
        isFinal,
        hasRecognitionSupport} = useSpeechRecognition();

    const {
      mp3File, startRec, stopRec, blobURL
    } = useMicRecorderHook();

  const {transcription, recording, startRecording, stopRecording } = useAwsHook();
  // const { isRecording, audioBlob, startRecording, stopRecording } = useMediaRecorder();
  const { startMicStream, stopMicStream, audioFormat } = useMicrophoneStream();

  const handlePlayback = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };
 
 
  // const handleBtnClick = (e) => {
  //   fileInputRef.current.click(); //Triggers click of input
  // }
  const [files, setFiles] = useState([]);
  const changeFiles = (e) => {
    setFiles(e.target.files);
  };

  const uploadFiles = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const file of files) {
      formData.append("file", file);
    }

    //If the Form Data is not empty, send the request to the server
    if(!formData.entries().next().done){
    await jobDescUpload(formData)
      .then((response) => {
        console.log("response: \n", response.data);
        // const filenames = response.data.files.map((file) => file.filename);
      });
    }

    else(window.alert("Please choose a file first"));
  };

  const handleSpeechClick = () => {
    console.log("btn");
    startListening();
  }

  const handleSpeechStopClick = () => {
     console.log("btnStop");
    console.log(text);
      stopListening();
  };

  const handleMP3StartRecClick = () => {
    console.log("MP3Start");

    startRec();
  };

  const handleMP3StopRecClick = () => {
    console.log("MP3Stop");
    stopRec();
  };

  useEffect(() => {
    outputRef.current = text;
    navigator.getUserMedia({audio: true}, 
      ()=>{console.log('Granted');}, 
      ()=>{console.log('Denied');}
    ); 
    if(isFinal){
      outputRef.current = "";
      console.log("bird");
    }
  }, [text, isFinal]);
  
  return (
    <>
      <BodyDiv>
  
        <Main>
          <Sidebar/>

          <Dash>
            <Row>

              <JobDescDiv>

                <Top>
                  <h2>Job Summary</h2>
                  <form onSubmit={uploadFiles}>
                    <input type="file" multiple onChange={changeFiles} />
                    <button type="submit">Upload files</button>
                  </form>
                </Top>

              <button onClick = {useCallback(() => setCaptureVid(!captureVid))}></button>

              </JobDescDiv>
              
              <QuestionsDiv>
              <button onClick = {useCallback(() => setCaptureVid(!captureVid))}></button>
                {captureVid ? 
                (<WebcamStream/>):
                (<></>)

                }   
              </QuestionsDiv>
            </Row>

            <Row>
              <JobDescDiv>
              <h1>Metrics? </h1>
              {/* <button onClick={() => {handleSpeechClick()}}>Start</button>

              {hasRecognitionSupport ? 
              (<h1>Yes Support</h1>) :
              (<h1>No Support </h1>)}

              {isListening ? 
              (<p>recording</p>):
              (<p>not recording</p>)}
              
              {text}

              <button onClick={() => {handleSpeechStopClick()}}>Start</button> */}
                          {/* <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioBlob && (
        <div>
          <h2>Recorded Audio:</h2>
          <button onClick={handlePlayback}>Play Recorded Audio</button>
        </div>
      )} */}

{/* <button onClick={startMicStream}>Start Microphone</button>
      <button onClick={stopMicStream}>Stop Microphone</button>

      {audioFormat && (
        <div>
          <p>Audio Format:</p>
          <pre>{JSON.stringify(audioFormat, null, 2)}</pre>
        </div>
      )} */}

    <button onClick={startRecording} >Start Recording
       </button>
      <button onClick={stopRecording}>
        Stop Recording
      </button>
      <div>
        <h2>Transcription:</h2>
        <p>{transcription}</p>
      </div>
              </JobDescDiv>
              
              <QuestionsDiv>
                {isFinal ? finalText: (finalText + outputRef.current)}
              </QuestionsDiv>
            </Row>

          </Dash>
          
          <FeedBar>
          <button onClick={handleMP3StartRecClick}>START MP3</button>
          <button onClick={handleMP3StopRecClick}>STOP MP3</button>
          {/* <ul id="playlist">
          {mp3File.map((audioSrc, index) => (
            <li key={index}>
              <audio controls>
                <source src={audioSrc} type="audio/mp3" />
              </audio>
            </li>
          ))}
                  </ul> */}

          {blobURL && (
        <audio controls>
          <source src={blobURL} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
  
          </FeedBar>

        </Main>

      </BodyDiv>
    </>

  )
}

export default Dashboard