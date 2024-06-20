import { foodModel } from "../model/FoodModel.js"


const addFood = async (req, res) => {
    try {
        // const { name, description, price, category } = req.body
        let image_filename = `${req.file.filename}`
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        })
        await food.save();
        res.json({
            success: true,
            message: "Food Added"
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
export default addFood;