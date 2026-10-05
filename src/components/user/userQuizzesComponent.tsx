import AddQuizComponent from "../quiz/addQuizComponent";
import UserQuizList from "./userQuizList";
import { PanelHeader } from "./userPanel";

const UserQuizzesComponent = () => {
  return (
    <>
      <PanelHeader
        title="Published quizzes"
        subtitle="Quizzes you created and shared with everyone"
        action={<AddQuizComponent />}
      />
      <UserQuizList status="done" />
    </>
  );
};

export default UserQuizzesComponent;
