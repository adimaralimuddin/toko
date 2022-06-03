import { model, models, Schema } from "mongoose";

const ProdCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    catImg: {
        type: String
    }
})

export default models.Prod_categories || model('Prod_categories', ProdCategorySchema)


