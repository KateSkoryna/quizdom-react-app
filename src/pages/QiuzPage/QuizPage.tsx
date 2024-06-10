import { useLoaderData } from "react-router-dom";
import { QuizMainList } from "../../components/MainQuizPageComponents/QuizMainList/QuizMainList";
import { UserQuiz } from "../../types/types";
import { AddQuizComponent } from "../../components/MainQuizPageComponents/AddQuizComponent/AddQuizComponent";
import { useAuth } from "../../context/AuthContext";
import { SearchQuizComponent } from "../../components/MainQuizPageComponents/SearchQuizComponent/SearchQuizComponent";

export const QuizPage = () => {
  const quizes = useLoaderData() as UserQuiz[];
  const { currentUser } = useAuth();
  return (
    <>
      <SearchQuizComponent />
      {currentUser && <AddQuizComponent />}
      <QuizMainList quizes={quizes} />
    </>
  );
};
