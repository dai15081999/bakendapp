import { Schema, model, Document } from "mongoose";

export interface IReview extends Document {
  productId: any
  start: number
  name: string
  review: string
}

const ReviewSchema: Schema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    start: {
      type: Number,
      default: 1,
    },
    review: {
      type: String,
      requried: true,
    },
  },
  { timestamps: true }
)

export default model<IReview>("Review", ReviewSchema);
