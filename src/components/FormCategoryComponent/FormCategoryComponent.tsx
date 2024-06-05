import { useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";
import { QUIZ_CATEGORY } from "../../const/const";

export const FormCategoryComponent = ({ fieldName }: { fieldName: string }) => {
  const entries = Object.entries(QUIZ_CATEGORY);
  const { register } = useFormContext();
  return (
    <Form.Group className="mb-2" controlId="category">
      <Form.Label>Category</Form.Label>
      <Form.Select aria-label="Default select example" {...register(fieldName)}>
        <option>Choose a category</option>
        {entries.map(([key, value]) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};
