import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


export async function authMiddleware(req,res,next){
    //GRAB THE BEARER TOKEN FROM AUTHENTICATION HEADER
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            success:false,
            message:"Not Authorized,token missing!"
        });
    }

    const token = authHeader.split('')[1];

    //VERIFY && ATTACH USER OBJECT    
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(payload.id).select('-password');

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("jwt verification failed",error);
        res.status(401).json({status:false,message:"Token invalid and expire"});
    }

};