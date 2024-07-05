import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const registerHandler = async (e) => {
    e.preventDefault();
    axios
      .post("/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);

        enqueueSnackbar(
          response.data.message,
          response.data.success === true
            ? { variant: "success" }
            : { variant: "error" }
        );
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
        } else {
          enqueueSnackbar("Registration Failed", { variant: "error" });
        }
      });
  };
  return (
    <div className="flex justify-around items-center mt-4 grow">
      <div className="mb-24">
        <h1 className="text-4xl text-center mb-4">Create an Account</h1>
        <form className="max-w-md mx-auto" onSubmit={registerHandler}>
          <input
            type="text"
            placeholder="John Doe"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-center py-2">
            Already have an account?{" "}
            <Link to="/login" className="underline text-black">
              {" "}
              Login Now
            </Link>
          </p>
          <button className="primary">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
