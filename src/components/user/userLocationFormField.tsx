import { Card } from "react-bootstrap";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { SearchBox } from "@mapbox/search-js-react";
import styles from "../../styles/pages/user.module.scss";

interface UserLocationFormFieldProps<T extends FieldValues> {
  label: string;
  value?: string;
  isEditMode: boolean;
  control: Control<T>;
  fieldName: Path<T>;
}

export const UserLocationFormField = <T extends FieldValues>({
  label,
  value,
  isEditMode,
  control,
  fieldName,
}: UserLocationFormFieldProps<T>) => {
  const mapboxToken = import.meta.env.VITE_MAPBOX_API;

  return (
    <Card.Text
      as="div"
      className={`${styles.birthField} d-flex justify-content-between align-items-center`}
    >
      <strong>{label}:</strong>
      <span className={isEditMode ? styles.locationSearchBox : undefined}>
        {isEditMode ? (
          <Controller
            name={fieldName}
            control={control}
            render={({ field: { onChange, value: fieldValue } }) => (
              <SearchBox
                accessToken={mapboxToken}
                value={fieldValue || ""}
                onRetrieve={(result) => {
                  const placeName =
                    result.features[0]?.properties?.full_address ||
                    result.features[0]?.properties?.name ||
                    "";
                  onChange(placeName);
                }}
                onChange={(value) => {
                  onChange(value);
                }}
                options={{
                  language: "en",
                  limit: 5,
                }}
                placeholder="Search location..."
                theme={{
                  variables: {
                    fontFamily: '"Montserrat", sans-serif',
                    borderRadius: "0.375rem",
                    boxShadow: "none",
                    border: "1px solid #ced4da",
                    colorText: "#212529",
                    colorBackground: "#fff",
                    colorBackgroundHover: "#f8f9fa",
                    colorBackgroundActive: "#e9ecef",
                    spacing: "0.375rem",
                  },
                }}
              />
            )}
          />
        ) : (
          value || "Not set"
        )}
      </span>
    </Card.Text>
  );
};
