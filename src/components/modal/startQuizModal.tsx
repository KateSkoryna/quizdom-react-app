import Modal from "react-bootstrap/Modal";
import { Answer, Question } from "../../types";
import { useRef, useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useQuizCompletionStore } from "../../store/quizAttemptsStore";
import styles from "../../styles/components/quizPlay.module.scss";
import owl from "../../assets/owl.svg";
import Hint from "./hint";
import RatingStars from "./ratingStars";

const ANSWER_LETTERS = ["A", "B", "C", "D"];

const getScoreMessage = (percentage: number) => {
  if (percentage >= 80) return "Outstanding — you really know this topic!";
  if (percentage >= 50) return "Nice work — a little more practice and you've got it.";
  return "Good start — check the hints and give another quiz a try.";
};

type StartQuizModalProps = {
  show: boolean;
  handleClose: () => void;
  questions: Question[];
  quizId: string;
};

const StartQuizModal = ({ show, handleClose, questions, quizId }: StartQuizModalProps) => {
  const { completeQuiz, updateFeedback, isLoading } = useQuizCompletionStore();

  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState<Question>(questions[index]);
  const [answers, setAnswers] = useState<Answer[]>(questions[index].answers);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [savedAttempt, setSavedAttempt] = useState(false);

  const Option1 = useRef<HTMLButtonElement | null>(null);
  const Option2 = useRef<HTMLButtonElement | null>(null);
  const Option3 = useRef<HTMLButtonElement | null>(null);
  const Option4 = useRef<HTMLButtonElement | null>(null);

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

  const isLastQuestion = index === questions.length - 1;
  const progress = ((index + (lock ? 1 : 0)) / questions.length) * 100;
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName={styles.dialog}>
      {result ? (
        <>
          <Modal.Header closeButton closeVariant="white" className={styles.header}>
            <div className={styles.headerContent}>
              <span className={styles.eyebrow}>Quiz complete</span>
              <Modal.Title as="h2" className={styles.title}>
                Thanks for taking the quiz!
              </Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body className={styles.resultBody}>
            <div className={styles.scoreCard}>
              <img src={owl} className={styles.owl} alt="" aria-hidden="true" />
              <div className={styles.scoreText} aria-live="polite">
                <span className={styles.scoreLabel}>Your score</span>
                <strong className={styles.scoreValue}>
                  {score}/{questions.length}
                </strong>
                <p className={styles.scoreMessage}>
                  {percentage}% correct · {getScoreMessage(percentage)}
                </p>
              </div>
            </div>

            <div className={styles.feedbackGroup}>
              <h3 className={styles.feedbackTitle}>Rate this quiz (optional)</h3>
              <RatingStars value={rating} onChange={setRating} />
              <label htmlFor="quiz-feedback" className="visually-hidden">
                Share your thoughts
              </label>
              <textarea
                id="quiz-feedback"
                className={styles.feedbackTextarea}
                name="feedback"
                placeholder="Share your thoughts about this quiz (optional)"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
              />
              <button
                type="button"
                onClick={handleSubmitFeedback}
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading
                  ? "Submitting..."
                  : rating > 0 || feedback.trim().length > 0
                    ? "Submit evaluation"
                    : "Close"}
              </button>
            </div>
          </Modal.Body>
        </>
      ) : (
        <>
          <Modal.Header closeButton closeVariant="white" className={styles.header}>
            <div className={styles.headerContent}>
              <span className={styles.eyebrow}>
                Question {index + 1} of {questions.length}
              </span>
              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-label="Quiz progress"
                aria-valuemin={0}
                aria-valuemax={questions.length}
                aria-valuenow={index + (lock ? 1 : 0)}
              >
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body className={styles.body}>
            <div className={styles.questionHeader}>
              <Modal.Title as="h2" className={styles.questionTitle}>
                {question.questionTitle}
              </Modal.Title>
              {question.hint && <Hint key={index} questionHint={question.hint} />}
            </div>
            <ul className={styles.answersList}>
              {answers.map((answer, answerIndex) => (
                <li key={answer.answer}>
                  <button
                    ref={optionArray[answerIndex]}
                    type="button"
                    className={styles.answerItem}
                    aria-disabled={lock}
                    onClick={(event) => handleCorrectAnswer(event, answer.isCorrect)}
                  >
                    <span className={styles.answerLetter} aria-hidden="true">
                      {ANSWER_LETTERS[answerIndex]}
                    </span>
                    {answer.answer}
                  </button>
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer className={styles.footer}>
            <button
              type="button"
              className={styles.secondaryButton}
              disabled={index === 0}
              onClick={handlePreviousQuestion}
            >
              <MdArrowBack aria-hidden="true" />
              Previous
            </button>
            <button
              type="button"
              className={styles.primaryButton}
              disabled={!lock}
              onClick={handleNextQuestion}
            >
              {isLastQuestion ? "See results" : "Next"}
              <MdArrowForward aria-hidden="true" />
            </button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default StartQuizModal;
