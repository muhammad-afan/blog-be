import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate('user');
    } catch (err) {
        console.log(err.message);
    }
    if (blogs.length === 0) return res.status(404).json({ message: "No Blogs found" });
    return res.status(200).json({ blogs });
}

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err.message);
    }
    if (!existingUser) return res.status(400).json({ message: "Unable to find the user by this id" });
    const blog = new Blog({ title, description, image, user });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err.message)
    }
    return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
    const { title, description, image } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, { title, description, image });
    } catch (err) {
        console.log(err.message);
    }
    if (!blog) return res.status(500).json({ message: "Blog not found" });
    return res.status(200).json({ blog });
}

export const getById = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (err) {
        console.log(err.message);
    }
    if (!blog) return res.status(404).json({ message: "No blog found" });
    console.log(blog);
    return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
    const { id } = req.params;
    let blog;
    let user;
    try {
        blog = await Blog.findByIdAndDelete(id);
        // await blog.user.blogs.pull(blog);
        // await blog.user.save();
        user = await User.findOne({ blogs: id })
        await user.blogs.pull(id);
        await user.save();
    } catch (err) {
        console.log(err.message);
    }
    if (!blog) return res.status(500).json({ message: "Unable to delete" });
    return res.status(200).json({ message: "Succefully deleted" });
};


export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate('blogs');
    } catch (err) {
        console.log(err.message);
    }
    if (!userBlogs) return res.status(404).json({ message: "No blogs found" })
    return res.status(200).json({ blogs: userBlogs });
};