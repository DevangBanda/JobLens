import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

dotenv.config();
app.use(express.json({limit: "50mb"}));
app.use(cors());
app.use(express.urlencoded({extended: true}));

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
