import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Perks from "./account/Perks";
import NewPlace from "./account/NewPlace";
import AddPhotos from "./account/AddPhotos";
import UploadPhotos from "./account/UploadPhotos";
import axios from "axios";
import { useSnackbar } from "notistack";

const Places = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [guests, setGuests] = useState(0);
  const [price, setPrice] = useState(0);
  const [id, setId] = useState("");

  let { action } = useParams();
  if (action === undefined) {
    action = "new place";
  }
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (action === "new place" || action === "new") {
      setId("");
      return;
    }
    setId(action);
  }, [action]);

  useEffect(() => {
    if (id) {
      axios.get("/place/" + id).then((response) => {
        const { place } = response.data;
        setTitle(place.title || "");
        setAddress(place.address || "");
        setPhotos(place.photos || []);
        setDescription(place.description || "");
        setPerks(place.perks || []);
        setExtraInfo(place.extraInfo || "");
        setCheckInTime(place.checkIn || "");
        setCheckOutTime(place.checkOut || "");
        setGuests(place.maxGuests || 0);
        setPrice(place.price || 0);
      });
    }
  }, [id]);

  useEffect(() => {
    if (action === "new") {
      setTitle("");
      setAddress("");
      setPhotos([]);
      setDescription("");
      setPerks([]);
      setExtraInfo("");
      setCheckInTime("");
      setCheckOutTime("");
      setGuests(0);
      setPrice(0);
    }
  }, [action]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
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
    };
    if (id) {
      axios
        .put("/place/update", { id, data })
        .then(() => {
          enqueueSnackbar("Place updated Successfully", { variant: "success" });
          setId("");
          navigate("/account/places");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      axios
        .post("/places/new", data)
        .then(() => {
          enqueueSnackbar("New Place added Successfully", {
            variant: "success",
          });
          navigate("/account/places");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div>
      {action === "new place" && <NewPlace />}
      {(action === "new" || id) && (
        <div>
          <form onSubmit={formSubmitHandler}>
            <h2 className="text-2xl mt-4">Title</h2>
            <p className="text-sm text-gray-500">
              Title for your place. should be short and catchy as in
              advertisement
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="title, for example: My lovely apartment"
            />
            <h2 className="text-2xl mt-4">Address</h2>
            <p className="text-sm text-gray-500">Address to this place</p>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="address"
            />
            <AddPhotos setPhotos={setPhotos} />
            <UploadPhotos photos={photos} setPhotos={setPhotos} />
            <h2 className="mt-4 text-2xl">Description</h2>
            <p className="text-sm text-gray-500">Description</p>
            <textarea
              className="py-8"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <h2 className="mt-4 text-2xl">Perks</h2>
            <p className="text-sm text-gray-500">
              Select all the perks of your place
            </p>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2">
              <Perks perks={perks} setPerks={setPerks} />
            </div>
            <h2 className="mt-4 text-2xl">Extra info</h2>
            <p className="text-sm text-gray-500">house rules, etc</p>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              required
            />
            <h2 className="mt-4 text-2xl">Check in & out time</h2>
            <p className="text-sm text-gray-500">
              add check in and out time, also the maximum number of guests.
            </p>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type="text"
                  value={checkInTime}
                  onChange={(e) => setCheckInTime(e.target.value)}
                  required
                  placeholder="14:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  type="text"
                  value={checkOutTime}
                  onChange={(e) => setCheckOutTime(e.target.value)}
                  required
                  placeholder="18:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Number of guests</h3>
                <input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  required
                  placeholder="0"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder="0"
                />
              </div>
            </div>
            <button className="primary mt-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Places;
