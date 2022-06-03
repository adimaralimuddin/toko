

import Cart from '../../../models/Cart'
// import mongoose from 'mongoose'

export default async function handler(req, res) {

    const { method, body, query: { userId, id, type } } = req

    if (method === 'GET') {
        const toPays = await Cart.find({ userId })
        return res.status(200).json(toPays)
    }

    if (method == 'DELETE') {
        console.log(id)
        const deleteToPay = await Cart.findByIdAndDelete(id)
        console.log(deleteToPay)
        return res.status(200).json({ success: true, message: 'successfully removed item' })
    }

    if (method === 'POST') {
        try {
            const cart = new Cart(body)
            cart.total = cart.curPrice * cart.quantity

            const saveCart = await cart.save()

            return res.status(200).json(saveCart)
        } catch (error) {
            res.status(500).json({ message: 'unabel to add cart', error })
        }
    }

    if (method === 'PUT') {
        if (type == 'inc_qnty') {
            try {
                const cart = await Cart.findById(id)
                cart.quantity = cart.quantity += 1
                cart.total = cart.curPrice * cart.quantity
                const savedCart = await cart.save()
                return res.status(200).json(savedCart)
            } catch (error) {
                return res.status(500).json({ error })
            }
        }
        if (type == 'dec_qnty') {
            try {
                const cart = await Cart.findById(id)
                if (cart.quantity <= 1) return res.status(200).json(cart)
                cart.quantity = cart.quantity -= 1
                cart.total = cart.curPrice * cart.quantity
                const savedCart = await cart.save()
                return res.status(200).json(savedCart)
            } catch (error) {
                return res.status(500).json({ error })
            }
        }
        return res.status(500).json({ message: 'type not specified' })
    }

    return res.status(500).json({ message: 'only POST method allowed', method })
}




