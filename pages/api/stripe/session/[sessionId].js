import mongoose from "mongoose";
import Stripe from "stripe";
import Cart from "../../../../models/Cart";
import Transaction from "../../../../models/Transaction";
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);
const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { sessionId, userId } = req.query;
      if (!sessionId.startsWith("cs_")) {
        throw Error("Incorrect Checkout Session Id :" + sessionId);
      }

      const checkoutSession = await stripe.checkout.sessions.retrieve(
        sessionId,
        {
          expand: ["payment_intent", "line_items.data.price.product"],
        }
      );

      const carts = await Cart.find({ userId, checked: true });
      const purchase = await Promise.all(
        carts.map(async (item) => {
          const transItem = new Transaction(item);
          transItem._id = mongoose.Types.ObjectId();
          transItem.isNew = true;
          await transItem.save();
          await Cart.findByIdAndDelete(mongoose.Types.ObjectId(item?._id));
          return transItem;
        })
      );

      return res.status(200).json(checkoutSession);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(500).json({ statusCode: 500, message: errorMessage });
    }

    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed.");
  }
};
export default handler;
