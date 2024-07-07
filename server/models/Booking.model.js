import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  place: {
    type: Schema.Types.ObjectId,
    ref: "Place",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  phone: String,
  checkIn: String,
  checkOut: String,
  maxGuests: String,
  price: Number,
});

export const Booking = mongoose.model("Booking", bookingSchema);
