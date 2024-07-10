import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/FoodApp';

export default await mongoose.connect('mongodb+srv://AlFaizAli:cg3m9hcGWuKDOOZn@cluster0.smu2cu7.mongodb.net/food-del')
    .then(() => { console.log("db connected") })
    .catch((error) => { console.log(error) })
