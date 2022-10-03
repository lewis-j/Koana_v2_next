import { GetIcon } from "./GetIcon";
import { koana_logo } from "../../assets/images/icons";
import styles from "./RegularNavBar.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

const RegularNavBar = () => {
  //   const navigate = useNavigate();
  const router = useRouter();

  const koanaIcon = (
    <div key={"koanaIcon"} className={styles.regularKoanaIcon}>
      <div className={styles.koanaImg}>
        <Image
          objectFit="contain"
          layout="fill"
          className={styles.KoanaLogo}
          onClick={() => {
            router.replace("/");
          }}
          src={koana_logo}
          alt="logo"
        />
      </div>
    </div>
  );

  const tradNavItems = ["shop", "about"].map((item, idx) => (
    <div
      onClick={() => router.push(`/${item}`)}
      key={`${idx}${item}`}
      className={styles.regularTradNavItems}
    >
      {item}
    </div>
  ));

  return (
    <div className={styles.regularNavContainer}>
      {koanaIcon}
      <div className={styles.regularNavItems}>
        {tradNavItems}
        <GetIcon />
      </div>
    </div>
  );
};

export default RegularNavBar;
