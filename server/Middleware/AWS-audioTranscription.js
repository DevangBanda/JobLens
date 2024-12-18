// Import the required AWS SDK clients and commands for Node.js
import { StartTranscriptionJobCommand } from "@aws-sdk/client-transcribe";
import { transcribeClient } from "./AWSTranscribe.js";

// Set the parameters
export const params = {
    TranscriptionJobName: "JOB_LENS",
    LanguageCode: "en-US", 
    MediaFormat: "mp3", // For example, 'wav'
    Media: {
      MediaFileUri: "SOURCE_LOCATION",
      // For example, "https://transcribe-demo.s3-REGION.amazonaws.com/hello_world.wav"
    },
    OutputBucketName: "OUTPUT_BUCKET_NAME",
  };

  export const run = async () => {
    try {
      const data = await transcribeClient.send(
        new StartTranscriptionJobCommand(params),
      );
      console.log("Success - put", data);
      return data; // For unit tests.
    } catch (err) {
      console.log("Error", err);
    }
  };
