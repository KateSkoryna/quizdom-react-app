import NavbarContainer from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { Suspense } from "react";
import Loader from "../common/Loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackComponent from "../common/ErrorFallbackComponent";

function Layout() {
  const navigate = useNavigate();
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackComponent}
      onReset={() => navigate("/")}
    >
      <Suspense fallback={<Loader />}>
        <NavbarContainer />
        <Outlet />
        <Footer />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Layout;
