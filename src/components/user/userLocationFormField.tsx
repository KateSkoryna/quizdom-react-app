import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { lazy, Suspense } from "react";
import styles from "../../styles/pages/profile.module.scss";

const SearchBox = lazy(() =>
  import("@mapbox/search-js-react").then((module) => ({ default: module.SearchBox }))
);

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
  const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API;

  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <div
        className={
          isEditMode
            ? styles.locationSearch
            : `${styles.fieldValue} ${value ? "" : styles.fieldMuted}`
        }
      >
        {isEditMode ? (
          <Suspense fallback={<span className="text-muted">Loading search...</span>}>
            <Controller
              name={fieldName}
              control={control}
              render={({ field: { onChange, value: fieldValue } }) => (
                <SearchBox
                  accessToken={MAPBOX_API_KEY}
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
                      borderRadius: "12px",
                      boxShadow: "none",
                      border: "1px solid #d7dae6",
                      colorText: "#00093c",
                      colorBackground: "#fff",
                      colorBackgroundHover: "#f8f9fa",
                      colorBackgroundActive: "#e9ecef",
                      spacing: "0.375rem",
                    },
                  }}
                />
              )}
            />
          </Suspense>
        ) : (
          value || "Not set"
        )}
      </div>
    </div>
  );
};
