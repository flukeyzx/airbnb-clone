import jwt from "jsonwebtoken";
import { Place } from "../models/place.model.js";

export const addNewPlace = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkInTime,
    checkOutTime,
    guests,
    price,
  } = req.body;

  const newPlace = new Place({
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn: checkInTime,
    checkOut: checkOutTime,
    maxGuests: guests,
    owner: decoded.userId,
    price,
  });

  await newPlace.save();

  return res
    .status(200)
    .json({ success: true, message: "New Place added successfully", newPlace });
};

export const getAllUserPlaces = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const places = await Place.find({ owner: decoded.userId });

  if (places) {
    return res
      .status(200)
      .json({ success: true, message: "places found successfulyy", places });
  }
};

export const getPlace = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);

  if (place) {
    return res
      .status(200)
      .json({ success: true, message: "Place found successfully", place });
  }
};

export const updatePlace = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { id, data } = req.body;

  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkInTime,
    checkOutTime,
    guests,
    price,
  } = data;

  if (!id)
    return res
      .status(400)
      .json({ success: false, message: "please provide id for the place" });

  const place = await Place.findById(id);

  if (decoded.userId === place.owner.toString()) {
    place.set({
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn: checkInTime,
      checkOut: checkOutTime,
      maxGuests: guests,
      price,
    });

    const updatedPlace = await place.save();

    return res.status(200).json({
      success: true,
      message: "Place updated successfully",
      updatedPlace,
    });
  }

  return res
    .status(500)
    .json({ message: "Internal server error updating a place" });
};

export const getAllPlaces = async (req, res) => {
  const places = await Place.find();

  if (places) {
    return res
      .status(200)
      .json({ success: true, message: "Places fetched successfully", places });
  }

  return res
    .status(404)
    .json({ success: false, message: "There are no places in the database" });
};
