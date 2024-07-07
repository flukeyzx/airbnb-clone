import { Booking } from "../models/Booking.model.js";

export const newBooking = async (req, res) => {
  const {
    userId,
    placeId,
    name,
    phone,
    checkInTime,
    checkOutTime,
    guests,
    price,
  } = req.body;

  if (!placeId || !name) {
    return res.status(400).json({ message: "Please send all the details" });
  }

  const data = new Booking({
    place: placeId,
    user: userId,
    name,
    phone,
    checkIn: checkInTime,
    checkOut: checkOutTime,
    maxGuests: guests,
    price,
  });

  const booking = await data.save();

  return res
    .status(201)
    .json({ success: true, message: "Booking created successfully", booking });
};

export const getBookings = async (req, res) => {
  const userId = req.user.userId;
  const bookings = await Booking.find({ user: userId }).populate("place");

  if (bookings) {
    return res.status(200).json({ bookings });
  }
};
