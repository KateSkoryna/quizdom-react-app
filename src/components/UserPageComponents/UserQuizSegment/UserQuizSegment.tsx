import { UserQuiz } from "../../../types/types";
import { useSetQuizForm } from "../../../store/store";
import { getQuizesById } from "../../../API/api";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { UserQuizList } from "../UserQuizList/UserQuizList";

export const UserQuizSegment = () => {
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
    <>
      <div className="pt-3 text-center">
        <h6 className="mb-3">User Quiz List</h6>
        <UserQuizList quizes={userQuizes} isLoading={isLoading} />
      </div>
    </>
  );
};
