import { useLoaderData, useNavigation } from "react-router-dom";
import { QuizMainList } from "../../components/MainQuizPageComponents/QuizMainList/QuizMainList";
import { UserQuiz } from "../../types/types";
import { AddQuizComponent } from "../../components/MainQuizPageComponents/AddQuizComponent/AddQuizComponent";
import { useAuth } from "../../context/AuthContext";
import { SearchQuizComponent } from "../../components/MainQuizPageComponents/SearchQuizComponent/SearchQuizComponent";
import Loader from "../../components/Loader/Loader";

const QuizPage = () => {
  const navigation = useNavigation();
  const quizes = useLoaderData() as UserQuiz[];
  const { currentUser } = useAuth();
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
