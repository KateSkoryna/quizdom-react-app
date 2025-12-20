import HeroContainer from "../components/layout/heroContainer";
import SearchQuizComponent from "../components/quiz/searchQuizComponent";
import QuizMainList from "../components/quiz/quizMainList";

const HomePage = () => {
  return (
    <>
      <HeroContainer />
      <SearchQuizComponent />
      <QuizMainList />
    </>
  );
};

export default HomePage;
