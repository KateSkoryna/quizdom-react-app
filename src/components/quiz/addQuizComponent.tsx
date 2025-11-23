import { useOpenQuizModal } from "../../store/store";
import QuizModal from "../modal/quizModal";
import { Button, Container } from "react-bootstrap";
import UserQuizList from "../user/userQuizList";

const AddQuizComponent = () => {
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
      <h5 className="mb-3 text-center">My Quizes</h5>
      <UserQuizList />
      <QuizModal showModal={show} handleCloseModal={handleCloseModal} />
    </Container>
  );
};

export default AddQuizComponent;
