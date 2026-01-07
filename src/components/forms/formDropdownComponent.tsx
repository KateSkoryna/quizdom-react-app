import { Controller, useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";
import { useState } from "react";
import styles from "../../styles/components/modal.module.scss";
import { getConfigByFieldName } from "../../const/complexity";

interface FormDropdownComponentProps {
  fieldName: "complexity" | "category";
}

const FormDropdownComponent = ({ fieldName }: FormDropdownComponentProps) => {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  const config = getConfigByFieldName(fieldName);

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, value } }) => (
        <Form.Group className={styles.dropdownGroup} controlId={fieldName}>
          <Form.Label as="p" className={styles.formLabel}>
            {config.label}
          </Form.Label>
          <details
            className={styles.dropdown}
            open={isOpen}
            onToggle={(e) => setIsOpen(e.currentTarget.open)}
          >
            <summary className={styles.dropdownSummary}>{config.formatDisplayValue(value)}</summary>
            <div className={styles.dropdownList}>
              <div className={styles.dropdownListInner}>
                {config.options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`${styles.dropdownItem} ${
                      value === option.value ? styles.selected : ""
                    }`}
                    aria-label={`Select ${option.label}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </details>
        </Form.Group>
      )}
    />
  );
};

export default FormDropdownComponent;
