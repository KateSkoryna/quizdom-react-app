import { Controller, useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";
import { QUIZ_CATEGORY } from "../../types/types";
import { useState } from "react";
import styles from "../../styles/components/modal.module.scss";

const entries = Object.entries(QUIZ_CATEGORY);

const FormCategoryComponent = ({ fieldName }: { fieldName: string }) => {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, value } }) => (
        <Form.Group className={styles.dropdownGroup} controlId="category">
          <Form.Label className={styles.formLabel}>Category</Form.Label>
          <details className={styles.dropdown} open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
            <summary className={styles.dropdownSummary}>{value || "Choose a category"}</summary>
            <div className={styles.dropdownList}>
              <div className={styles.dropdownListInner}>
                {entries.map(([key, categoryValue]) => (
                  <div
                    key={key}
                    onClick={() => {
                      onChange(categoryValue);
                      setIsOpen(false);
                    }}
                    className={`${styles.dropdownItem} ${value === categoryValue ? styles.selected : ""}`}
                  >
                    {categoryValue}
                  </div>
                ))}
              </div>
            </div>
          </details>
        </Form.Group>
      )}
    />
  );
};

export default FormCategoryComponent;
