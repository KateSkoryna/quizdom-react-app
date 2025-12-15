import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HeroContainer from "../components/layout/heroContainer";
import { useQuizesStore } from "../store/quizeStore";
import SearchQuizComponent from "../components/quiz/searchQuizComponent";
import QuizMainList from "../components/quiz/quizMainList";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const getQuizes = useQuizesStore((state) => state.getQuizes);
  const getQuizesByCategoryAndComplexity = useQuizesStore(
    (state) => state.getQuizesByCategoryAndComplexity
  );

  const searchCategory = searchParams.get("category") || null;
  const searchComplexity = searchParams.get("complexity") || null;

  useEffect(() => {
    if (!searchCategory && !searchComplexity) {
      const fetchQuizes = async () => {
        await getQuizes();
      };
      fetchQuizes();
    } else {
      const fetchQuizesByCategoryAndComplexity = async () => {
        await getQuizesByCategoryAndComplexity(searchCategory, searchComplexity);
      };
      fetchQuizesByCategoryAndComplexity();
    }
  }, [searchCategory, searchComplexity, getQuizes, getQuizesByCategoryAndComplexity]);

  return (
    <>
      <HeroContainer />
      <SearchQuizComponent />
      <QuizMainList />
    </>
  );
};

export default HomePage;
