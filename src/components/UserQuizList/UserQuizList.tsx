import { Accordion } from "react-bootstrap";
import { UserQuizListItem } from "../UserQuizListItem/UserQuizListItem";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Loader } from "../Loader/Loader";
import { UserQuiz } from "../../types/types";
import { useSetQuizForm } from "../../store/store";
import { getQuizesById } from "../../API/api";

export const UserQuizList = () => {
  const [userQuizes, setUserQuizes] = useState<UserQuiz[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const quizData = useSetQuizForm((state) => state.newQuizData);

  const { currentUser } = useAuth();

  useEffect(() => {
    const getQuizes = async (): Promise<void> => {
      setIsLoading(true);
      try {
        if (currentUser) {
          const quizes = await getQuizesById(currentUser.id);
          setUserQuizes(quizes ?? null);
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };

    getQuizes();
  }, [quizData]);

  return (
    <div className="pt-3 text-center">
      <h6 className="mb-3">User Quiz List</h6>
      <Accordion defaultActiveKey="0" flush>
        {isLoading ? (
          <Loader />
        ) : userQuizes ? (
          userQuizes.map((quiz, index) => (
            <UserQuizListItem
              key={quiz.id}
              quiz={quiz}
              eventKey={index.toString()}
            />
          ))
        ) : (
          <p>No quizes yet</p>
        )}
      </Accordion>
    </div>
  );
};
