import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/FoodApp';
// MongoDB Connection
export default await mongoose.connect(MONGODB_URI)
    .then(() => { console.log("db connected") })
    .catch((error) => { console.log(error) })
