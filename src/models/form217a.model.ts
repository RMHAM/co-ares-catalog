import mongoose, { Schema, Types, model, models } from "mongoose";

export interface IForm217A {
  _id: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  description: string;
  frequencyBand: string;
  channels: Types.Array<IRadioChannel>;
}

export interface IRadioChannel {
  name: String;
  eligibleUsers: String;
  rxFreq: Number;
  rxWidth: String;
  rxTone: String;
  txFreq: Number;
  txWidth: String;
  txTone: String;
  mode: String;
  remarks: String;
  config: String;
  order: Number;
}

const Form217ASchema = new Schema<IForm217A>({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  frequencyBand: {
    type: String,
    required: true,
  },
  channels: Array<IRadioChannel>,
});

export const Form217A: mongoose.Model<IForm217A> =
  models.Form217A || model("Form217A", Form217ASchema);
