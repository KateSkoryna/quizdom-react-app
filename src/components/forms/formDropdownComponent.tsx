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
          <Form.Label className={styles.formLabel}>{config.label}</Form.Label>
          <details
            className={styles.dropdown}
            open={isOpen}
            onToggle={(e) => setIsOpen(e.currentTarget.open)}
          >
            <summary className={styles.dropdownSummary}>
              {config.formatDisplayValue(value)}
            </summary>
            <div className={styles.dropdownList}>
              <div className={styles.dropdownListInner}>
                {config.options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`${styles.dropdownItem} ${
                      value === option.value ? styles.selected : ""
                    }`}
                  >
                    {option.label}
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

export default FormDropdownComponent;
