import {TranscribeClient} from "@aws-sdk/client-transcribe"; 
const REGION = "us-west"; 
const transcribeClient = new TranscribeClient({region: REGION});
export{transcribeClient};


import AWS from aws-sdk;
