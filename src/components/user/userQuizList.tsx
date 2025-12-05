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
  }, [currentUser, getQuizesById]);
  return isLoading ? (
    <Loader />
  ) : userQuizes && userQuizes.length > 0 ? (
    <>
      <h5 className="mb-3 text-center">My Quizes</h5>
      <Accordion defaultActiveKey="0" flush>
        {userQuizes.map((quiz, index) => {
          const { id, ...rest } = quiz;
          return (
            <UserQuizItem key={id} quiz={rest} eventKey={index.toString()} />
          );
        })}
      </Accordion>
    </>
  ) : null;
};

export default UserQuizList;
