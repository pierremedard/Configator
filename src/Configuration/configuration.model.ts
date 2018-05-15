import { Schema, model, Types } from "mongoose";
import { IConfigurationModel } from "./configuration.interface";

const configurationSchema = new Schema({
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
  thumbsUp: {
    type: Number,
    default: 0
  },
  thumbsdown: {
    type: Number,
    default: 0
  }
})

export default model<IConfigurationModel>("Configuration", configurationSchema);