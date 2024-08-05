import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user-routes";
import { connect_to_mongoose } from "./database";
import blogRoute from "./routes/blog-routes";
import cors from "cors";

const app = express();
connect_to_mongoose();   // * connecting to mongoDB

dotenv.config();
app.use(cors({
    origin: '*',
}));
app.use(express.json());


app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute)





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
});
