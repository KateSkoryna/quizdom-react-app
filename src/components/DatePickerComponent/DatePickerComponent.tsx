import DatePicker from "react-datepicker";
import { subYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarDay } from "react-icons/fa";
import styles from "./DatePickerComponent.module.css";

export const DatePickerComponent = ({
  value,
  callback,
}: {
  value: Date;
  callback: (date: Date) => void;
}) => {
  return (
    <DatePicker
      showIcon
      icon={<FaCalendarDay />}
      toggleCalendarOnIconClick
      popperPlacement="bottom-start"
      wrapperClassName={styles.formDateInput}
      className={styles.formDateInput}
      showYearDropdown
      scrollableYearDropdown
      maxDate={subYears(new Date(), 18)}
      minDate={subYears(new Date(), 100)}
      dropdownMode="select"
      showMonthDropdown
      selected={value ? new Date(value) : null}
      onChange={callback}
    />
  );
};
