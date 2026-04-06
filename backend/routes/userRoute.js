import express from "express";
import {registerUser,loginUser} from "../controllers/authUserController.js";
import { getCurrentUser, updatePassword, updateProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const userRoute=express.Router();

//PUBLIC ROUTE
userRoute.post("/register",registerUser);
userRoute.post("/login",loginUser);

// PRIVATE LINK PROTECT ALSO
userRoute.get("/me",authMiddleware,getCurrentUser);
userRoute.put("/profile",authMiddleware,updateProfile);
userRoute.put("/password",authMiddleware,updatePassword);

export default userRoute;