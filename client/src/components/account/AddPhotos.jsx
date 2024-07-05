import axios from "axios";
import { useState } from "react";

const AddPhotos = ({ setPhotos }) => {
  const [photoLink, setPhotoLink] = useState("");
  const addPhotoByLink = async () => {
    const { data } = await axios.post("/upload-by-link", { link: photoLink });
    setPhotos((prev) => [...prev, data]);
    setPhotoLink("");
  };
  return (
    <>
      <h2 className="text-2xl mt-4">Photos</h2>
      <p className="text-sm text-gray-500 ">more = better</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder="Add using a link ...jpg"
        />
        <button
          onClick={addPhotoByLink}
          type="button"
          className="bg-gray-200 rounded-2xl px-2"
        >
          Add&nbsp;photo
        </button>
      </div>
    </>
  );
};

export default AddPhotos;
