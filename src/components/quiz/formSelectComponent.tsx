import { Form } from "react-bootstrap";
import styles from "../../styles/components/quizform.module.scss";

type FormSelectProps = {
  fields: string[];
  fieldsName: string;
  handleChange: (value: string) => void;
};

const FormSelectComponent = ({
  fields,
  fieldsName,
  handleChange,
}: FormSelectProps) => {
  return (
    <Form.Select
      className={styles.selectCategory}
      onChange={(e) => handleChange(e.target.value)}
      defaultValue={`Open ${fieldsName} menu`}
      name="fieldsName"
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
