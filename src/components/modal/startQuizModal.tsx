import { Popover, Overlay } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Answer, Question } from "../../types";
import { ListGroup } from "react-bootstrap";
import { useRef, useState } from "react";
import { useQuizCompletionStore } from "../../store/quizAttemptsStore";
import styles from "../../styles/components/modal.module.scss";
import owl from "../../assets/owl.svg";
import { Card } from "react-bootstrap";
import { MdLightbulbOutline } from "react-icons/md";

type StartQuizModalProps = {
  show: boolean;
  handleClose: () => void;
  questions: Question[];
  quizId: string;
};

const StartQuizModal = ({ show, handleClose, questions, quizId }: StartQuizModalProps) => {
  const { completeQuiz, updateFeedback, isLoading } = useQuizCompletionStore();
  const [showHint, setShowHint] = useState(false);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState<Question>(questions[index]);
  const [answers, setAnswers] = useState<Answer[]>(questions[index].answers);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [savedAttempt, setSavedAttempt] = useState(false);

  const hint = useRef<HTMLButtonElement>(null);

  const Option1 = useRef<HTMLLIElement | null>(null);
  const Option2 = useRef<HTMLLIElement | null>(null);
  const Option3 = useRef<HTMLLIElement | null>(null);
  const Option4 = useRef<HTMLLIElement | null>(null);

  const optionArray = [Option1, Option2, Option3, Option4];

  const handleCorrectAnswer = (event: React.MouseEvent<HTMLElement>, isCorrect: boolean) => {
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

  const handleNextQuestion = async () => {
    if (lock) {
      if (index === questions.length - 1) {
        setResult(true);

        // Auto-save quiz completion
        if (!savedAttempt) {
          try {
            await completeQuiz(quizId, {
              totalQuestions: questions.length,
              correctAnswers: score,
            });
            setSavedAttempt(true);
          } catch (error) {
            console.error("Failed to save completion:", error);
          }
        }

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

  const handleSubmitFeedback = async () => {
    try {
      // Only call API if user provided rating or feedback
      const hasFeedback = feedback.trim().length > 0;
      const hasRating = rating > 0;

      if (hasRating || hasFeedback) {
        await updateFeedback(quizId, rating, hasFeedback ? feedback : undefined);
      }

      handleClose();
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      fullscreen="md-down"
      centered
      size="lg"
      dialogClassName={styles.startQuizModalDialog}
    >
      {result ? (
        <>
          <Modal.Header closeButton className={styles.modalHeader}>
            <Modal.Title as="h5">Quiz Results</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.resultBody}>
            <>
              <div className={`${styles.resultText}`}>
                <h5 className="text-center">Thank you for taking the quiz!</h5>
                <h5 className={` ${styles.scoreText} ${styles.animateScore}`}>
                  {"Your score is ".split("").map((char, idx) => (
                    <span key={`char-${idx}`} style={{ animationDelay: `${idx * 0.05}s` }}>
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                  <span className={styles.scoreNumber} style={{ animationDelay: `${14 * 0.05}s` }}>
                    {score}
                  </span>
                  {" out of ".split("").map((char, idx) => (
                    <span key={`out-${idx}`} style={{ animationDelay: `${(15 + idx) * 0.05}s` }}>
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                  <span
                    style={{
                      animationDelay: `${(15 + " out of ".length) * 0.05}s`,
                    }}
                  >
                    {questions.length}
                  </span>
                </h5>
                <h6>Correct answers: {((score / questions.length) * 100).toFixed(1)}%</h6>
              </div>
              <Card.Img src={owl} className={styles.img} />

              <div className={styles.ratingSection}>
                <h6 className="text-center">Evaluate this quiz (optional)</h6>
                <div className={styles.starRating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      role="button"
                      tabIndex={0}
                      className={`${styles.star} ${
                        star <= (hoverRating || rating) ? styles.starFilled : ""
                      }`}
                      onClick={() => setRating(star)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setRating(star);
                        }
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`Rate ${star} stars`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.feedbackSection}>
                <h6 className="text-center mb-2">Share your thoughts</h6>
                <textarea
                  className={styles.feedbackTextarea}
                  name="feedback"
                  placeholder="Tell us what you think about this quiz... (optional)"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                />
                <div className={styles.buttonGroup}>
                  <button
                    onClick={handleSubmitFeedback}
                    className={styles.primaryButton}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Submitting..."
                      : rating > 0 || feedback.trim().length > 0
                        ? "Submit Evaluation"
                        : "Close"}
                  </button>
                </div>
              </div>
            </>
          </Modal.Body>
        </>
      ) : (
        <>
          <Modal.Header closeButton className={styles.modalHeader}>
            <Modal.Title>Question {index + 1}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.questionHeader}>
              <h5 className={styles.questionTitle}>{question.questionTitle}</h5>
              {question.hint && (
                <>
                  <button
                    ref={hint}
                    type="button"
                    className={styles.hintButton}
                    onClick={() => setShowHint(!showHint)}
                  >
                    <MdLightbulbOutline size={24} />
                    <span>Hint</span>
                  </button>
                  <Overlay target={hint.current} show={showHint} placement="right">
                    {(props) => (
                      <Popover {...props}>
                        <Popover.Body className={styles.hintContent}>
                          <MdLightbulbOutline size={20} />
                          <p>{question.hint}</p>
                        </Popover.Body>
                      </Popover>
                    )}
                  </Overlay>
                </>
              )}
            </div>
            <ListGroup className={styles.answersList}>
              {answers.map((answer, index) => (
                <ListGroup.Item
                  ref={optionArray[index]}
                  as="li"
                  className={`d-flex justify-content-between align-items-start ${styles.answerItem}`}
                  key={answer.answer}
                  onClick={(event) =>
                    handleCorrectAnswer(event as React.MouseEvent<HTMLElement>, answer.isCorrect)
                  }
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{answer.answer}</div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer className={styles.quizFooter}>
            <button
              className={styles.actionButtonSecondary}
              disabled={index === 0}
              onClick={handlePreviousQuestion}
            >
              Previous Question
            </button>
            <button
              className={lock ? styles.actionButtonPrimary : styles.actionButtonSecondary}
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
            <Modal.Title as="h6" className={styles.questionCounter}>
              Total Questions: {index + 1} of {questions.length}
            </Modal.Title>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default StartQuizModal;
