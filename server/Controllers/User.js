import dotenv from "dotenv";
import bcrypt from "bcrypt"; 
import user from "../Models/user.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mammoth from "mammoth";
import { run } from "../GeminiAPI.js";
import path from "path";
import fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { StartTranscriptionJobCommand } from "@aws-sdk/client-transcribe";
// import { transcribeClient } from "../Middleware/transcribeClient.js";

import {transcribeClient} from '../Middleware/transcribeClient.js';


import AWS from "aws-sdk";
import main from "../Middleware/S3_Operations.js";
import S3 from "../Middleware/S3_Operations.js";

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

export const signIn = async(req, res, next) => 
{
    try {
        const {email, password} = req.body;
        
        const existingUser = await user.findOne({email}).exec();
        
        if(!existingUser){
            return res.status(404).send("User doesn't exist");
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password); 

        if(!isPasswordCorrect)
        {
            return res.status(404).send("Password you entered is wrong");
        }
        const token = jwt.sign({id: existingUser._id}, 
            process.env.JWT, {
            expiresIn: "9999 years",
        });

        return res.status(200).json({ token, existingUser });
    } 
    catch(error) {
        return next(error);
    }
}

export const signUp = async(req, res, next) => 
    {
        try {
            const {name, email, password} = req.body;
            //Check if the user already exists. Exec because the queries returns a query and not a promise
            const existingUser = await user.findOne({email}).exec();

            if(existingUser){
                return(res.status(409).send("User already exists"));
            }

            //Hash the password
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPass = bcrypt.hashSync(password, salt);
            //Generate new user for the database
            const newUser = new user({
                name, email, password: hashedPass
            });

            const createdUser = await newUser.save();
            const token = jwt.sign({id: createdUser._id}, process.env.JWT, {
                expiresIn: "9999 years",
            });
            console.log("user saved");            
            return res.status(200).json({token, user});
        } catch (error) {
            return next(error);
        }
    }
 
export const jobDescUpload = async(req,res,next) => {

    //Once we have the file saved, we can use mammoth or pdf-parse to 
    //extract the raw text from it for NLP analysis. We use mammoth package to achieve this.
    // const text = await mammoth.extractRawText({path: "/uploads"})
    const filePath = req.file.path;
    const result = await mammoth.extractRawText({ path: filePath });
    //console.log(result.value);

    // const answer = await run("Assume you are an expert when it comes to hiring, job description analysis. I am providing you with a job description." + 
    //     "FIgure out the name of the role by yourself" + 
    //     "Give me 5 technical and 10 non-technical that interviewer can ask me based on the job description." + 
    //     result.value);


    const answer = await run("Give me what doctor specialities that deal with exzema. GIve me just the speciality names without stars please or bullets.");

    console.log(answer);
    res.status(200).json(answer);
    // res.status(200).json({ files: req.files });
};

export const mp3FileUpload = async(req, res, next) =>{
    console.log("MP3 File received");
    
                
    const s3_trial = new S3();

    // console.log(s3_trial.listBuckets(input));

    const audioFileName = 'audio.mp3'; // File name (you can dynamically choose this)
    const audioFilePath = path.join(__dirname, '..', 'uploads', audioFileName); // Path to your .mp3 file

    if (fs.existsSync(audioFilePath)) {
        console.log("Exists");
        s3_trial.PutObjectAudio(audioFilePath);
    }

    //  const params = {
    //     TranscriptionJobName: "bird7",
    //     LanguageCode: "en-US", // For example, 'en-US'
    //     MediaFormat: "mp3", // For example, 'wav'
    //     Media: {
    //       MediaFileUri: "https://joblensproject.s3.ca-central-1.amazonaws.com/audio.mp3",
    //       // For example, "https://transcribe-demo.s3-REGION.amazonaws.com/hello_world.wav"
    //     },
    //     OutputBucketName: "joblensproject",
    //   };
      
   

    //   try {
    //     const data = await transcribeClient.send(
    //       new StartTranscriptionJobCommand(params),
    //     );
    //     console.log("Success - put", data);
    //     return data; // For unit tests.
    //   } catch (err) {
    //     console.log("Error", err);
    //   }


};
