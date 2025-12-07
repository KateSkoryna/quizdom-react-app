import { Controller, useFormContext } from "react-hook-form";
import { COMPLEXITY_VALUES, convertComplexity } from "../../const/complexity";
import { Form } from "react-bootstrap";
import { Complexity } from "../../../shared/types";
import { useState } from "react";
import styles from "../../styles/components/modal.module.scss";

const complexityOptions = [
  { value: Complexity.BEGINNER, label: COMPLEXITY_VALUES[Complexity.BEGINNER] },
  { value: Complexity.MEDIUM, label: COMPLEXITY_VALUES[Complexity.MEDIUM] },
  { value: Complexity.ADVANCED, label: COMPLEXITY_VALUES[Complexity.ADVANCED] },
  { value: Complexity.EXPERT, label: COMPLEXITY_VALUES[Complexity.EXPERT] },
];

const FormRangeComponent = ({ fieldName }: { fieldName: string }) => {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, value } }) => (
        <Form.Group className={styles.dropdownGroup} controlId={fieldName}>
          <Form.Label className={styles.formLabel}>Complexity level</Form.Label>
          <details
            className={styles.dropdown}
            open={isOpen}
            onToggle={(e) => setIsOpen(e.currentTarget.open)}
          >
            <summary className={styles.dropdownSummary}>
              {convertComplexity(value)}
            </summary>
            <div className={styles.dropdownList}>
              <div className={styles.dropdownListInner}>
                {complexityOptions.map((option) => (
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

export default FormRangeComponent;
