import mongoose from "mongoose";
import { userSchema } from "../controller/UserSchema.js";

const userModel = mongoose.models.User ||new mongoose.model('User', userSchema);
export default userModel;
