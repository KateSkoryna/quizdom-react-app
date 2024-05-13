import "bootstrap/dist/css/bootstrap.min.css";
import { NavbarComponent } from "../NavbarComponent/NavbarComponent";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";

function App() {
  return (
    <>
      <NavbarComponent />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
