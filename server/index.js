import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./Routes/routes.js";
import { jobDescUpload, signIn } from "./Controllers/User.js";
import multer from "multer";

const app = express();

const upload = multer({dest: "uploads/"});


dotenv.config();
app.use(express.json({limit: "50mb"}));
app.use(cors());
app.use(express.urlencoded({extended: true}));
// app.use("/api/user/signIn", signIn);

// app.post("/api/user/dashboard/jobUpload/", upload.array("file"), (req, res, next) => {
//     console.log({file: req.file});
//     return res.status(200).json(req.file);
// });

app.use(express.static(process.cwd() + "/uploads"));

// app.post("/api/user/dashboard/jobUpload/", upload.array("photos"), (req, res) => {
//   res.json({ files: req.files });
// });


app.use("/api/user", routes);

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
