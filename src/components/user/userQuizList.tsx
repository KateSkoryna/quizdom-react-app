import { Accordion } from "react-bootstrap";
import UserQuizItem from "./userQuizItem";
import Loader from "../common/loader";
import { useQuizesStore } from "../../store/quizeStore";
import { Status } from "../modal/quizModal";
import { useAuthStore } from "../../store/AuthStore";
import { useEffect } from "react";

const UserQuizList = ({ status, title }: { status: Status; title: string }) => {
  const userQuizes = useQuizesStore((state) => state.userQuizes);
  const isLoading = useQuizesStore((state) => state.isLoading);
  const quizes = userQuizes.filter((quiz) => quiz.status === status);
  const currentUser = useAuthStore((state) => state.currentUser);
  const getQuizesById = useQuizesStore((state) => state.getQuizesById);

  useEffect(() => {
    const getQuizes = async (): Promise<void> => {
      if (currentUser) {
        await getQuizesById(currentUser.id);
      }
    };

    getQuizes();
  }, [currentUser, getQuizesById]);

  return isLoading ? (
    <Loader />
  ) : quizes && quizes.length > 0 ? (
    <div className="pt-3 text-center">
      <h5 className="mb-3 text-center">{title}</h5>
      <Accordion defaultActiveKey="0" flush>
        {quizes.map((quiz, index) => {
          const { id, ...restQuiz } = quiz;
          return <UserQuizItem key={id} quiz={restQuiz} eventKey={index.toString()} />;
        })}
      </Accordion>
    </div>
  ) : null;
};

export default UserQuizList;
