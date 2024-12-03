import { createInterface } from "node:readline/promises";

import {
    S3Client, 
    PutObjectCommand,
    CreateBucketCommand, 
    DeleteObjectCommand, 
    DeleteBucketCommand, 
    ListBucketsCommand,
    paginateListObjectsV2,
    GetObjectCommand,
} from "@aws-sdk/client-s3"; 

class S3{
    constructor(){
        //Create a new Amazon S3 bucket Instance
        this.s3Client = new S3Client({});
    }


    //Creates a new bucket in S3
    async newBucket(bucketName){
        await this.s3Client.send(
            new CreateBucketCommand({
                Bucket: bucketName
            })
        );
    };

    //Puts a new object in the newly created bucket
    async putObjectIntoBucket(bucketName, objName){
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: objName
            })
        )
    }
}