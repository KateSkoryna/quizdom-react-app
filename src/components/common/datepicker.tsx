import DatePicker from "react-datepicker";
import { subYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarDay } from "react-icons/fa";
import styles from "../../styles/components/datepicker.module.scss";

type DatepickerProps = {
  value: Date;
  callback: (date: Date) => void;
};

const DatepickerContainer = ({ value, callback }: DatepickerProps) => {
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

export default DatepickerContainer;
