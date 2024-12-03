//-start:[transcribe.JavaScript.createclientv3]
import { TranscribeClient } from "@aws-sdk/client-transcribe";
// Set the AWS Region.
const REGION = "ca-central-1"; //e.g. "us-east-1"
// Create an Amazon Transcribe service client object.
const transcribeClient = new TranscribeClient({ region: REGION });
export { transcribeClient };
// snippet-end:[transcribe.JavaScript.createclientv3]