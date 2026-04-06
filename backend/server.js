import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import userRoute from "./routes/userRoute.js";

const app=express();

dotenv.config();
const port = process.env.PORT||  4000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// call Db
connectDB();

app.use("/api/user",userRoute);

app.get("/",(req,res)=>{
    res.send("all working");
});

app.listen(port,()=>{
    console.log(`Server is runnig on port ${port}`);
})