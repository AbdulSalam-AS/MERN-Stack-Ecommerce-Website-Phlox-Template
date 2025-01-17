import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import {
  getCartItems,
  removeItemsFromCart,
  updateCartItems,
} from "../../store/actions/cartAction";
import { Typography } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Loader from "./../layout/Loader/Loader";
import { useAlert } from "react-alert";
import {
  REMOVE_CART_ITEM_RESET,
  UPDATE_CART_ITEM_RESET,
} from "../../store/constants/cartConstants";

function Cart() {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartItems);
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { isRemoved, isUpdated } = useSelector((state) => state.cartItem);

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }

    dispatch(updateCartItems(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty < 1) {
      return;
    }

    dispatch(updateCartItems(id, newQty));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  useEffect(() => {
    if (isRemoved) {
      alert.success("Product Removed Successfully");
      dispatch({ type: REMOVE_CART_ITEM_RESET });
    }

    if (isUpdated) {
      dispatch({ type: UPDATE_CART_ITEM_RESET });
    }

    dispatch(getCartItems());
  }, [dispatch, isAuthenticated, isRemoved, isUpdated]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="cartHeaderSection">
        <p className="fs-poppins fs-200">Home {">"} Cart</p>
        <p>Cart</p>
      </div>

      {(cartItems?.length ?? 0) === 0 ? (
        <div className="emptyCart">
          <div>
            <p>Your cart is currently empty</p>
          </div>
          <Link to="/products">Return to shop</Link>
        </div>
      ) : (
        <>
          <section className="cart-table-section">
            <div className="cart-table">
              <table>
                <thead>
                  <tr>
                    <th className="product-remove"></th>
                    <th className="product-thumbnail"></th>
                    <th className="product-name">Product</th>
                    <th className="product-price">Price</th>
                    <th className="product-quantity">Quantity</th>
                    <th className="product-subtotal">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <CartItemCard
                      item={item}
                      deleteCartItems={deleteCartItems}
                      decreaseQuantity={decreaseQuantity}
                      increaseQuantity={increaseQuantity}
                    />
                  ))}

                  <tr>
                    <td colspan="6" className="actions">
                      <div
                        type="submit"
                        className="button"
                        name="update_cart"
                        value="Update cart"
                      >
                        <p>Total</p>
                        <p>{`AFN ${cartItems.reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )}`}</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button onClick={checkoutHandler} class="checkoutBtn">
              Procceed to Checkout
            </button>
          </section>
        </>
      )}
    </>
  );
}

export default Cart;

// <div className="cartPage">
//             <div className="cartHeader">
//               <p>Product</p>
//               <p>Quantity</p>
//               <p>Subtotal</p>
//             </div>
//             {cartItems.map((item) => (
//               <div className="cartContainer" key={item.product}>
//                 <CartItemCard item={item} deleteCartItems={deleteCartItems} />
//                 <div className="cartInput">
//                   <button
//                     onClick={() =>
//                       decreaseQuantity(item.product, item.quantity)
//                     }
//                   >
//                     -
//                   </button>
//                   <input type="number" readOnly value={item.quantity} />
//                   <button
//                     onClick={() =>
//                       increaseQuantity(item.product, item.quantity, item.stock)
//                     }
//                   >
//                     +
//                   </button>
//                 </div>
//                 <p className="cartSubtotal">{`AFN ${
//                   item.price * item.quantity
//                 }`}</p>
//               </div>
//             ))}

//           </div>
