import { jokes } from "../../const/jokes";
import styles from "../../styles/pages/home.module.scss";
import type { Joke } from "../../const/jokes";
import { useEffect, useState } from "react";

const BlockQuote = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentJoke: Joke = jokes[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % jokes.length);
    }, 120_000); // 2 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <blockquote className="mb-0 fs-4 d-block">
      <p className={styles.heroJokeText}>{currentJoke.joke}</p>
      <footer className={styles.heroJokeAuthor}>{`— ${currentJoke.author}`}</footer>
    </blockquote>
  );
};

export default BlockQuote;
