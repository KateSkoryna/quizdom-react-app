import { useLoaderData } from "react-router-dom";
import { QuizMainList } from "../../components/QuizMainList/QuizMainList";
import { UserQuiz } from "../../types/types";
import { AddQuizComponent } from "../../components/AddQuizComponent/AddQuizComponent";
import { useAuth } from "../../context/AuthContext";
import { SearchQuizComponent } from "../../components/SearchQuizComponent/SearchQuizComponent";
import { Container } from "react-bootstrap";

export const QuizPage = () => {
  const quizes = useLoaderData() as UserQuiz[];
  const { currentUser } = useAuth();
  return (
    <Container>
      <SearchQuizComponent />
      {currentUser && <AddQuizComponent />}
      <QuizMainList quizes={quizes} />
    </Container>
  );
};
