import HeroContainer from "../components/layout/heroContainer";
import SearchQuizComponent from "../components/quiz/searchQuizComponent";
import QuizMainList from "../components/quiz/quizMainList";
import styles from "../styles/pages/home.module.scss";
import { ErrorBoundary } from "react-error-boundary";
import SectionErrorFallback from "../components/fallback/sectionErrorFallback";
import { useState } from "react";
import { UserQuiz } from "../types";
import { useQueryClient } from "@tanstack/react-query";

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
      <div className={styles.fixedSection}>
        <HeroContainer />
        <SearchQuizComponent />
      </div>
      <div className={styles.scrollableSection}>
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
