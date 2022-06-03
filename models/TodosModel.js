import { model, models, Schema } from "mongoose";

const TodosSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
    }
}, {
    timestamps: true
})

const Todos = models.Todos || model('Todos', TodosSchema)
export default Todos;