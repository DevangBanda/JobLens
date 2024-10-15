import dotenv from "dotenv";
import bcrypt from "bcrypt"; 
import user from "../Models/user.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

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
    res.status(200).json({ files: req.files });
}
