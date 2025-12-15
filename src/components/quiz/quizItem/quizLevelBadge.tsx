import styles from "../../../styles/components/quizCard.module.scss";
import { QUIZ_LEVEL_CONFIG } from "../../../const/const";

type QuizLevelBadgeProps = {
  complexity: keyof typeof QUIZ_LEVEL_CONFIG;
};

const QuizLevelBadge = ({ complexity }: QuizLevelBadgeProps) => {
  const levelConfig = QUIZ_LEVEL_CONFIG[complexity] || QUIZ_LEVEL_CONFIG["1"];

  return (
    <div className={styles.levelInfo}>
      <p className={styles.complexity} style={{ color: levelConfig?.color || "#000" }}>
        <img src={levelConfig?.icon} alt={`Level ${complexity}`} className={styles.levelIcon} />
        {levelConfig?.name || complexity}
      </p>
    </div>
  );
};

export default QuizLevelBadge;
