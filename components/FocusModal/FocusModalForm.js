import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { StoreItemContext } from "../../context/StoreItemsContext";
// import { imagesData } from "../../data/imagesData";
import "./focusModalForm.css";

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
            <div className="formContent">
                <div className="quantityLabel">QUANTITY</div>
                <div className="quantityContainer">
                    <div
                        className="increment"
                        onClick={() => {
                            handleQuantityChange(true);
                        }}
                    >
                        <div className="plusHorizontal"></div>
                        <div className="plusVertical"></div>
                    </div>
                    <div className="quantityWindow">{itemQuantity}</div>
                    <div
                        className="decrement"
                        onClick={() => {
                            console.log("handling quantity change");
                            handleQuantityChange(false);
                        }}
                    >
                        <div className="minus"></div>
                    </div>
                </div>
                <div
                    // (below) will alter classname of submit button
                    // to reflect if itemQuantity is > 0
                    className={`${
                        !itemQuantity ? "submitButton Zero" : "submitButton"
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