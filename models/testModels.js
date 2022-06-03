const { Schema, model, models } = require("mongoose");


const testSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
})

const Test = models.Test || model('Test', testSchema)

export default Test;