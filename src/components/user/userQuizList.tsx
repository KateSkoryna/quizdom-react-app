import { Accordion } from "react-bootstrap";
import UserQuizListItem from "./userQuizListItem";
import Loader from "../common/loader";
import { UserQuiz } from "../../types/types";

type UserQuizListProps = {
  quizes: UserQuiz[] | null;
  isLoading: boolean;
};

const UserQuizList = ({ quizes, isLoading }: UserQuizListProps) => {
  return (
    <Accordion defaultActiveKey="0" flush>
      {isLoading ? (
        <Loader />
      ) : quizes ? (
        quizes.map((quiz, index) => {
          const { id, ...rest } = quiz;
          return (
            <UserQuizListItem
              key={id}
              quiz={rest}
              eventKey={index.toString()}
            />
          );
        })
      ) : (
        <p>No quizes yet</p>
      )}
    </Accordion>
  );
};

export default UserQuizList;
