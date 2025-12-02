import { Link } from "react-router-dom";
import styles from "../../styles/components/modal.module.scss";

const WarnUserContainer = ({ text }: { text: string }) => {
  return (
    <div className={styles.textContainer}>
      <p className={styles.text}>
        Please{" "}
        <Link to="/login" className="text-primary">
          log in
        </Link>{" "}
        to {text}.
      </p>
    </div>
  );
};

export default WarnUserContainer;
