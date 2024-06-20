import { foodModel } from "../model/FoodModel.js"

const getAllFood = async (req, res) => {
    try {
        const foods = await foodModel.find();
        if (!foods) {
            return res.json({
                message: "No Food to Display"
            })
        }
        res.json({
            success: true,
            message: "Fodds Fetched successfully",
            items: foods
        })
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Server Error"
        })
    }
}
export default getAllFood