import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const NewPlace = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/user-places")
      .then((response) => {
        setPlaces(response.data.places);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <div className="text-center">
      <Link
        to={"/account/places/new"}
        className="inline-flex gap-2 bg-primary text-white rounded-full py-2 px-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add new place
      </Link>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              key={place._id}
              className="flex cursor-pointer mt-4 gap-4 bg-gray-100 p-4 rounded-2xl hover:-translate-y-1 transition-transform"
            >
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                <img
                  src={"http://localhost:3000/uploads/" + place.photos[0]}
                  className="object-cover"
                />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl font-semibold text-start">
                  {place.title}
                </h2>
                <p className="text-sm mt-2 max-h-20 overflow-hidden text-start text-gray-700">
                  {place.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default NewPlace;
