import MicRecorder from 'mic-recorder-to-mp3-fixed';
import React, {useEffect, useState} from 'react';
import {sendAudioFile} from '../../api/app.js';

const useMicRecorderHook = () => {

    const [recorder] = useState(new MicRecorder({
        bitRate: 128
    }));

    const [mp3File, setMp3File] = useState([]);

    const startRec = () => {
        // Start recording. Browser will request permission to use your microphone.
        recorder.start().then(() => {
            // something else
        }).catch((e) => {
            console.error(e);
        });
    }

    const stopRec = () => {
        recorder
        .stop()
        .getMp3().then(async([buffer, blob]) => {
            // do what ever you want with buffer and blob
            // Example: Create a mp3 file and play
            console.log(buffer, blob);
            const file = new File(buffer, 'newAudioFile.mp3', {
                type: blob.type,
                lastModified: Date.now()
            });

            const newAudioFile = URL.createObjectURL(file);
            setMp3File((prevFiles) => [...prevFiles, newAudioFile]);

            const formData = new FormData();
            formData.append("audio", file);

            setMp3File(file);

            //If the Form Data is not empty, send the request to the server
            if ([...formData.entries()].length > 0) {
                console.log("FormData contains:", [...formData.entries()])
                
                await sendAudioFile(formData)
                .then((response) => {
                    // console.log("response: \n", response.data);
                    // const filenames = response.data.files.map((file) => file.filename);
                    console.log("bird");
                });
                }
        
            else(window.alert("Please choose a file first"));
        })
        
        .catch((e) => {
                alert('We could not retrieve your message');
                console.log(e);
            });

    }

    return {mp3File, startRec, stopRec};
};

export default useMicRecorderHook;