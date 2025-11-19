import DatePicker from "react-datepicker";
import { subYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/components/datepicker.module.scss";
import calendarIconUrl from "../../assets/calendar.svg";

type DatepickerProps = {
  value: Date;
  callback: (date: Date) => void;
  className?: string;
  selectedColor?: string;
};

const DatepickerContainer = ({
  value,
  callback,
  className,
  selectedColor = "#f7941d",
}: DatepickerProps) => {
  return (
    <DatePicker
      showIcon
      icon={<img src={calendarIconUrl} alt="Calendar" width="16" height="16" />}
      toggleCalendarOnIconClick
      popperPlacement="left-start"
      wrapperClassName={className || styles.formDateInput}
      className={className || styles.formDateInput}
      calendarClassName={selectedColor === "#f7941d" ? styles.customCalendar : ""}
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
