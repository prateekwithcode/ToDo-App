import express from "express";
import {registerUser,loginUser} from "../controllers/authUserController.js";
import { getCurrentUser, updatePassword, updateProfile } from "../controllers/userController.js";
const userRoute=express.Router();

//PUBLIC ROUTE
userRoute.post("/register",registerUser);
userRoute.post("/login",loginUser);

// PRIVATE LINK PROTECT ALSO
userRoute.get("/me",getCurrentUser);
userRoute.put("/profile",updateProfile);
user.Route.put("/password",updatePassword);

export default route;