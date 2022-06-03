
import { model, models, Schema } from "mongoose";
const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    images: {
        type: [{
            public_id: String,
            secure_url: String,
        }],
        required: true
    },
    curImg: String,
    prices: {
        type: [Number],
        required: true,
    },
    originalPrice: {
        type: Number
    },
    extras: {
        type: [{
            text: { type: String, required: true },
            price: { type: Number, required: true }
        }]
    },
    category: {
        type: String,
        default: 'none'
    },
    subCategory: {
        type: String,
        default: 'none'
    },
    details: {
        type: String
    },
    ratings: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0,
    },
    onSale: {
        type: Boolean,
        default: false
    },
    freeShiping: {
        type: Boolean,
        default: false,
    },
    shipingFee: {
        type: Number,
    }
},
    { timestamps: true }
);

export default models.Product || model('Product', ProductSchema)