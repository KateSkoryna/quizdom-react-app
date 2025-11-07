import { Form } from "react-bootstrap";
import styles from "../../styles/components/quizform.module.scss";

const FormSelectComponent = ({
  fields,
  fieldsName,
  handleChange,
}: {
  fields: string[];
  fieldsName: string;
  handleChange: (value: string) => void;
}) => {
  return (
    <Form.Select
      className={styles.selectCategory}
      onChange={(e) => handleChange(e.target.value)}
      defaultValue={`Open ${fieldsName} menu`}
    >
      <option>{`Open ${fieldsName} menu`}</option>
      {fields.map((field) => (
        <option key={field} value={field}>
          {field}
        </option>
      ))}
    </Form.Select>
  );
};

export default FormSelectComponent;
