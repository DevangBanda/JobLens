// This is used for getting user input.
import { createInterface } from "node:readline/promises";

import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
  ListBucketMetricsConfigurationsCommand,
  ListBucketsCommand,
} from "@aws-sdk/client-s3";


import { StartTranscriptionJobCommand } from "@aws-sdk/client-transcribe";
// import { transcribeClient } from "../Middleware/transcribeClient.js";

import {transcribeClient} from './transcribeClient.js';



class S3{
  constructor(){
    this.s3Client = new S3Client({});
    this.bucketName = `joblensproject`;
  }; 

  async newBucket(){
  // Create an Amazon S3 bucket. The epoch timestamp is appended
  // to the name to make it unique.

    // const bucketName = `test-bucket-${Date.now()}`;
  const bucketName = `joblensproject`;
    await this.s3Client.send(
      new CreateBucketCommand({
        Bucket: bucketName,
      }),
    );
}; 

async PutObjectDocument(file){
  await this.s3Client.send(
    new PutObjectCommand({
      Bucket: this.bucketName,
      Key: "file.docx",
      Body: file,
    }),
  );



}

async PutObjectAudio(file){
  await this.s3Client.send(
    new PutObjectCommand({
      Bucket: this.bucketName,
      Key: "audio.mp3",
      Body: file,
    }),
  );

  const params = {
    TranscriptionJobName: "bird9",
    LanguageCode: "en-US", // For example, 'en-US'
    MediaFormat: "mp3", // For example, 'wav'
    Media: {
      MediaFileUri: "https://joblensproject.s3.ca-central-1.amazonaws.com/audio.mp3",
      // For example, "https://transcribe-demo.s3-REGION.amazonaws.com/hello_world.wav"
    },
    OutputBucketName: "joblensproject",
  };
  


  try {
    console.log("Starting");
    const data = await transcribeClient.send(
      new StartTranscriptionJobCommand(params),
    );
    console.log("Success - put", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }



}

// async deleteBucket(bucketName){
//   await this.s3Client.send(new DeleteBucketCommand({ Bucket: bucketName }));
// }

// async listBuckets(input){
//   const command = new ListBucketsCommand(input);
//   const res = await this.s3Client.send(command);
// }


}

export async function main() {
  // A region and credentials can be declared explicitly. For example
  // `new S3Client({ region: 'us-east-1', credentials: {...} })` would
  //initialize the client with those settings. However, the SDK will
  // use your local configuration and credentials if those properties
  // are not defined here.
  const s3Client = new S3Client({});

  newBucket(s3Client);

  // Put an object into an Amazon S3 bucket.
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: "my-first-object.txt",
      Body: "Hello JavaScript SDK!",
    }),
  );

  // Read the object.
  const { Body } = await s3Client.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: "my-first-object.txt",
    }),
  );

  console.log(await Body.transformToString());

  // Confirm resource deletion.
  const prompt = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const result = await prompt.question("Empty and delete bucket? (y/n) ");
  prompt.close();

  if (result === "y") {
    // Create an async iterator over lists of objects in a bucket.
    const paginator = paginateListObjectsV2(
      { client: s3Client },
      { Bucket: bucketName },
    );
    for await (const page of paginator) {
      const objects = page.Contents;
      if (objects) {
        // For every object in each page, delete it.
        for (const object of objects) {
          await s3Client.send(
            new DeleteObjectCommand({ Bucket: bucketName, Key: object.Key }),
          );
        }
      }
    }

    // Once all the objects are gone, the bucket can be deleted.
    await s3Client.send(new DeleteBucketCommand({ Bucket: bucketName }));
  }
}

// Call a function if this file was run directly. This allows the file
// to be runnable without running on import.
import { fileURLToPath } from "node:url";
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export default S3;