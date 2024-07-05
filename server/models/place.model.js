import mongoose, { Schema } from "mongoose";

const placeSchema = new Schema({
  title: String,
  address: String,
  description: String,
  photos: [String],
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Place = mongoose.model("Place", placeSchema);
