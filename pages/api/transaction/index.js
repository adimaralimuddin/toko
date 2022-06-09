import Transaction from "../../../models/Transaction";
import Cart from "../../../models/Cart";
import mongoose, { Types } from "mongoose";

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { userId },
  } = req;

  if (method === "GET") {
    try {
      const transactions = await Transaction.find({ userId });
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  if (method === "POST") {
    try {
      const cart = await Cart.find({ userId, checked: true });
      const purchase = await Promise.all(
        cart.map(async (item) => {
          const transItem = new Transaction(item);
          transItem._id = mongoose.Types.ObjectId();
          transItem.isNew = true;
          await transItem.save();
          await Cart.findByIdAndDelete(mongoose.Types.ObjectId(item?._id));
          return transItem;
        })
      );
      return res.status(200).json({ success: true });
    } catch (error) {
      console.log("has error", error);
      return res.status(500).json({ error });
    }
  }
}
