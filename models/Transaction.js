import { model, models, Schema } from "mongoose";

const TransactionSchema = new Schema({
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
    status: {
        type: 'String',
        required: true,
        default: 'packing'
    },
    canceled: {
        type: Boolean,
        default: false,
    },
    date_canceled: {
        type: String,
    }
}, {
    timestamps: true
})

export default models.Transaction || model('Transaction', TransactionSchema)