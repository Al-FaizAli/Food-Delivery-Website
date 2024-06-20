import mongoose from "mongoose";
import { userSchema } from "../controller/UserSchema.js";

export const userModel = new mongoose.model('User', userSchema);
// const user1 = new userModel({
//     firstname: 'Al Faiz',
//     lastname: 'Ali',
//     email: 'faiz410@gmail.com',
//     password: '239954'
// })
// await user1.save();
