import { NavbarComponent } from "../NavbarComponent/NavbarComponent";
import { Outlet } from "react-router-dom";
import { Footer } from "../FooterComponents/Footer/Footer";

function Layout() {
  return (
    <>
      <NavbarComponent />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
