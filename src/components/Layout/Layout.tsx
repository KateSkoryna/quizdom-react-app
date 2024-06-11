import { NavbarComponent } from "../NavbarComponent/NavbarComponent";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../FooterComponents/Footer/Footer";
import { Suspense } from "react";
import Loader from "../Loader/Loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackComponent from "../ErrorFallbackComponent/ErrorFallbackComponent";

function Layout() {
  const navigate = useNavigate();
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackComponent}
      onReset={() => navigate("/")}
    >
      <Suspense fallback={<Loader />}>
        <NavbarComponent />
        <Outlet />
        <Footer />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Layout;
