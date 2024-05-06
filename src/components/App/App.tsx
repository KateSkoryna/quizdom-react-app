import "bootstrap/dist/css/bootstrap.min.css";
import { NavbarComponent } from "../NavbarComponent/NavbarComponent";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
}

export default App;
