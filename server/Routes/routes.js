import express from "express";
import { signIn, signUp, jobDescUpload, mp3FileUpload} from "../Controllers/User.js";
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.cwd() + "/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, path.extname(file.originalname));/*file.originalname Date.now() + path.extname(file.originalname));*/
    },
  });

  const storageMP3 = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.cwd() + "/uploads3");
    },
    filename: (req, file, cb) => {
      cb(null, "MP3File" + path.extname(file.originalname));
    },
  });


const router = express.Router();

const upload = multer({storage});
const uploadMP3 = multer({storageMP3});

router.post('/signUp/', signUp);
router.post('/signIn/', signIn);
router.post("/dashboard/jobUpload/", upload.single("file"), jobDescUpload);
router.post("/dashboard/mp3Upload", upload.single("audio"), mp3FileUpload);

export default router;