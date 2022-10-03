// import { imagesData } from "../../data/imagesData";
import { FocusModalForm } from "./FocusModalForm";
// import koana_logo_outline from '../../layout/NavMenu/koana_logo_outline.png';
import styles from "./FocusModal.module.css";
import Image from "next/future/image";
import { useContext } from "react";
import { StoreItemContext } from "../../context/StoreItemsContext";

const FocusModal = ({ handleModalFocus, id }) => {
  const { storeItems } = useContext(StoreItemContext);

  console.log("store items", storeItems);
  const item = storeItems.find((item) => item.id === id);
  if (!item) return null;
  return (
    <div key={"modal".concat(item.id)} className={styles.modalBackground}>
      <div
        className={styles.modalCloseButton}
        onClick={() => handleModalFocus("closeButton")}
      >
        <div className={styles.modalCloseButtonLeftLine}></div>
        <div className={styles.modalCloseButtonRightLine}></div>
      </div>
      <div className={styles.modalBorder}>
        <Image src={item.image} alt={item.name} />
        <div className={styles.boxDetails}>
          <div className={styles.boxText}>
            <div className={styles.boxName}>{item.name.toUpperCase()}</div>
            <div className={styles.boxDesc}>{item.desc.toUpperCase()}</div>
            <div className={styles.boxPrice}>
              {`$${item.price}`}&nbsp;/ {item.weight}
              {item.unit}
            </div>
          </div>
          <FocusModalForm id={id} handleModalFocus={handleModalFocus} />
        </div>
      </div>
    </div>
  );
};

export default FocusModal;
