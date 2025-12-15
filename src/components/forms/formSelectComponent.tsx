import { Form } from "react-bootstrap";
import styles from "../../styles/pages/home.module.scss";
import { Controller, Control } from "react-hook-form";

type FormSelectProps = {
  fields: string[];
  fieldsName: string;
  control: Control<any>;
};

const FormSelectComponent = ({ fields, fieldsName, control }: FormSelectProps) => {
  return (
    <Controller
      name={fieldsName}
      control={control}
      render={({ field }) => (
        <Form.Select
          className={styles.selectCategory}
          onChange={(e) => field.onChange(e.target.value)}
          value={field.value || "All"}
          name={fieldsName}
        >
          <option value="All">All</option>
          {fields.map((fieldValue) => (
            <option key={fieldValue} value={fieldValue}>
              {fieldValue}
            </option>
          ))}
        </Form.Select>
      )}
    />
  );
};

export default FormSelectComponent;
