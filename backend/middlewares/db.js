import mongoose from "mongoose";

export default await mongoose.connect('mongodb+srv://AlFaizAli:cg3m9hcGWuKDOOZn@cluster0.smu2cu7.mongodb.net/food-del')
    .then(() => { console.log("db connected") })
    .catch((error) => { console.log(error) })
