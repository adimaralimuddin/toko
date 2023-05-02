const { default: Test } = require("../../models/testModels");
const { default: connectMongo } = require("../../utils/connectMongoose");

export default async function addTest(req, res) {
    try {
        await connectMongo()

        const test = await Test.create(req.body)

        res.json(test)
    } catch (e) {
        res.status(500).json({ error: e })
    }
}