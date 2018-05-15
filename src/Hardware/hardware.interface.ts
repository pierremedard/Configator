import { Document } from "mongoose";

export const enum HardwareType {
  CPU,
  MOTHERBOARD,
  RAM,
  COOLING,
  HEATPASTE,
  GPU,
  STORAGE,
  BURNER,
  CARDREADER,
  WIRELESSCARD,
  SOUNDCARD,
  CONTROLERCARD,
  CASE,
  PSU,
  CABLE,
  LED,
  OS,
  SCREEN,
  KEYBOARD,
  MOUSE,
  MOUSEPAD,
  HEADSET,
  MICRO,
  SPEAKER,
  PERIPHERIC
}

interface IHardware {
  name :string,
  price :number,
  description :string,
  url_review :string,
  url_buy :string,
  thumbsUp: number,
  thumbsdown: number,
  type: HardwareType,
  options: object
}

export interface IHardwareModel extends IHardware, Document {
}