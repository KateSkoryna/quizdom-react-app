import { Accordion } from "react-bootstrap";
import UserQuizItem from "./userQuizItem";
import Loader from "../common/loader";
import { useQuizStore } from "../../store/quizStore";
import { Status } from "../modal/quizModal";
import { useAuthStore } from "../../store/authStore";
import { useEffect } from "react";

const UserQuizList = ({ status, title }: { status: Status; title: string }) => {
  const isLoading = useQuizStore((state) => state.isLoading);
  const currentUser = useAuthStore((state) => state.currentUser);
  const getQuizzesById = useQuizStore((state) => state.getQuizzesById);
  const getUserQuizzes = useQuizStore((state) => state.getUserQuizzes);

  // Get user's quizzes using selector
  const quizzes = currentUser ? getUserQuizzes(currentUser.id, status) : [];

  useEffect(() => {
    const getQuizzes = async (): Promise<void> => {
      if (currentUser) {
        await getQuizzesById(currentUser.id);
      }
    };

    getQuizzes();
  }, [currentUser, getQuizzesById]);

  return isLoading ? (
    <Loader />
  ) : quizzes && quizzes.length > 0 ? (
    <div className="pt-3 text-center">
      <h5 className="mb-3 text-center">{title}</h5>
      <Accordion defaultActiveKey="0" flush>
        {quizzes.map((quiz, index) => {
          return (
            <UserQuizItem
              key={quiz.id}
              quiz={quiz}
              eventKey={index.toString()}
              isDraft={status === "draft"}
            />
          );
        })}
      </Accordion>
    </div>
  ) : null;
};

export default UserQuizList;
