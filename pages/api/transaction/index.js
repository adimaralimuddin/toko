import Transaction from "../../../models/Transaction"
import Cart from "../../../models/Cart"
import mongoose, { Types } from "mongoose"


export default async function handler(req, res) {
    const { method, body, query: { userId } } = req

    if (method === 'GET') {
        try {
            console.log(userId)
            const transactions = await Transaction.find({ userId })
            console.log('trans: ', transactions)
            return res.status(200).json(transactions)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    if (method === 'POST') {
        try {
            console.log('add to cart')
            const cart = await Cart.find({ userId, checked: true })
            console.log('cart', cart)
            const purchase = await Promise.all(
                cart.map(async item => {
                    console.log('item')
                    const transItem = new Transaction(item)
                    transItem._id = mongoose.Types.ObjectId()
                    transItem.isNew = true;
                    await transItem.save()
                    await Cart.findByIdAndDelete(mongoose.Types.ObjectId(item?._id))
                    return transItem
                })
            )
            console.log(purchase)
            return res.status(200).json({ success: true })
        } catch (error) {
            console.log('has error', error)
            return res.status(500).json({ error })
        }
    }
}