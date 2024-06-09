import { useLoaderData } from "react-router-dom";
import { QuizMainList } from "../../components/QuizMainList/QuizMainList";
import { SearchComponent } from "../../components/SearchComponent/SearchComponent";
import { QUIZ_CATEGORY } from "../../const/const";
import { UserQuiz } from "../../types/types";

const values = Object.values(QUIZ_CATEGORY);

export const QuizPage = () => {
  const quizes = useLoaderData() as UserQuiz[];
  return (
    <div>
      <SearchComponent categories={values} />
      <QuizMainList quizes={quizes} />
    </div>
  );
};
