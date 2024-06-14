import { UserQuiz } from "../../../types/types";
import { getQuizesById } from "../../../API/api";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import UserQuizList from "../UserQuizList/UserQuizList";

export const UserQuizSegment = () => {
  const [userQuizes, setUserQuizes] = useState<UserQuiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser } = useAuth();

  console.log("Here is User Quiz Segment");

  useEffect(() => {
    const getQuizes = async (): Promise<void> => {
      try {
        setIsLoading(true);
        if (currentUser) {
          const quizes = await getQuizesById(currentUser.id);
          console.log(quizes);
          if (quizes) {
            setUserQuizes(quizes);
            setIsLoading(false);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };

    getQuizes();
  }, [currentUser]);

  return (
    <>
      <div className="pt-3 text-center">
        <h6 className="mb-3">User Quiz List</h6>
        <UserQuizList quizes={userQuizes} isLoading={isLoading} />
      </div>
    </>
  );
};
