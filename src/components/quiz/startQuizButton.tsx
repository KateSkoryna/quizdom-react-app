import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const StartQuizButton = ({ handleModal }: { handleModal: () => void }) => {
  return (
    <Card.Link onClick={handleModal} as={Button}>
      Start Quiz
    </Card.Link>
  );
};

export default StartQuizButton;
