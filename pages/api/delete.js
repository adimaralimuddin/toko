import Test from "../../models/testModels"
import connectMongo from "../../utils/connectMongoose"


export default async function handler(req, res) {
    if (req.method !== 'DELETE') return
    try {

        await connectMongo()

        await Test.findByIdAndDelete(req.body?.id)
    } catch (error) {
        res.status(500).json({ error })
    }
}

