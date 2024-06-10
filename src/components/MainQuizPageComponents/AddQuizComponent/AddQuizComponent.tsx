import { useOpenQuizModal } from "../../../store/store";
import { QuizModal } from "../QuizModal/QuizModal";
import { Button, Container } from "react-bootstrap";

export const AddQuizComponent = () => {
  const show = useOpenQuizModal((state) => state.show);
  const handleModal = useOpenQuizModal((state) => state.setShow);

  const handleCloseModal = () => {
    handleModal(false);
  };
  const handleShowModal = () => {
    handleModal(true);
  };
  return (
    <Container className="text-end">
      <Button onClick={handleShowModal}>Add Quiz</Button>
      <QuizModal showModal={show} handleCloseModal={handleCloseModal} />
    </Container>
  );
};
