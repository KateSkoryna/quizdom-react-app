import { Popover, Overlay } from "react-bootstrap";
import { MdLightbulbOutline } from "react-icons/md";
import { useRef, useState } from "react";
import styles from "../../styles/components/modal.module.scss";

export default function Hint({ questionHint }: { questionHint: string }) {
  const [showHint, setShowHint] = useState(false);
  const hint = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={hint}
        type="button"
        className={styles.hintButton}
        onClick={() => setShowHint(!showHint)}
      >
        <MdLightbulbOutline size={24} />
        <span>Hint</span>
      </button>
      <Overlay target={hint.current} show={showHint} placement="bottom">
        {(props) => (
          <Popover {...props}>
            <Popover.Body className={styles.hintContent}>
              <MdLightbulbOutline size={20} />
              <p>{questionHint}</p>
            </Popover.Body>
          </Popover>
        )}
      </Overlay>
    </>
  );
}
