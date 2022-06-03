import { model, models, Schema } from "mongoose";


const AccountSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
    },
    country: {
        type: String,
        default: 'none'
    },
    city: {
        type: String,
        default: 'none'
    },
    street: {
        type: String,
        default: 'none'
    },
    houseNumber: {
        type: Number,
        default: null
    },

}, {
    timestamps: true
}
)

export default models?.Account || model('Account', AccountSchema)