import { Controller, useFormContext } from "react-hook-form";
import { convertComplexity } from "../../helpers/convertComplexity";
import { Form } from "react-bootstrap";

export const FormRangeComponent = ({ fieldName }: { fieldName: string }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, value } }) => (
        <Form.Group className="mb-3" controlId={fieldName}>
          <Form.Label>Complexity level: {convertComplexity(value)}</Form.Label>
          <Form.Range
            onChange={onChange}
            min={1}
            max={4}
            step={1}
            defaultValue={1}
            value={value}
          />
        </Form.Group>
      )}
    />
  );
};
