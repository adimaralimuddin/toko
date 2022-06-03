import { model, models, Schema } from "mongoose";

const CheckedItemsSchema = new Schema({
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
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    checkType: {
        type: String,
        default: 'favorite'
    }
}, {
    timestamps: true
})

export default models.CheckedItems || model('CheckedItems', CheckedItemsSchema)