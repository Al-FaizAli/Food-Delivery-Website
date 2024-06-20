import { foodModel } from "../model/FoodModel.js"
import fs from 'fs'
const deleteFood = async (req, res) => {

    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => { })
        const item = await foodModel.findByIdAndDelete(req.body.id)
        if (!item) {

            return res.json({
                success: false,
                message: "Food Not Found"
            })
        }
        res.json({
            success: true,
            message: "Food Deleted"
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: "Error"
        })
    }
}
export default deleteFood