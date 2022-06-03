import { model, models, Schema } from "mongoose";

const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    description: {
        type: String,
    },
    name: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    curPrice: {
        type: Number,
        required: true
    },
    total: Number,
    image: String,
    checked: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

export default models.Cart || model('Cart', CartSchema)

