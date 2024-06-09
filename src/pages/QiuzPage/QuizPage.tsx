import { SearchComponent } from "../../components/SearchComponent/SearchComponent";
import { QUIZ_CATEGORY } from "../../const/const";

const values = Object.values(QUIZ_CATEGORY);

export const QuizPage = () => {
  return (
    <div>
      <SearchComponent categories={values} />
    </div>
  );
};
