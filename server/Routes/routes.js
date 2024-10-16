import express from "express";
import { signIn, signUp, jobDescUpload} from "../Controllers/User.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.cwd() + "/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, "JobDescription" + path.extname(file.originalname));/*file.originalname Date.now() + path.extname(file.originalname));*/
    },
  });

const router = express.Router();

const upload = multer({storage});

router.post('/signUp/', signUp);
router.post('/signIn/', signIn);
router.post("/dashboard/jobUpload/", upload.single("file"), jobDescUpload);

export default router;