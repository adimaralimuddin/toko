import initStripe from "stripe";
import { buffer } from "micro";
import Cart from "../../../models/Cart";
import Transaction from "../../../models/Transaction";
import mongoose, { Types } from "mongoose";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.log(req.method + " not allowed");
    return res.send();
  }

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers["stripe-signature"];
  const signingSecret =
    "whsec_6f9c75f4653babf8f04b2a081700ed80b57f58127c22adb8a95b8d1460351288";
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error) {
    console.log(error);
    return res.status(400).send(`webhook error: ${error.message}`);
  }

  const object = event.data.object;

  //  handle event here

  if (event.type == "checkout.session.completed") {
    const {
      metadata: { userId },
    } = object;

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

  } // end if event.typ == checkout.session.completed


  res.send({ received: true });
}
