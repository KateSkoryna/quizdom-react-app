import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useStartQuizModal } from "../../../store/store";

const StartQuizButton = () => {
  const show = useStartQuizModal((state) => state.show);
  const handleModal = useStartQuizModal((state) => state.setShow);

  const handleShowModal = () => {
    handleModal(!show);
  };
  return (
    <Card.Link onClick={handleShowModal} as={Button}>
      Start Quiz
    </Card.Link>
  );
};

export default StartQuizButton;
