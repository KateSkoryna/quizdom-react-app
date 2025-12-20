import { useNavigate, useLocation } from "react-router-dom";
import { Dropdown, Image } from "react-bootstrap";
import styles from "../../styles/components/logout.module.scss";
import { useAuthStore } from "../../store/authStore";

type LogoutProps = {
  avatar: string;
  name: string;
  isUserPage?: boolean;
  onClose?: () => void;
};

const LogoutComponent = ({ avatar, name, isUserPage: isUserPageProp, onClose }: LogoutProps) => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const isUserPage = isUserPageProp ?? location.pathname === "/user";

  const handleLogout = async () => {
    await logout();
    navigate("/");
    onClose?.();
  };

  const handleProfileClick = () => {
    navigate("/user");
    onClose?.();
  };

  return (
    <Dropdown
      align="end"
      className={`${styles.userDropdown} ${isUserPage ? styles.lightBackground : ""}`}
    >
      <Dropdown.Toggle as="div" className={styles.avatarToggle} id="user-dropdown">
        <Image src={avatar} className={styles.userIcon} />
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropdownMenu}>
        <Dropdown.Header className={styles.dropdownHeader}>Hi, {name}</Dropdown.Header>
        <Dropdown.Item
          onClick={handleProfileClick}
          className={`${styles.dropdownItem} ${isUserPage ? styles.active : ""}`}
        >
          My Profile
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout} className={styles.dropdownItem}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LogoutComponent;
