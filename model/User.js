import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
        minlength: 6,
    },
    blogs: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "blog",
            required: true,
        }
    ]
});

export default mongoose.model("User", UserSchema);