import NavbarContainer from "./navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./footer";
import { Suspense } from "react";
import Loader from "../common/loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../fallback/fallback";

function Layout() {
  const navigate = useNavigate();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => navigate("/")}>
      <Suspense fallback={<Loader />}>
        <NavbarContainer />
        <main>
          <Outlet />
        </main>
        <Footer />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Layout;
