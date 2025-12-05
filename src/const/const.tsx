import Intermediate from "../assets/bishop.svg";
import Beginner from "../assets/knight.svg";
import Expert from "../assets/queen.svg";
import Advanced from "../assets/rook.svg";

export const DEFAULT_IMG: string =
  "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2024/05/ipad-apple-event-logo.jpg";

export const QUIZ_LEVEL_CONFIG = {
  "1": { name: "Beginner", color: "#F7941D", icon: Beginner },
  "2": { name: "Intermediate", color: "#E8A83D", icon: Intermediate },
  "3": { name: "Advanced", color: "#5CB8E0", icon: Advanced },
  "4": { name: "Expert", color: "#27AAE1", icon: Expert },
};
