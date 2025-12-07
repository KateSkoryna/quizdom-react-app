import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HeroContainer from "../components/layout/heroContainer";
import QuizContainer from "../components/quiz/quizContainer";
import { useQuizesStore } from "../store/quizeStore";

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
        await getQuizesByCategoryAndComplexity(
          searchCategory,
          searchComplexity
        );
      };
      fetchQuizesByCategoryAndComplexity();
    }
  }, [
    searchCategory,
    searchComplexity,
    getQuizes,
    getQuizesByCategoryAndComplexity,
  ]);

  return (
    <>
      <HeroContainer />
      <QuizContainer />
    </>
  );
};

export default HomePage;
