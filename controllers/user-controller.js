import User from "../model/User";
import { hashedPassword, comparePassword } from "../utils/helper";


export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}).select('name email');

    } catch (err) {
        console.log(err.message);
    }
    if (users.length === 0) return res.status(404).json({ message: "No Users Found" });
    return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
    const { name, email } = req.body;   // * Destructuring from req body
    console.log(req.body);
    let existingUser;
    try {
        existingUser = await User.findOne({ email }); // * Checking if user already exists
    } catch (err) {
        console.log(err.message);
    }
    if (existingUser) return res.status(400).json({ message: "User already exists! Login instead" });
    const password = hashedPassword(req.body.password);
    const user = new User({ name, email, password, blogs: [] });
    try {
        await user.save();
    } catch (err) {
        console.log(err.message);
    }
    return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email }); // * Checking if user already exists
    } catch (err) {
        console.log(err.message);
    }
    if (!existingUser) return res.status(404).json({ message: "Couldn't find user with this email" });
    const isValid = comparePassword(password, existingUser.password);
    if (!isValid) return res.status(400).json({message: "Incorrect Password"});
    return res.status(200).json({message: "Logged in successfully", user: existingUser});
} 