const { default: Test } = require("../../models/testModels");
const { default: connectMongo } = require("../../utils/connectMongoose");

export default async function addTest(req, res) {
    try {
        console.log('connecting to mongo')
        await connectMongo()
        console.log('connected to mongo')

        console.log('creating test document')
        const test = await Test.create(req.body)
        console.log('test document created')

        res.json(test)
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: e })
    }
}