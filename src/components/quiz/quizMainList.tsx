import { useQuizesStore } from "../../store/quizeStore";
import QuizMainListItem from "./quizItem/quizMainListItem";
import { Container, Card } from "react-bootstrap";

const QuizMainList = () => {
  const quizes = useQuizesStore((state) => state.quizes);
  return (
    <Container style={{ paddingBottom: "80px", marginTop: "20px" }}>
      {quizes.map((quiz) => (
        <Card key={quiz.id} style={{ marginBottom: "10px" }}>
          <QuizMainListItem quiz={quiz} />
        </Card>
      ))}
    </Container>
  );
};

export default QuizMainList;
