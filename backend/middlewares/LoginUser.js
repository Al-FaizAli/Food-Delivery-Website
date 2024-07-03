import userModel from "../model/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            return res.json({
                success: true,
                admin: true,
                message: 'Admin LogIn'
            })
        }
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.json({
                success: false,
                message: 'Incorrect Credentials'
            })

        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({
                success: false,
                message: 'Incorrect Credentials'
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
        res.json({
            success: true,
            message: 'User Logged In',
            token: token
        })
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Server Error'
        })
    }
}
export default logInUser