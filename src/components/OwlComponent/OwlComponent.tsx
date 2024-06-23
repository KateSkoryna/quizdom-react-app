import owl from "../../assets/owl.svg";
import { Card } from "react-bootstrap";
import styles from "./OwlComponent.module.css";

const OwlComponent = () => {
  return <Card.Img src={owl} className={styles.img} />;
};

export default OwlComponent;
