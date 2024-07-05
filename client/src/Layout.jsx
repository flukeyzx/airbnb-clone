import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div className="py-4 px-8 min-h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
