import { Error } from "@mui/icons-material";
import Stripe from "stripe";
import Cart from "../../models/Cart";
import Transaction from "../../models/Transaction";
import mongoose, { Types } from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { body } = req;
  const { userId, paymentMethod, email } = body;
  console.log("checkout session api");
  if (req.method === "POST") {
    console.log("payment method ", paymentMethod);
    if (paymentMethod == "cash") {
      console.log("handle cash on dilivery");
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
        console.log(purchase);
        return res
          .status(200)
          .json({
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/account/purchase`,
          });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
      }
    } else {
      // return res.send();
      try {
        console.log("checkout api_ ", userId);

        const carts = await Cart.find({ userId, checked: true });
        console.log("carts created ", carts?.length);

        const line_items = carts?.map((cart) => ({
          price_data: {
            currency: "usd",
            unit_amount: Math.round(cart?.curPrice * 100),
            product_data: { name: cart?.name },
            product_data: {
              name: cart?.name,
              images: [cart?.image],
            },
          },
          quantity: cart?.quantity,
        }));

        const shippingFee = () =>
          carts?.reduce((total, item) => total + item?.shipingFee, 0);

        console.log("shiping fee ", shippingFee());

        const metadata = { userId };
        const session = await stripe.checkout.sessions.create({
          line_items,
          customer_email: email,
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: shippingFee() * 100,
                  currency: "usd",
                },
                display_name: "standard shiping",
                // Delivers between 5-7 business days
                delivery_estimate: {
                  minimum: {
                    unit: "business_day",
                    value: 5,
                  },
                  maximum: {
                    unit: "business_day",
                    value: 7,
                  },
                },
              },
            },
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: (shippingFee() + 10) * 100,
                  currency: "usd",
                },
                display_name: "Next day air",
                // Delivers in exactly 1 business day
                delivery_estimate: {
                  minimum: {
                    unit: "business_day",
                    value: 1,
                  },
                  maximum: {
                    unit: "business_day",
                    value: 1,
                  },
                },
              },
            },
          ],
          mode: "payment",
          metadata,
          success_url: `${req.headers.origin}/account/purchase`,
          cancel_url: `${req.headers.origin}/checkout/?canceled=true`,
        });

        console.log(session.url);

        return res.status(200).json({ url: session.url });
      } catch (err) {
        console.log(err);
        res.status(err.statusCode || 500).json(err.message);
      }
    }
    // end of post method
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
