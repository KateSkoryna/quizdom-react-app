const ShareIcon = ({ className }: { className?: string }) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m17 11-4-4v2c-2 0-6 2.2-6 7 0-.667 1.2-3 6-3v2l4-4z"
    />
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default ShareIcon;
