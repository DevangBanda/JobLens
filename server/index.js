import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./Routes/routes.js";
import { jobDescUpload, signIn } from "./Controllers/User.js";
import AWS from "aws-sdk";

const app = express();

dotenv.config();
app.use(express.json({limit: "50mb"}));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use("/api/user", routes);

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-west-2' 
})


mongoose
        .connect(process.env.mongoDB_URL)
        .then((res) => {
            app.listen(process.env.PORT, () => {
                console.log("Connected to the server");
            })
            console.log("connected to the database ");
        })
        .catch((error) => {
            console.log(error);
        });
