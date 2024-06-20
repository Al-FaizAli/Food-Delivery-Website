import mongoose from "mongoose";
import { foodSchema } from "../controller/FoodSchema.js";

export const foodModel = mongoose.models.food || new mongoose.model('food', foodSchema)
