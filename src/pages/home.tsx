import HeroContainer from "../components/layout/heroContainer";
import SearchQuizComponent from "../components/quiz/searchQuizComponent";
import QuizMainList from "../components/quiz/quizMainList";
import styles from "../styles/pages/home.module.scss";
import { ErrorBoundary } from "react-error-boundary";
import SectionErrorFallback from "../components/fallback/sectionErrorFallback";
import { useState } from "react";
import { UserQuiz } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { QUIZ_SECTION_ID } from "../const/const";
import { Container } from "react-bootstrap";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    queryClient.setQueryData<UserQuiz[]>(["quizzes"], []);
    queryClient.setQueryData<UserQuiz[]>(["userQuizzes"], []);
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.scrollableSection}>
        <HeroContainer />
        <Container id={QUIZ_SECTION_ID} className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore quizzes</h2>
          <p className={styles.sectionSubtitle}>
            Describe what you want to practise — topic and difficulty are picked up automatically.
          </p>
        </Container>
        <div className={styles.stickySearchWrapper}>
          <SearchQuizComponent />
        </div>
        <ErrorBoundary
          FallbackComponent={(props) => <SectionErrorFallback {...props} section="quiz list" />}
          onReset={handleReset}
          resetKeys={[resetKey]}
        >
          <QuizMainList />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default HomePage;
