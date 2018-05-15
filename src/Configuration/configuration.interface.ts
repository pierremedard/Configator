import { Document, Types } from "mongoose";

interface IConfiguration {
  ids_hardware: [Types.ObjectId],
  description: string,
  owner: string,
  thumbsUp: number,
  thumbsdown: number
}

export interface IConfigurationModel extends IConfiguration, Document {
}