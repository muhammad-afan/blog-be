import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    image: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
});

export default mongoose.model("blog", BlogSchema);