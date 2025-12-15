import { Accordion } from "react-bootstrap";
import UserQuizItem from "./userQuizItem";
import Loader from "../common/loader";
import { useQuizesStore } from "../../store/quizeStore";
import { Status } from "../modal/quizModal";

const UserQuizList = ({ status, title }: { status: Status; title: string }) => {
  const userQuizes = useQuizesStore((state) => state.userQuizes);
  const isLoading = useQuizesStore((state) => state.isLoading);

  const quizes = userQuizes.filter((quiz) => quiz.status === status);

  return isLoading ? (
    <Loader />
  ) : quizes && quizes.length > 0 ? (
    <div className="pt-3 text-center">
      <h5 className="mb-3 text-center">{title}</h5>
      <Accordion defaultActiveKey="0" flush>
        {quizes.map((quiz, index) => {
          const { id, ...rest } = quiz;
          return <UserQuizItem key={id} quiz={rest} eventKey={index.toString()} />;
        })}
      </Accordion>
    </div>
  ) : null;
};

export default UserQuizList;
