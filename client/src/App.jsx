import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import axios from "axios";
import AuthProvider from "./AuthProvider.jsx";
import Account from "./pages/Account.jsx";
import Place from "./pages/Place.jsx";
import Bookings from "./pages/Bookings.jsx";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:subpage?" element={<Account />} />
          <Route path="/account/:subpage?/:action?" element={<Account />} />
          <Route path="/place/:id" element={<Place />} />
          <Route path="/account/bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
