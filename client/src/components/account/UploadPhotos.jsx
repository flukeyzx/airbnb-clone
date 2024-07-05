import axios from "axios";

const UploadPhotos = ({ photos, setPhotos }) => {
  const uploadPhotos = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photo", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data } = response;
        setPhotos((prev) => [...prev, ...data]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const selectAsMainPhoto = (filename) => {
    setPhotos([filename, ...photos.filter((photo) => photo !== filename)]);
  };

  const removePhotoHandler = (filename) => {
    setPhotos([filename, ...photos.filter((photo) => photo !== filename)]);
  };
  return (
    <div className="mt-2 gap-2 grid gird-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {photos.length > 0 &&
        photos.map((link) => (
          <div key={link} className="flex h-32 relative">
            <img
              src={"http://localhost:3000/uploads/" + link}
              alt={"photo"}
              className="rounded-2xl w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removePhotoHandler(link)}
              className="absolute bg-white text-slate-900 cursor-pointer hover:bg-opacity-100 right-1 top-1 p-2 bg-opacity-80 rounded-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            {link === photos[0] && (
              <button className="absolute bg-white text-slate-900 cursor-pointer hover:bg-opacity-100 left-1 top-1 p-2 bg-opacity-80 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            {link !== photos[0] && (
              <button
                type="button"
                onClick={() => selectAsMainPhoto(link)}
                className="absolute bg-white text-slate-900 cursor-pointer hover:bg-opacity-100 left-1 top-1 p-2 bg-opacity-80 rounded-2xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      <label className="border h-32 flex gap-1 justify-center items-center cursor-pointer bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
        <input
          type="file"
          multiple
          className="hidden"
          onChange={uploadPhotos}
        />
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
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        Upload
      </label>
    </div>
  );
};

export default UploadPhotos;
