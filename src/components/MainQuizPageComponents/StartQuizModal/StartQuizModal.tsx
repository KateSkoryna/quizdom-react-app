import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Answer, Question } from "../../../types/types";
import { ListGroup } from "react-bootstrap";
import { useRef, useState } from "react";
import styles from "./StartQuizModal.module.css";
import { useAuth } from "../../../context/AuthContext";
import WarnUserText from "../../WarnUserText/WarnUserText";
import OwlComponent from "../../OwlComponent/OwlComponent";

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
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef<HTMLLIElement | null>(null);
  const Option2 = useRef<HTMLLIElement | null>(null);
  const Option3 = useRef<HTMLLIElement | null>(null);
  const Option4 = useRef<HTMLLIElement | null>(null);

  const optionArray = [Option1, Option2, Option3, Option4];

  const handleCorrectAnswer = (
    event: React.MouseEvent<HTMLElement>,
    isCorrect: boolean
  ) => {
    if (!lock) {
      if (isCorrect) {
        event.currentTarget.classList.add(styles.isCorrect);
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        event.currentTarget.classList.add(styles.isFalse);
        setLock(true);
        answers.forEach((answer, index) => {
          if (optionArray[index]?.current && answer.isCorrect) {
            optionArray[index]?.current?.classList.add(styles.isCorrect);
          }
        });
      }
    }
  };

  const handleNextQuestion = () => {
    if (lock) {
      if (index === questions.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex((prev) => prev + 1);
      setQuestion(questions[index + 1]);
      setAnswers(questions[index + 1].answers);
      setLock(false);
      answers.forEach((answer, index) => {
        if (optionArray[index]?.current && answer.isCorrect) {
          optionArray[index]?.current?.classList.remove(styles.isCorrect);
        }
      });
    }
  };

  const handlePreviousQuestion = () => {
    setIndex((prev) => prev - 1);
    setQuestion(questions[index - 1]);
    setAnswers(questions[index - 1].answers);
    setLock(false);
    answers.forEach((answer, index) => {
      if (optionArray[index]?.current && answer.isCorrect) {
        optionArray[index]?.current?.classList.remove(styles.isCorrect);
      }
    });
  };

  const handleReset = () => {
    setIndex(0);
    setQuestion(questions[0]);
    setAnswers(questions[0].answers);
    setLock(false);
    setScore(0);
    setResult(false);
  };

  const { currentUser } = useAuth();

  return (
    <Modal show={show} onHide={handleClose} fullscreen="md-down" centered>
      {result ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title as="h5">
              {currentUser ? "Quiz Results" : "Sorry! You havn't logged in yet"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.resultBody}>
            {currentUser ? (
              <>
                <div className={styles.resultText}>
                  <h5 className="text-center mb-1">
                    Thank you for taking the quiz!
                  </h5>
                  <h5 className="mb-2">
                    Your score is {score} out of {questions.length}
                  </h5>
                  <h6>
                    Correct answers:{" "}
                    {((score / questions.length) * 100).toFixed(1)}%
                  </h6>
                </div>
                <OwlComponent />
                <Button onClick={handleReset} className={styles.button}>
                  Reset Quiz
                </Button>
              </>
            ) : (
              <WarnUserText text={"see your results"} />
            )}
          </Modal.Body>
        </>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Question {index + 1}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5 className={styles.questionTitle}>{question.questionTitle}</h5>
            <ListGroup>
              {answers.map((answer, index) => (
                <ListGroup.Item
                  ref={optionArray[index]}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                  key={answer.answer}
                  onClick={(event) =>
                    handleCorrectAnswer(
                      event as React.MouseEvent<HTMLElement>,
                      answer.isCorrect
                    )
                  }
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{answer.answer}</div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button
              variant="secondary"
              disabled={index === 0}
              onClick={handlePreviousQuestion}
            >
              Previous Question
            </Button>
            <Button onClick={handleNextQuestion} variant="primary">
              Next Question
            </Button>
            <h6>
              Total Questions: {index + 1} of {questions.length}
            </h6>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};
