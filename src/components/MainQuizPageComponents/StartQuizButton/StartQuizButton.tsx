import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const StartQuizButton = ({ handleModal }: { handleModal: () => void }) => {
  const handleShowModal = () => {
    handleModal();
  };
  return (
    <Card.Link onClick={handleShowModal} as={Button}>
      Start Quiz
    </Card.Link>
  );
};

export default StartQuizButton;
