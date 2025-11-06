import owl from "../../assets/owl.svg";
import { Card } from "react-bootstrap";
import styles from "../../styles/components/OwlComponent.module.scss";

const OwlComponent = () => {
  return <Card.Img src={owl} className={styles.img} />;
};

export default OwlComponent;
