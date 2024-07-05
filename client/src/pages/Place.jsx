import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Place = () => {
  const [place, setPlace] = useState([]);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    axios
      .get("/place/" + id)
      .then((response) => {
        setPlace(response.data.place);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="p-8 grid gap-4 bg-black">
          <div>
            <h1 className="text-3xl">{place.title}</h1>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex gap-1 fixed top-8 right-10 bg-white text-black px-4 py-2 rounded-xl shadow-md shadow-gray-500 hover:-translate-y-1 hover:opacity-85"
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Close Photos
            </button>
          </div>
          {place.photos.length > 0 &&
            place.photos.map((photo, index) => (
              <div
                key={index}
                className="flex-1 flex justify-center items-center"
              >
                <img
                  className="w-full h-full object-cover"
                  src={"http://localhost:3000/uploads/" + photo}
                  alt={`photo-${index}`}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="font-semibold flex gap-1 my-3 underline"
        target="_blank"
        href={`https://maps.google.com?q=${place.address}`}
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
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr+1fr] rounded-2xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  className="aspect-square object-cover"
                  src={"http://localhost:3000/uploads/" + place.photos?.[0]}
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover"
                src={"http://localhost:3000/uploads/" + place.photos?.[1]}
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  className="aspect-square object-cover relative top-2"
                  src={"http://localhost:3000/uploads/" + place.photos?.[2]}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 bg-white py-2 px-4 rounded-2xl shadow-md shadow-gray-500 hover:-translate-y-1 hover:opacity-85 transition-transform"
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
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          Show more photos
        </button>
      </div>
    </div>
  );
};

export default Place;
