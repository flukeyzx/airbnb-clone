import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AuthContext } from "../AuthProvider.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useContext(AuthContext);

  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post("/login", {
        email,
        password,
      })
      .then((response) => {
        enqueueSnackbar(response.data.message, { variant: "success" });
        setUser(response.data.isUserRegistered);
        navigate("/");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
        } else {
          enqueueSnackbar("Login Failed", { variant: "error" });
        }
      });
  };
  return (
    <div className="flex justify-around items-center mt-4 grow">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={loginHandler}>
          <input
            type="email"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-center py-2">
            Don't have an account?{" "}
            <Link to="/register" className="underline text-black">
              {" "}
              Register Now
            </Link>
          </p>
          <button className="primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
