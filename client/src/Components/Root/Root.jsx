import { useLocation } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Root() {
  const location = useLocation();

  // pages where Navbar + Footer should be hidden
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  return (
    <div>
      {!hideLayout && <Navbar />}
      <Outlet />
      {!hideLayout && <Footer />}
    </div>
  );
}
