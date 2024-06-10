import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Answer, Question } from "../../types/types";
import { ListGroup } from "react-bootstrap";
import { useState } from "react";

type StartQuizModalProps = {
  show: boolean;
  handleClose: () => void;
  questions: Question[];
};

export const StartQuizModal = ({
  show,
  handleClose,
  questions,
}: StartQuizModalProps) => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState<Question>(questions[index]);
  const [answers, setAnswers] = useState<Answer[]>(questions[index].answers);
  console.log(questions);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Question {index + 1}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{questions[index].questionTitle}</h5>
        <ListGroup>
          {answers.map((answer) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
              key={answer.answer}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{answer.answer}</div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Previous Question</Button>
        <Button variant="primary">Next Question</Button>
        <h6>
          Total Questions: {index + 1}/{questions.length}
        </h6>
      </Modal.Footer>
    </Modal>
  );
};
