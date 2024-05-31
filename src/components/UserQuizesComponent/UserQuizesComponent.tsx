import { Button, Container } from "react-bootstrap";
import { UserQuizList } from "../UserQuizList/UserQuizList";
import { useState } from "react";
import { QuizModal } from "../QuizModal/QuizModal";

export const UserQuizesComponent = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
      <Container>
        <Button onClick={handleShow}>Add Quiz</Button>
        <QuizModal showModal={show} handleCloseModal={handleClose}/>
        <UserQuizList />
      </Container>
  );
};
