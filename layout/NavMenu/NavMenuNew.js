import RegularNavBar from "./RegularNavBar";
import styles from "./NavMenuNew.module.css";
import SmScreenMenu from "./SmScreenMenu/SmScreenMenu";

export const NavBarNew = ({ modalFocus, cartFocus }) => {
  return (
    <div className={styles.navFloat}>
      <RegularNavBar />
      <SmScreenMenu />
    </div>
  );
};
