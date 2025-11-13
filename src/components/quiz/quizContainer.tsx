import QuizMainList from "./quizMainList";
import AddQuizComponent from "./addQuizComponent";
import { useAuthStore } from "../../store/AuthStore";
import { useQuizesStore } from "../../store/quizeStore";
import SearchQuizComponent from "./searchQuizComponent";
import Loader from "../common/loader";

const QuizContainer = () => {
  const quizes = useQuizesStore((state) => state.quizes);
  const isLoading = useQuizesStore((state) => state.isLoading);
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <>
      <SearchQuizComponent />
      {currentUser && <AddQuizComponent />}
      {isLoading ? (
        <Loader />
      ) : (
        <QuizMainList quizes={quizes} />
      )}
    </>
  );
};

export default QuizContainer;
