import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import { koana_logo } from "../../../assets/images/icons";
import { CartContext } from "../../../context/CartContext";
import { GetIcon } from "../GetIcon";
import styles from "./SmScreenMenu.module.scss";

const SmScreenMenu = () => {
  const [expand, setExpand] = useState(false);
  // const navigate = useNavigate();
  const router = useRouter();
  const darkThemes = ["/"];
  // const location = useLocation();
  // const isDark = darkThemes.some((path) => path === location.pathname);
  const value = useContext(CartContext);

  const menuBtnRef = useRef(null);

  // the following useEffect hook is used to close the vertical menu when
  // the user clicks off of the menu
  useEffect(() => {
    const outsideClick = document.querySelector("html");
    const closeVerticalMenu = (e) => {
      if (!menuBtnRef.current.contains(e.target) && expand) {
        setExpand(false);
      }
      // const target = e.target.classList.value;
      // if (target === "" && expand) {
      //   handleExpand();
      // }
    };

    outsideClick.addEventListener("click", closeVerticalMenu);

    return () => {
      outsideClick.removeEventListener("click", closeVerticalMenu);
    };
  }, [expand]);

  const burgerCollapsedKoanaIcon = (
    <div key={"koanaIcon"} className={styles.burgerCollapsedKoanaIcon}>
      <Image
        onClick={() => {
          router.replace(`/`);
        }}
        src={koana_logo}
        alt="logo"
      />
    </div>
  );

  const koanaIcon = (
    <div key={"koanaIcon"} className="koanaIcon">
      <Image
        onClick={() => {
          router.replace(`/`);
        }}
        src={koana_logo}
        alt="logo"
      />
    </div>
  );

  const tradNavItems = ["shop", "about"].map((item, idx) => (
    <div className={styles.tradNavItems} key={`${idx}${item}`}>
      <div onClick={() => router.push(`/${item}`)}>{item}</div>
    </div>
  ));

  // const hiddenStyle = expand
  //   ? "burgerNavItems"
  //   : "burgerNavItems burgerNavItemsHide";
  // console.log("isDark", isDark);
  // const classStyle = isDark
  //   ? hiddenStyle + " darkTheme"
  //   : hiddenStyle + " lightTheme";

  const _styles = expand
    ? { isVisible: "", fade: styles.burgerFade, expand: styles.burgerExpand }
    : { isVisible: styles.burgerNavItemsHide, fade: "", expand: "" };

  return (
    <div className={styles.container}>
      <div className={styles.bigMacMode}>
        <div
          className={styles.bigMacIcon}
          onClick={(e) => {
            e.stopPropagation();
            setExpand((prev) => !prev);
          }}
        >
          <>
            <div className={styles.burgerSpacer}></div>
            <div className={`${styles.burger} ${_styles.fade}`}></div>
            <div className={`${styles.burger} ${_styles.expand}`}></div>
            <div className={`${styles.burger} ${_styles.fade}`}></div>
          </>
        </div>
        {!expand && <div>{burgerCollapsedKoanaIcon}</div>}
      </div>
      <div
        className={`${styles.burgerNavItems} ${_styles.isVisible}`}
        ref={menuBtnRef}
      >
        {koanaIcon}
        {tradNavItems}
        <GetIcon faInstagram={faInstagram} faCartArrowDown={faCartArrowDown} />
      </div>
    </div>
  );
};
export default SmScreenMenu;
