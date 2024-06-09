import { Button } from "react-bootstrap";
import { UserQuizList } from "../UserQuizList/UserQuizList";
import { useState } from "react";
import { QuizModal } from "../QuizModal/QuizModal";

export const UserQuizesComponent = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="pt-3 text-end">
      <h5 className="mb-3 text-center">My Quizes</h5>
      <Button onClick={handleShow}>Add Quiz</Button>
      <QuizModal showModal={show} handleCloseModal={handleClose} />
      <UserQuizList />
    </div>
  );
};
