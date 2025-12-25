import HeroContainer from "../components/layout/heroContainer";
import SearchQuizComponent from "../components/quiz/searchQuizComponent";
import QuizMainList from "../components/quiz/quizMainList";
import { Container } from "react-bootstrap";
import styles from "../styles/pages/home.module.scss";

const HomePage = () => {
  return (
    <div className={styles.homePageContainer}>
      <div className={styles.fixedSection}>
        <HeroContainer />
        <Container>
          <SearchQuizComponent />
        </Container>
      </div>
      <div className={styles.scrollableSection}>
        <QuizMainList />
      </div>
    </div>
  );
};

export default HomePage;
