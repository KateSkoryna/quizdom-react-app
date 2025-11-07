import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "calc(100vh - 200px)" }}
    >
      <div className="text-center">
        <h1 className="display-1">403</h1>
        <h2>Access Denied</h2>
        <p className="lead">You need to be logged in to access this page.</p>
        <div className="mt-4">
          <Link to="/login" className="btn btn-primary me-3">
            Log In
          </Link>
          <Link to="/signup" className="btn btn-primary me-3">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
