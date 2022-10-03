import Image from "next/future/image";
import { useState, useContext } from "react";
// import { imagesData } from "../../data/imagesData";
import FocusModal from "../../components/FocusModal/FocusModal";
import { StoreItemContext } from "../../context/StoreItemsContext";
import styles from "./Shop.module.css";

export const Shop = () => {
  const { storeItems } = useContext(StoreItemContext);
  // const context = useContext(StoreItemContext);

  // const storeItems = [];
  const [modalFocus, setModalFocus] = useState(false);
  const [currentModalId, setCurrentModalId] = useState(0);

  const handleModalFocus = (sender) => {
    if (sender === "card") {
      setModalFocus(true);
    } else if (sender === "outside") {
      setModalFocus(false);
    } else if (sender === "closeButton") {
      setModalFocus(false);
    }
  };

  const products = storeItems.map((item, idx) => {
    return (
      <div
        key={item.id + idx}
        className={modalFocus ? styles.itemCardBackground : styles.itemCard}
        onClick={() => {
          handleModalFocus(!modalFocus ? "card" : "outside");
          setCurrentModalId(item.id);
        }}
      >
        <Image src={item.image} alt={item.name}></Image>
        <div className={styles.itemInfo}>
          <div className={styles.itemDesc}>{item.name.toUpperCase()}</div>
          <div className={styles.itemSpecs}>
            <div className={styles.itemPrice}>{`$${item.price}`}&nbsp;</div>
            <div className={styles.itemWeight}>
              {item.weight}
              {item.unit}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {modalFocus && (
        <>
          <div
            className={styles.modalOffClickWrapper}
            onClick={() => handleModalFocus("outside")}
          ></div>
          <FocusModal
            modalFocus={modalFocus}
            handleModalFocus={handleModalFocus}
            id={currentModalId}
            // onClick={(e) => e.stopPropagation()}
          />
        </>
      )}
      <div className={styles.itemCardsContainer}>
        <div className={styles.itemCards}>{products}</div>
      </div>
    </>
  );
};

export default Shop;
