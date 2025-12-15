import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "calc(100vh - 200px)" }}
    >
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <h2>Oops! Page Not Found</h2>
        <p className="lead">Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/quizes" className="btn btn-primary mt-3">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
