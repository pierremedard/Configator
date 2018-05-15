import { Schema, model, Types } from "mongoose";
import { IDiscountModel } from "./discount.interface";

const discountSchema = new Schema({
  id_product: {
    type: Types.ObjectId,
    required: true
  },
  total_discount: {
    type: Number,
    required: true
  },
  description: String,
  url_buy: {
    type: String,
    required: true
  },
  owner: {
    type: Types.ObjectId,
    required: true
  },
  expiration: {
    type: Date,
    required: true
  },
  thumbsUp: {
    type: Number,
    default: 0
  },
  thumbsdown: {
    type: Number,
    default: 0
  }
});

export default model<IDiscountModel>("Discount", discountSchema);