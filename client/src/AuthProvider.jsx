import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    axios
      .get("/profile")
      .then((response) => {
        setUser(response.data);
        setReady(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
