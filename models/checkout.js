import { model, models, Schema } from "mongoose";

const CheckoutSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    items: {
      type: [
        {
          productId: Schema.Types.ObjectId,
          userId: Schema.Types.ObjectId,
          name: String,
          curPrice: Number,
          quantity: Number,
          total: Number,
          image: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Checkout || model("Checkout", CheckoutSchema);
