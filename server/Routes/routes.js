import express from "express";
import { signIn, signUp, jobDescUpload} from "../Controllers/User.js";
import multer from "multer";


const router = express.Router();


const upload = multer({dest: "uploads/"});

router.post('/signUp/', signUp);
router.post('/signIn/', signIn);

router.post("/dashboard/jobUpload/", upload.array("photos"), jobDescUpload);

export default router;