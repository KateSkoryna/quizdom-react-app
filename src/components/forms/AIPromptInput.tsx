import { Form } from "react-bootstrap";
import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { MdAutoAwesome, MdMic, MdStop } from "react-icons/md";
import styles from "../../styles/components/quizForm.module.scss";

const MAX_PROMPT_LENGTH = 250;

interface AIPromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  isDisabled: boolean;
  error?: string | null;
  remainingAttempts: number;
}

const AIPromptInput = ({
  value,
  onChange,
  onGenerate,
  isGenerating,
  isDisabled,
  error,
  remainingAttempts,
}: AIPromptInputProps) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // Update prompt only when listening stops
  useEffect(() => {
    if (!listening && transcript) {
      const newText = value ? `${value} ${transcript}` : transcript;
      const trimmed = newText.trim().slice(0, MAX_PROMPT_LENGTH);
      onChange(trimmed);
      resetTranscript();
    }
  }, [listening, transcript, value, onChange, resetTranscript]);

  const handleMicrophoneClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: false });
    }
  };

  return (
    <section className={styles.aiSection} aria-labelledby="ai-generate-title">
      <h3 id="ai-generate-title" className={styles.sectionTitle}>
        <MdAutoAwesome aria-hidden="true" />
        Generate with AI
      </h3>
      <p className={styles.aiHint}>
        Optional. Pick the level and category below, describe what you want, and AI drafts the
        questions for you.
      </p>
      <Form.Group className={styles.field} controlId="div-userPrompt">
        <Form.Label className={styles.label}>
          Prompt
          {!browserSupportsSpeechRecognition && (
            <span className={styles.voiceNotSupported}> · voice input not supported</span>
          )}
        </Form.Label>
        <div className={styles.aiRow}>
          <div className={styles.textareaWithMic}>
            <Form.Control
              className={styles.textarea}
              as="textarea"
              rows={3}
              maxLength={MAX_PROMPT_LENGTH}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="e.g. 10 questions on real-world async/await scenarios"
            />
            {browserSupportsSpeechRecognition && (
              <button
                type="button"
                className={`${styles.micButton} ${listening ? styles.listening : ""}`}
                onClick={handleMicrophoneClick}
                aria-label={listening ? "Stop recording" : "Start voice input"}
                title={listening ? "Stop recording" : "Start voice input"}
              >
                {listening ? <MdStop aria-hidden="true" /> : <MdMic aria-hidden="true" />}
              </button>
            )}
          </div>
          <button
            type="button"
            className={`${styles.generateButton} ${isGenerating ? styles.generating : ""}`}
            onClick={onGenerate}
            disabled={isDisabled}
          >
            <MdAutoAwesome aria-hidden="true" />
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        </div>
      </Form.Group>
      <div className={styles.metaRow}>
        <span>
          {value.length}/{MAX_PROMPT_LENGTH} characters
        </span>
        <span>{remainingAttempts > 0 && `${remainingAttempts} generations left`}</span>
      </div>

      {error && (
        <p className={styles.aiError} role="alert">
          {error}
        </p>
      )}

      {remainingAttempts <= 0 && (
        <p className={styles.aiWarning}>
          Maximum generation attempts reached. Please reload to try again.
        </p>
      )}
    </section>
  );
};

export default AIPromptInput;
