import { Accordion } from "react-bootstrap";
import { UserQuizListItem } from "../UserQuizListItem/UserQuizListItem";

import Loader from "../../Loader/Loader";
import { UserQuiz } from "../../../types/types";

const UserQuizList = ({
  quizes,
  isLoading,
}: {
  quizes: UserQuiz[] | null;
  isLoading: boolean;
}) => {
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
