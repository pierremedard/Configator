import { Document, Types } from "mongoose";

interface IDiscout {
  ids_product: [Types.ObjectId],
  total_discount: number,
  description: string,
  url_buy: string,
  owner: string,
  expiration: Date,
  thumbsUp: number,
  thumbsdown: number
}

export interface IDiscountModel extends IDiscout, Document {
}