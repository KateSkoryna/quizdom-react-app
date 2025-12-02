const CommentIcon = ({ className }: { className?: string }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M1.5,5.3v9.54a3.82,3.82,0,0,0,3.82,3.82H7.23v2.86L13,18.66h5.73a3.82,3.82,0,0,0,3.82-3.82V5.3a3.82,3.82,0,0,0-3.82-3.82H5.32A3.82,3.82,0,0,0,1.5,5.3Z"
      fill="#FFFFFF"
      stroke="#808080"
      strokeMiterlimit="10"
      strokeWidth="1.91"
    />
    <line
      x1="15.82"
      y1="10.07"
      x2="17.73"
      y2="10.07"
      stroke="#808080"
      strokeMiterlimit="10"
      strokeWidth="1.91"
    />
    <line
      x1="11.05"
      y1="10.07"
      x2="12.95"
      y2="10.07"
      stroke="#808080"
      strokeMiterlimit="10"
      strokeWidth="1.91"
    />
    <line
      x1="6.27"
      y1="10.07"
      x2="8.18"
      y2="10.07"
      stroke="#808080"
      strokeMiterlimit="10"
      strokeWidth="1.91"
    />
  </svg>
);

export default CommentIcon;
