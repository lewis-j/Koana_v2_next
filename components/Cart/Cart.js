// we're going to access imagesData with the testData 'props'
import { imagesData } from "../../data/imagesData";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { StoreItemContext } from "../../context/StoreItemsContext";
import styles from "./Cart.module.css";
import Image from "next/image";

const Cart = () => {
  const value = useContext(CartContext);
  const { storeItems } = useContext(StoreItemContext);
  const navigate = useNavigate();
  const subTotal = () => {
    return value.cartData.reduce((acc, cur) => {
      const item = storeItems.find((item) => item.id === cur.id);
      return item.price * cur.quantity + acc;
    }, 0);
  };

  const cartItemsContent = () => {
    console.log("test", storeItems[0].name);
    console.log("cartData", value.cartData);
    const itemList = value.cartData.map((cartItem, idx) => {
      const { name, price, weight, unit, image } = storeItems.find(
        (item) => item.id === cartItem.id
      );

      return (
        <div key={idx} className={styles.cartItem}>
          <div className={styles.cartItemContent}>
            <div className={styles.cartItemStatsContainer}>
              <div className={styles.cartItemTitleContainer}>
                <div className={styles.cartItemName}>{name.toUpperCase()}</div>
              </div>
              <div className={styles.cartItemPrice}>
                ${price} {weight !== undefined && "/"} {weight}
                {unit}
              </div>
              <div className={styles.cartItemEditorContainer}>
                <div className={styles.cartItemQuantityContainer}>
                  <div
                    className={styles.cartIncrement}
                    onClick={() =>
                      value.cartHandleItemQuantityChange(cartItem.id, true)
                    }
                  >
                    <div className={styles.cartPlusHorizontal}></div>
                    <div className={styles.cartPlusVertical}></div>
                  </div>
                  <div className={styles.cartQuantityWindow}>
                    {cartItem.quantity}
                  </div>
                  <div
                    className={styles.cartDecrement}
                    onClick={() =>
                      value.cartHandleItemQuantityChange(cartItem.id, false)
                    }
                  >
                    <div className={styles.cartMinus}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.removeAndImageContainer}>
              <div
                className={styles.cartRemoveItem}
                onClick={() => value.handleRemoveItem(cartItem.id)}
              >
                {"remove"}
              </div>
              <div className={styles.cartItemImageContainer}>
                <Image src={image} placeholder="item" alt="item" />
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <>
        <div className={styles.cartHeaderContainer}>
          <div className={styles.cartHeader}>{"CART"}</div>
          <div
            className={styles.cartHeaderCloseButton}
            onClick={() => value.displayCart && value.handleDisplayCart()}
          >
            <div className={styles.cartHeaderCloseButtonLeftLine}></div>
            <div className={styles.cartHeaderCloseButtonRightLine}></div>
          </div>
        </div>
        <div className={styles.cartScrollWrapper}>{itemList}</div>
        {subTotal() ? (
          <div className={styles.cartSubTotalContainer}>
            <div className={styles.cartSubTotal}>
              {"subtotal".toUpperCase()} ${subTotal()}
            </div>
            <div className={styles.cartSubTotalControls}>
              <div
                className={styles.cartToCheckout}
                // checkout button now goes to checkout section
                onClick={() => {
                  navigate("/checkout");
                  value.displayCart && value.handleDisplayCart();
                }}
              >
                {"checkout".toUpperCase()}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.cartSubTotalContainer}>
            <div className={styles.cartSubTotal}>cart is empty</div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {value.displayCart && (
        <div
          className={styles.cartOffClickWrapper}
          onClick={() => value.handleDisplayCart()}
        ></div>
      )}
      {value.displayCart && (
        <div className={styles.cartModal}>
          <div>{cartItemsContent()}</div>
        </div>
      )}
    </>
  );
};

export default Cart;
