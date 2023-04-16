import mongoose, { Schema, model, models } from "mongoose";

export interface IOrganization {
  _id: mongoose.Types.ObjectId;
  name: string;
}

const OrganizationSchema = new Schema<IOrganization>({
  name: {
    type: String,
    required: true,
  },
});

export const Organization: mongoose.Model<IOrganization> =
  models.Organization || model("Organization", OrganizationSchema);
