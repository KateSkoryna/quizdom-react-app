import { useRouteError } from "react-router-dom";
import { NavbarComponent } from "../../components/NavbarComponent/NavbarComponent";

const NotFoundPage = () => {
  const error: { statusText?: string; message?: string } = useRouteError() as {
    statusText?: string;
    message?: string;
  };

  console.log(error);

  return (
    <div id="error-page">
      <NavbarComponent />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default NotFoundPage;
