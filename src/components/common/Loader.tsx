import { Grid } from "react-loader-spinner";
import styles from "../../styles/components/Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <Grid
        visible={true}
        height="60"
        width="60"
        color="#F7941D"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass={styles.loader}
      />
    </div>
  );
};

export default Loader;
