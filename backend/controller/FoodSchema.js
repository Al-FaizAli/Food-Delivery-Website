import mongoose from "mongoose";
export const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        // enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
    },
    // rating: {
    //     type: Number,
    //     default: 0,
    //     min: 0,
    //     max: 5
    // },
    // availability: {
    //     type: Boolean,
    //     default: true
    // }
});

