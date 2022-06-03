import Cart from "../../../models/Cart";



export default async function handler(req, res) {
    const { method, query: { value, type, id } } = req;
    if (method == 'PUT') {
        console.log({ value, type, id })
        try {

            if (type == 'select') {
                const cart = await Cart.findById(id)
                cart.checked = value
                await cart.save()
                console.log(cart);
                return res.status(200).json(cart)
            }
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    // if (method == 'GET') {
    //     try {
    //         const cart = await Cart
    //     } catch (error) {
    //         res.status(500).json({ error })
    //     }
    // }
}