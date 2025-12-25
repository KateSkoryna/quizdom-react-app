import { useState } from "react";
import { MdShare, MdCheck } from "react-icons/md";
import styles from "../../../styles/components/quizCard.module.scss";

type ShareElementProps = {
  quizId: string;
  onAuthRequired?: () => void;
};

const ShareElement = ({ quizId }: ShareElementProps) => {
  const [copied, setCopied] = useState(false);

  // Construct the correct quiz URL (not using current page href)
  const quizUrl = `${window.location.origin}/#/quizzes/${quizId}`;
  const shareMessage = `${quizUrl}\n\nCheck out this quiz!`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Check out this quiz!",
      text: `Check out this quiz!\n\n${quizUrl}`  // Include URL in text to ensure it's always shared
    };
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    try {
      // Only use Native Share on platforms where it's 100% reliable
      if (navigator.share && (isSafari || isMobile) && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await copyToClipboard();
      }
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") await copyToClipboard();
    }
  };

  return (
    <button
      onClick={handleShare}
      className={styles.shareButton}
      aria-label={copied ? "Link copied" : "Share quiz"}
    >
      {copied ? (
        <MdCheck className={`${styles.shareIcon} ${styles.copied}`} />
      ) : (
        <MdShare className={styles.shareIcon} />
      )}
    </button>
  );
};

export default ShareElement;
