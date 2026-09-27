import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/components/datepicker.module.scss";
import { MdCalendarToday } from "react-icons/md";

type DatepickerProps = {
  value: Date;
  callback: (date: Date | null) => void;
  className?: string;
  selectedColor?: string;
};

// react-datepicker throws on an Invalid Date, so treat it as empty
const toValidDate = (value: Date | null | undefined): Date | null => {
  if (!value) return null;
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
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
      icon={<MdCalendarToday />}
      toggleCalendarOnIconClick
      popperPlacement="left-start"
      wrapperClassName={className || styles.formDateInput}
      className={className || styles.formDateInput}
      calendarClassName={selectedColor === "#f7941d" ? styles.customCalendar : ""}
      showYearDropdown
      scrollableYearDropdown
      maxDate={dayjs().subtract(18, "years").toDate()}
      minDate={dayjs().subtract(100, "years").toDate()}
      dropdownMode="select"
      showMonthDropdown
      selected={toValidDate(value)}
      onChange={callback}
    />
  );
};

export default DatepickerContainer;
