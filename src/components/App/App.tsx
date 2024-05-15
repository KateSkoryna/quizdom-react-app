import { NavbarComponent } from "../NavbarComponent/NavbarComponent";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";

function App() {
  return (
    <>
      <NavbarComponent />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
