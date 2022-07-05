import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  brand: string;
  description: string;
  countInStock: number;
  sold: number;
}

const OrderSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    countInStock: {
      required: true,
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
      required: false
    }
  },
  { timestamps: true }
);

export default model<IProduct>("Product", OrderSchema);
