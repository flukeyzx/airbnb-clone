const PhotoGallery = ({ place, setShowAllPhotos }) => {
  return (
    <div className="absolute inset-0 bg-black text-white min-h-screen">
      <div className="p-8 grid gap-4 bg-black">
        <div>
          <h1 className="text-3xl mr-48">{place.title}</h1>
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
};

export default PhotoGallery;
