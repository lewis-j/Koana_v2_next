import { useState, useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { StoreItemContext } from "../../../context/StoreItemsContext";
// import { imagesData } from "../../data/imagesData";
import styles from "./FocusModalForm.module.css";

const FocusModalForm = ({ id, variationId, handleModalFocus }) => {
  const value = useContext(CartContext);
  const { storeItems } = useContext(StoreItemContext);

  const [itemQuantity, setItemQuantity] = useState(
    value.getCartData().find((item) => item.id === id)?.quantity || 0
  );

  const handleQuantityChange = (increment) => {
    // console.log("store item", storeItems);
    const available = storeItems.find((item) => item.id === id).inventory;
    increment
      ? setItemQuantity((prev) => {
          return itemQuantity < available ? prev + 1 : prev;
        })
      : setItemQuantity((prev) => {
          return itemQuantity > 0 ? prev - 1 : prev;
        });
  };

  return (
    <>
      <div className={styles.formContent}>
        <div className={styles.quantityLabel}>QUANTITY</div>
        <div className={styles.quantityContainer}>
          <div
            className={styles.increment}
            onClick={() => {
              handleQuantityChange(true);
            }}
          >
            <div className={styles.plusHorizontal}></div>
            <div className={styles.plusVertical}></div>
          </div>
          <div className={styles.quantityWindow}>{itemQuantity}</div>
          <div
            className={styles.decrement}
            onClick={() => {
              console.log("handling quantity change");
              handleQuantityChange(false);
            }}
          >
            <div className={styles.minus}></div>
          </div>
        </div>
        <div
          // (below) will alter classname of submit button
          // to reflect if itemQuantity is > 0
          className={`${
            !itemQuantity
              ? `${styles.submitButton} ${styles.Zero}`
              : styles.submitButton
          }`}
          onClick={() => {
            value.updateCart(id, itemQuantity);
            handleModalFocus("closeButton");
          }}
        >
          {"update cart".toUpperCase()}
        </div>
      </div>
    </>
  );
};

export default FocusModalForm;
