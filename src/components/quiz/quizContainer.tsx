import { useLoaderData, useNavigation } from "react-router-dom";
import QuizMainList from "./quizMainList";
import { UserQuiz } from "../../types/types";
import AddQuizComponent from "./addQuizComponent";
import { useAuthStore } from "../../store/AuthStore";
import SearchQuizComponent from "./searchQuizComponent";
import Loader from "../common/loader";

const QuizContainer = () => {
  const navigation = useNavigation();
  const quizes = useLoaderData() as UserQuiz[];
  const currentUser = useAuthStore((state) => state.currentUser);
  return (
    <>
      <SearchQuizComponent />
      {currentUser && <AddQuizComponent />}
      {navigation.state === "loading" ? (
        <Loader />
      ) : (
        <QuizMainList quizes={quizes} />
      )}
    </>
  );
};

export default QuizContainer;
