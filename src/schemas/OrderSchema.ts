import { Schema, model, Document } from "mongoose";

export interface IOrder extends Document {
  customerId: any;
  items: any;
  phone: string;
  address: string;
  paymentType: string;
  status: boolean;
  code: string
}

const OrderSchema: Schema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true }
      },
    ],
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      default: "COD",
    },
    status: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String
    }
  },
  { timestamps: true }
);

export default model<IOrder>("Order", OrderSchema);
