import { Controller, useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";
import { useState } from "react";
import styles from "../../styles/components/modal.module.scss";

interface DropdownOption {
  value: string;
  label: string;
}

interface FormDropdownComponentProps {
  name: string;
  label: string;
  options: DropdownOption[];
  formatDisplayValue?: (value: string) => string;
  className?: string;
}

const FormDropdownComponent = ({
  name,
  label,
  options,
  formatDisplayValue = (value: string) => value,
  className,
}: FormDropdownComponentProps) => {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Form.Group className={className || styles.dropdownGroup} controlId={name}>
          <Form.Label as="p" className={styles.formLabel}>
            {label}
          </Form.Label>
          <details
            className={styles.dropdown}
            open={isOpen}
            onToggle={(e) => setIsOpen(e.currentTarget.open)}
          >
            <summary className={styles.dropdownSummary}>{formatDisplayValue(value)}</summary>
            <div className={styles.dropdownList}>
              <div className={styles.dropdownListInner}>
                {options.map((option) => (
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
