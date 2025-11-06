import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormFooterProps } from "../../types/types";

const FormFooter = ({ mainText, text, path }: FormFooterProps) => {
  return (
    <>
      <Form.Text className="d-block mx-auto text-center">
        {mainText}
        <Link className="text-primary" to={path}>
          {text}
        </Link>
      </Form.Text>
    </>
  );
};

export default FormFooter;
