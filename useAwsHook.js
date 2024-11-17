import React, {useEffect, useState, useRef} from "react";
import {
  TranscribeStreamingClient,
  StartStreamTranscriptionCommand,
} from "@aws-sdk/client-transcribe-streaming";
import MicrophoneStream from "microphone-stream";
import { Buffer } from "buffer";

const language = "en-US";
const SAMPLE_RATE = 44100;



const useAwsHook = () => {
    
    const microphoneStream = useRef(null);
    const transcribeClient = useRef(null);
    const [transcription, setTranscription] = useState("");
    const [recording, setRecording] = useState(false);

    const AWS_REGION = import.meta.env.VITE_AWS_REGION;
    const AWS_ACCESS_KEY_ID =  import.meta.env.VITE_AWS_ACCESS_KEY_ID;
    const AWS_SECRET_ACCESS_KEY =  import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
    
    useEffect(() => {

        const AWS_REGION = import.meta.env.VITE_AWS_REGION;
        const AWS_ACCESS_KEY_ID =  import.meta.env.VITE_AWS_ACCESS_KEY;
        const AWS_SECRET_ACCESS_KEY =  import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

    }, []);

    const createMicrophoneStream = async () => {
        microphoneStream.current = new MicrophoneStream();
        microphoneStream.current.setStream(
          await window.navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true,
          })
        );
      };
    

    const createTranscribeClient = () => {
        try {
            transcribeClient.current = new TranscribeStreamingClient({
                region: AWS_REGION,
                credentials: {
                  accessKeyId: AWS_ACCESS_KEY_ID,
                  secretAccessKey: AWS_SECRET_ACCESS_KEY,
                },
              });
        } catch (error) {
            console.log("createTranscribeClient", error);
        }
      };

      //ENCODE THE STRWAM
      const encodePCMChunk = (chunk) => {
        const input = MicrophoneStream.toRaw(chunk);
        let offset = 0;
        const buffer = new ArrayBuffer(input.length * 2);
        const view = new DataView(buffer);
        for (let i = 0; i < input.length; i++, offset += 2) {
          let s = Math.max(-1, Math.min(1, input[i]));
          view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
        }
        return Buffer.from(buffer);
      };
    
      const getAudioStream = async function* () {
        for await (const chunk of microphoneStream.current) {
          if (chunk.length <= SAMPLE_RATE) {
            yield {
              AudioEvent: {
                AudioChunk: encodePCMChunk(chunk),
              },
            };
          }
        }
      };
    
      const startStreaming = async () => {
        const command = new StartStreamTranscriptionCommand({
          LanguageCode: language,
          MediaEncoding: "pcm",
          MediaSampleRateHertz: SAMPLE_RATE,
          AudioStream: getAudioStream(),
        });
        const data = await transcribeClient.current.send(command);
        for await (const event of data.TranscriptResultStream) {
          const results = event.TranscriptEvent.Transcript.Results;
          if (results.length && !results[0]?.IsPartial) {
            const newTranscript = results[0].Alternatives[0].Transcript;
            setTranscription((prev) => prev + newTranscript + " ");
          }
        }
      };
    
      const startRecording = async () => {
        if (!import.meta.env.VITE_AWS_REGION || 
            !import.meta.env.VITE_AWS_ACCESS_KEY_ID || 
            !import.meta.env.VITE_AWS_SECRET_ACCESS_KEY) {
          alert("Set AWS env variables first.");
          return false;
        }
    
        if (microphoneStream.current || transcribeClient.current) {
          stopRecording();
        }
        createTranscribeClient();
        await createMicrophoneStream();
        await startStreaming();
        setRecording(true);
      };
    
      const stopRecording = () => {
        if (microphoneStream.current) {
          microphoneStream.current.stop();
          microphoneStream.current.destroy();
          microphoneStream.current = null;
        }
        setRecording(false);
        setTranscription(""); // Reset transcription if needed
      };
    
      return { transcription, recording, startRecording, stopRecording };
}
export default useAwsHook