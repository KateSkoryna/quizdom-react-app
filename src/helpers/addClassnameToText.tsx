import { Form } from "react-bootstrap";

const addClassnameToText = (classNameText: string, message = "No errors") => {
  return <Form.Text className={classNameText}>{message}</Form.Text>;
};

export default addClassnameToText;
