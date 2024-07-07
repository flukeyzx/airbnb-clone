import { useContext, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";

const BookingWidget = ({ place }) => {
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [guests, setGuests] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  let numberOfNights = 0;

  if (checkInTime && checkOutTime) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOutTime),
      new Date(checkInTime)
    );
  }

  const submitBookingHandler = () => {
    if (!user) {
      enqueueSnackbar("Please login first in order to book a place", {
        variant: "error",
      });
      return navigate("/login");
    }
    if (numberOfNights < 0) {
      return enqueueSnackbar(
        "The check-out time must be greater than check-in. ",
        {
          variant: "error",
        }
      );
    }
    const data = {
      userId: user._id,
      placeId: place._id,
      name,
      phone,
      checkInTime,
      checkOutTime,
      guests,
      price: numberOfNights * place.price,
    };
    axios
      .post("/booking", data)
      .then((response) => {
        setCheckInTime("");
        setCheckOutTime("");
        setGuests(0);
        setName("");
        navigate("/account/bookings");
        enqueueSnackbar(response.data.message, { variant: "success" });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div
      className={`bg-white py-4 ${
        numberOfNights === 0 ? "max-h-96" : "max-h-[650px]"
      } rounded-2xl px-2`}
    >
      <p className="text-2xl text-center font-semibold mt-2">
        Price: ${place.price} / per night
      </p>
      <div className="grid grid-cols-2 border text-center mt-4 mx-4 px-2 py-4">
        <div>
          Check In Time:
          <input
            type="date"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
            required
            className="cursor-pointer"
          />
        </div>
        <div>
          Check Out Time:
          <input
            type="date"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
            required
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="border mt-2 mx-4 px-2 py-4">
        Number of guests:
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
        />
      </div>
      {checkInTime && checkOutTime && (
        <div>
          <div className="border mt-2 mx-4 px-2 py-4">
            Enter your name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>
          <div className="border mt-2 mx-4 px-2 py-4">
            Enter your Phone:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+923124527029"
            />
          </div>
        </div>
      )}
      <button onClick={submitBookingHandler} className="primary mt-10">
        Book this place
        {numberOfNights > 0 && (
          <span className="pl-1">: ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
