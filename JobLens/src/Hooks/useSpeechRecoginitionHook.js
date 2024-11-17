
import { ConstructionOutlined } from '@mui/icons-material';
import React, {useEffect, useState, useRef} from 'react';


//Browsers only support speech recog. with prefixed properties. This code allow for both prefixed and unprefixed
//versions that may be supported
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;


//Grammar that our app can recognize
// const grammar = `##JSGF V1.0 ISO8859-1 en;`
const grammar = `##JSGF V1.0;`

//Define a speech recognition instance to control the recognition of the application. 
const recognition = new SpeechRecognition();
//New grammar list to contain our grammar
const speechRecognitionList = new SpeechGrammarList();

//Add grammar to the list 
speechRecognitionList.addFromString(grammar, 1); 

//Add grammar list to the speech recognition instance
recognition.grammars = speechRecognitionList;
//Controls whether continous results are captured
recognition.continuous = true;
//Language
recognition.lang = "en-US";
//Final results or interim results? 
recognition.interimResults = true;
//Sets the max number of alternate matches that should be returned per result
recognition.maxAlternatives = 1;


const useSpeechRecognition = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [finalText, setFinalText] = useState("");
    const [isFinal, SetIsFinal] = useState(false);

    //Initialize the speech recognition when the component loads
    useEffect(() => {
        if(!recognition) return;

        //event handler
        recognition.onresult = (event) => {
            console.log(event.results);
            const length = event.results.length;
            setText((prevText) => event.results[length-1][0].transcript);
            SetIsFinal(false);
            if(event.results[length-1].isFinal)
            {
                console.log(event.results[length-1][0].transcript);
                setFinalText((prevText) => prevText + event.results[length-1][0].transcript);
                SetIsFinal(true);
            }
            // recognition.stop();
            // setIsListening(false);
        }
    }, []); 
    

    //Function to start listening
    const startListening = () => {
        setText('');
        setIsListening(true);
        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    return{
        text, 
        isListening, 
        startListening, 
        stopListening, 
        finalText,
        isFinal,
        hasRecognitionSupport: !!recognition,
    };

}


export default useSpeechRecognition;