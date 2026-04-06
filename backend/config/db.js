import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        const res = await mongoose.connect(process.env.MONGO_URL)
        console.log("Successfully Connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
