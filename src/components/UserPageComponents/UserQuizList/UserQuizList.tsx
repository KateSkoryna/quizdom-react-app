import { Accordion } from "react-bootstrap";
import { UserQuizListItem } from "../UserQuizListItem/UserQuizListItem";

import { Loader } from "../../Loader/Loader";
import { UserQuiz } from "../../../types/types";

export const UserQuizList = ({
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
        quizes.map((quiz, index) => (
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
  );
};
