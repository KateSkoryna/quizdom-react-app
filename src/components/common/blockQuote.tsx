import { JOKE } from "../../const/jokes";
import styles from "../../styles/pages/home.module.scss";

const BlockQuote = () => {
  return (
    <blockquote className="mb-0 fs-4 d-block">
      <p
        className={
          JOKE.joke.length > 100 ? styles.heroJokeTextBig : styles.heroJokeText
        }
      >
        {JOKE.joke}
      </p>
      <footer className={styles.heroJokeAuthor}>{`— ${JOKE.author}`}</footer>
    </blockquote>
  );
};

export default BlockQuote;
