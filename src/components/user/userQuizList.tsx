import { Accordion } from "react-bootstrap";
import UserQuizItem from "./userQuizItem";
import Loader from "../common/loader";
import { useEffect } from "react";
import { useAuthStore } from "../../store/AuthStore";
import { useQuizesStore } from "../../store/quizeStore";

const UserQuizList = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const getQuizesById = useQuizesStore((state) => state.getQuizesById);
  const userQuizes = useQuizesStore((state) => state.userQuizes);
  const isLoading = useQuizesStore((state) => state.isLoading);

  useEffect(() => {
    const getQuizes = async (): Promise<void> => {
      if (currentUser) {
        await getQuizesById(currentUser.id);
      }
    };

    getQuizes();
  }, [currentUser]);
  return isLoading ? (
    <Loader />
  ) : (
    <Accordion defaultActiveKey="0" flush>
      {userQuizes ? (
        userQuizes.map((quiz, index) => {
          const { id, ...rest } = quiz;
          return (
            <UserQuizItem key={id} quiz={rest} eventKey={index.toString()} />
          );
        })
      ) : (
        <p>No quizes yet</p>
      )}
    </Accordion>
  );
};

export default UserQuizList;
