import { NavbarComponent } from "../NavbarComponent/NavbarComponent";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { AuthProvider } from "../../context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <NavbarComponent />
      <Outlet />
      <Footer />
    </AuthProvider>
  );
}

export default App;
