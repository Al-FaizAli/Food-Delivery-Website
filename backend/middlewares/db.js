import mongoose from "mongoose";

export default await mongoose.connect('mongodb://127.0.0.1:27017/FoodApp')
    .then(() => { console.log("db connected") })
    .catch((error) => { console.log(error) })
