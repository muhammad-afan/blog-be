import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connect_to_mongoose = () => {
    mongoose
        .connect(
            `mongodb+srv://muh_afan:${process.env.MONGODB_PASS}@cluster0.shwmgsl.mongodb.net/Blog?retryWrites=true&w=majority`
        )
        .then(() => console.log("Connected Successfully"))
        .catch((err) => console.log(err.message));
} 
