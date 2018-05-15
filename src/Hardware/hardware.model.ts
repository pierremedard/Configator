import { Schema, model } from "mongoose";
import { IHardwareModel, HardwareType } from "./hardware.interface";

const HardwareSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price :{
    type: Number,
    required: true    
  },
  description: {
    type: String,
    default: ""
  },
  url_buy: {
    type: String,
    required: true
  },
  thumbsUp: {
    type: Number,
    default: 0
  },
  thumbsdown: {
    type: Number,
    default: 0
  },
  type: {
    type: Number,
    required: true
  },
  url_review: String,
  options: Object
});

export default model<IHardwareModel>("Hardware", HardwareSchema);