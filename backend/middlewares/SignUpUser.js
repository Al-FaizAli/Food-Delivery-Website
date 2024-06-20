import { userModel } from "../model/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const signUpUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new userModel({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword
        })
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
        res.json(
            {
                success: true,
                message: "User Signed Up",
                token: token
            }
        )
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Server Error"
        })
    }
}
export default signUpUser