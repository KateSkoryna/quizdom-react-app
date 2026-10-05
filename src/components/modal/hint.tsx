import { MdLightbulbOutline } from "react-icons/md";
import { useId, useState } from "react";
import styles from "../../styles/components/quizPlay.module.scss";

export default function Hint({ questionHint }: { questionHint: string }) {
  const [showHint, setShowHint] = useState(false);
  const panelId = useId();

  return (
    <>
      <button
        type="button"
        className={styles.hintButton}
        onClick={() => setShowHint(!showHint)}
        aria-expanded={showHint}
        aria-controls={panelId}
      >
        <MdLightbulbOutline aria-hidden="true" />
        {showHint ? "Hide hint" : "Show hint"}
      </button>
      {showHint && (
        <div id={panelId} className={styles.hintPanel} role="note">
          <MdLightbulbOutline aria-hidden="true" />
          <p>{questionHint}</p>
        </div>
      )}
    </>
  );
}
