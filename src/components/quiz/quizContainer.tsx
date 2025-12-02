import QuizMainList from "./quizMainList";
import AddQuizComponent from "./addQuizComponent";
import SearchQuizComponent from "./searchQuizComponent";

const QuizContainer = () => {
  return (
    <>
      <SearchQuizComponent />
      <AddQuizComponent />
      <QuizMainList />
    </>
  );
};

export default QuizContainer;
