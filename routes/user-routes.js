import express from 'express';
import { getAllUsers, signup, login } from '../controllers/user-controller';

const userRoute  = express.Router();


userRoute.get('/', getAllUsers);
userRoute.post('/signup', signup);
userRoute.post('/login', login);

export default userRoute;