import Cart from "../../../models/Cart";

export default async function handler(req, res) {
  const { method, body, query } = req;

  const { type, userId, value } = body;
  console.log(body);

  if (method === "GET") {
    if (type == "selected") {
      try {
        const toPays = await Cart.find({ userId: query.userId, checked: true });
        return res.status(200).json(toPays);
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      try {
        const carts = await Cart.find({ userId: query.userId });
        return res.status(200).json(carts);
      } catch (error) {
        return res.status(500).json({ error });
      }
    }
  }

  if (method === "POST") {
    try {
      const cart = new Cart(body);
      cart.total = cart.curPrice * cart.quantity;

      const saveCart = await cart.save();

      return res.status(200).json(saveCart);
    } catch (error) {
      res.status(500).json({ message: "unabel to add cart", error });
    }
  }

  if (method === "PUT") {
    console.log(userId);
    try {
      const test = await Cart.updateMany({ userId }, { checked: true });
      console.log(test);
      return res.status(200).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  return res.status(500).json({ message: "only POST method allowed", method });
}
