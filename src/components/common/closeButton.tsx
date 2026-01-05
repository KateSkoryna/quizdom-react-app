type CloseButtonProps = {
  size?: number;
  color?: string;
  onClick?: () => void;
  className?: string;
};

export default function CloseButton({
  size = 20,
  color = "currentColor",
  onClick,
  className = "",
}: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`close-btn ${className}`}
      style={{
        lineHeight: 0,
        padding: 0,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: color,
      }}
      aria-label="Close"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M2 2 L14 14 M14 2 L2 14" />
      </svg>
    </button>
  );
}
