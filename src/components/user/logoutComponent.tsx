import { useNavigate, useLocation } from "react-router-dom";
import { Dropdown, Image } from "react-bootstrap";
import styles from "../../styles/components/logout.module.scss";
import { useOpenOffCanvas } from "../../store/store";
import { useAuthStore } from "../../store/AuthStore";

type LogoutProps = {
  avatar: string;
  name: string;
};

const LogoutComponent = ({ avatar, name }: LogoutProps) => {
  const setShow = useOpenOffCanvas((state) => state.setShow);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => setShow(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    handleClose();
  };

  const handleProfileClick = () => {
    navigate("/user");
    handleClose();
  };

  const isProfilePage = location.pathname === "/user";

  return (
    <Dropdown align="end" className={`${styles.userDropdown} ${isProfilePage ? styles.lightBackground : ""}`}>
      <Dropdown.Toggle
        as="div"
        className={styles.avatarToggle}
        id="user-dropdown"
      >
        <Image src={avatar} className={styles.userIcon} />
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropdownMenu}>
        <Dropdown.Header className={styles.dropdownHeader}>
          Hi, {name}
        </Dropdown.Header>
        <Dropdown.Item
          onClick={handleProfileClick}
          className={`${styles.dropdownItem} ${isProfilePage ? styles.active : ""}`}
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
