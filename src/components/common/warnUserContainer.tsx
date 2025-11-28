import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/components/modal.module.scss";
import { useActiveNavStore } from "../../store/store";

const WarnUserContainer = ({ text }: { text: string }) => {
  const navigate = useNavigate();
  const setActive = useActiveNavStore((state) => state.setActive);
  const handleNavigate = (path: string): void => {
    setActive(path);
    navigate(path);
  };
  return (
    <div className={styles.textContainer}>
      <p className={styles.text}>
        Please{" "}
        <Link
          to="/login"
          className="text-primary"
          onClick={() => handleNavigate("login")}
        >
          log in
        </Link>{" "}
        to {text}.
      </p>
    </div>
  );
};

export default WarnUserContainer;
