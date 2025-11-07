import { UserQuiz } from "../../types/types";
import QuizMainListItem from "./quizMainListItem";
import { Container, Card } from "react-bootstrap";

const QuizMainList = ({ quizes }: { quizes: UserQuiz[] }) => {
  return (
    <Container style={{ paddingBottom: "80px", marginTop: "20px" }}>
      {quizes.map((quiz) => (
        <Card key={quiz.id} style={{ width: "100%", marginBottom: "10px" }}>
          <QuizMainListItem quiz={quiz} />
        </Card>
      ))}
    </Container>
  );
};

export default QuizMainList;
