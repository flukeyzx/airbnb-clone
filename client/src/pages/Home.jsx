import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/places")
      .then((response) => {
        setPlaces(response.data.places);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            key={place._id}
            to={"/place/" + place._id}
            className="cursor-pointer hover:-translate-y-1 transition-transform"
          >
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl aspect-square object-cover"
                  src={"http://localhost:3000/uploads/" + place.photos?.[0]}
                />
              )}
            </div>
            <h3 className="font-semibold">{place.address}</h3>
            <h2 className="text-sm text-gray-500">{place.title}</h2>
            <div className="mt-1">
              <span className="font-semibold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Home;
