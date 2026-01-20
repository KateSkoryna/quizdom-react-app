import { Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import styles from "../../styles/components/modal.module.scss";

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
      const trimmed = newText.trim().slice(0, 250);
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
    <Form.Group className={styles.aiPromptGroup} controlId="div-userPrompt">
      <Form.Label className={styles.formLabel}>
        AI Prompt (optional)
        {!browserSupportsSpeechRecognition && (
          <span className={styles.voiceNotSupported}> (Voice input not supported)</span>
        )}
      </Form.Label>
      <div className={styles.textareaButtonWrapper}>
        <div className={styles.textareaWithMic}>
          <Form.Control
            className={styles.formTextarea}
            as="textarea"
            rows={4}
            maxLength={250}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Generate 10 questions focusing on real-world scenarios with selected complexity and category..."
          />
          {browserSupportsSpeechRecognition && (
            <button
              type="button"
              className={`${styles.micButton} ${listening ? styles.listening : ""}`}
              onClick={handleMicrophoneClick}
              aria-label={listening ? "Stop recording" : "Start voice input"}
              title={listening ? "Stop recording" : "Start voice input"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                {listening ? (
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z M17.91 11c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
                ) : (
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z M17.91 11c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
                )}
              </svg>
            </button>
          )}
        </div>
        <Button
          type="button"
          className={[styles.generateAIBtn, styles.aiGenerateButton, isGenerating && styles.loading]
            .filter(Boolean)
            .join(" ")}
          onClick={onGenerate}
          disabled={isDisabled}
        />
      </div>
      <Form.Text className={styles.smallText}>{value.length}/250 characters</Form.Text>

      {error && <div style={{ color: "red", marginTop: "0.5rem" }}>{error}</div>}

      {remainingAttempts <= 0 && (
        <div style={{ color: "orange", marginTop: "0.5rem" }}>
          Maximum generation attempts reached. Please reload to try again.
        </div>
      )}
    </Form.Group>
  );
};

export default AIPromptInput;
