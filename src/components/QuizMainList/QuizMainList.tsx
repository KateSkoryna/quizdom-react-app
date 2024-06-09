import { UserQuiz } from "../../types/types";
import { QuizMainListItem } from "../QuizMainListItem/QuizMainListItem";
import { Container, Card } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

export const QuizMainList = ({ quizes }: { quizes: UserQuiz[] }) => {
  const { currentUser } = useAuth();
  const handleClick = (quizId: string) => {
    if (!currentUser) {
      return;
    }
    console.log(quizId);
  };
  return (
    <Container style={{ paddingBottom: "80px", marginTop: "20px" }}>
      {quizes.map((quiz) => (
        <Card key={quiz.id} style={{ width: "100%", marginBottom: "10px" }}>
          <QuizMainListItem quiz={quiz} handleFavoriteClick={handleClick} />
        </Card>
      ))}
    </Container>
  );
};
