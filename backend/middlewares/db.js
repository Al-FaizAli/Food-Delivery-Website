import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
// MongoDB Connection
export default await mongoose.connect(MONGODB_URI)
    .then(() => { console.log("db connected") })
    .catch((error) => { console.log(error) })
