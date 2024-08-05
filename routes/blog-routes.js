import express from "express";
import { getAllBlogs, addBlog, updateBlog, getById, deleteBlog, getByUserId,  } from "../controllers/blog-controller";

const blogRoute = express.Router();

blogRoute.get('/', getAllBlogs);
blogRoute.post('/add', addBlog);
blogRoute.put('/update/:id', updateBlog);
blogRoute.get('/:id', getById);
blogRoute.delete('/:id', deleteBlog);
blogRoute.get('/user/:id', getByUserId);

export default blogRoute;