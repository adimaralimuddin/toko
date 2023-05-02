import Cart from "../../../models/Cart";

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;

  const { type, userId, value } = body;

  if (method == "DELETE") {
    try {
      const deleteToPay = await Cart.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ success: true, message: "successfully removed item" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  if (method == "PUT") {
    switch (type) {
      case "inc":
        try {
          const cart = await Cart.findOne({ _id: id, userId });
          cart.quantity = cart.quantity += 1;
          cart.total = cart.curPrice * cart.quantity;
          const savedCart = await cart.save();
          return res.status(200).json(savedCart);
        } catch (error) {
          return res.status(500).json({ error });
        }
      case "dec":
        try {
          const cart = await Cart.findOne({ _id: id, userId });
          if (cart.quantity <= 1) return res.status(200).json(cart);
          cart.quantity = cart.quantity -= 1;
          cart.total = cart.curPrice * cart.quantity;
          const savedCart = await cart.save();
          return res.status(200).json(savedCart);
        } catch (error) {
          return res.status(500).json({ error });
        }
      case "select":
        try {
          const cart = await Cart.findById(id);
          cart.checked = value;
          await cart.save();
          return res.status(200).json(cart);
        } catch (error) {
          return res.status(500).json({ error });
        }

      default:
        break;
    }
  }
}
