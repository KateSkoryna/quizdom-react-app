import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/components/startQuizModal.module.scss";
import { useActiveNavStore } from "../../store/store";
import OwlComponent from "./OwlComponent";

const WarnUserText = ({ text }: { text: string }) => {
  const navidate = useNavigate();
  const setActive = useActiveNavStore((state) => state.setActive);
  const handleNavigate = (path: string): void => {
    setActive(path);
    navidate(path);
  };
  return (
    <div className={styles.container}>
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
          or{" "}
          <Link
            to="/signup"
            className="text-primary"
            onClick={() => handleNavigate("signup")}
          >
            sign up
          </Link>{" "}
          to {text}.
        </p>
      </div>
      <OwlComponent />
    </div>
  );
};

export default WarnUserText;
