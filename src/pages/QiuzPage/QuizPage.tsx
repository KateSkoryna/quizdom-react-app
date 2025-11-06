import { useLoaderData, useNavigation } from "react-router-dom";
import { QuizMainList } from "../../components/MainQuizPageComponents/QuizMainList/QuizMainList";
import { UserQuiz } from "../../types/types";
import { AddQuizComponent } from "../../components/MainQuizPageComponents/AddQuizComponent/AddQuizComponent";
import { useAuthStore } from "../../store/AuthStore";
import { SearchQuizComponent } from "../../components/MainQuizPageComponents/SearchQuizComponent/SearchQuizComponent";
import Loader from "../../components/Loader/Loader";

const QuizPage = () => {
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

export default QuizPage;
