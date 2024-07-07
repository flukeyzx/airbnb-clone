import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthProvider.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import Places from "../components/Places.jsx";
import Navbar from "../components/account/Navbar.jsx";

const Account = () => {
  const { user, ready, setUser, setReady } = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { subpage } = useParams();
  const [page, setPage] = useState(subpage);

  useEffect(() => {
    setPage(subpage);
  }, [subpage]);

  useEffect(() => {
    if (user && !ready) {
      setReady(true);
    }
  }, [user, ready, setReady]);

  useEffect(() => {
    if (ready && !user) {
      navigate("/login");
    }
  }, [ready, user, navigate]);

  if (!ready) {
    return (
      <div className="flex justify-center items-center h-96 animate-pulse">
        Loading...
      </div>
    );
  }

  const logoutHandler = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      setReady(false);
      enqueueSnackbar("Logged out successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Failed to log out", { variant: "error" });
    }
  };
  return (
    <div>
      <Navbar page={page} />
      {subpage === undefined && user && (
        <div className="text-center mx-auto max-w-lg mt-8">
          Logged In as {user.name} ({user.email}) <br />
          <button
            className="primary mt-4 text-white rounded-full max-w-sm"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && user && <Places />}
    </div>
  );
};

export default Account;
