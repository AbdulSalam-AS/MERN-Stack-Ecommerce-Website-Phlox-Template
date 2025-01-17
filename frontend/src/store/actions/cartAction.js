import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  GET_CARTITEMS_FAIL,
  GET_CARTITEMS_REQUEST,
  GET_CARTITEMS_SUCCESS,
  REMOVE_CART_ITEM_FAIL,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAIL,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  CLEAR_ERRORS,
  SAVE_SHIPPING_INFO,
} from "./../constants/cartConstants";
import axios from "axios";

// Add to cart
export const addItemsToCart =
  (id, quantity = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_TO_CART_REQUEST });

      const { data } = await axios.post(`/api/v1/cartItems/product/${id}`, {
        quantity,
      });

      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: ADD_TO_CART_FAIL,
        payload: errorMessage,
      });
    }
  };

export const getCartItems = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CARTITEMS_REQUEST });

    const { data } = await axios.get("/api/v1/cartItems");

    dispatch({ type: GET_CARTITEMS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_CARTITEMS_FAIL,
      payload: errorMessage,
    });
  }
};

export const removeItemsFromCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    const { data } = await axios.delete(`/api/v1/cartItems/product/${id}`);
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data.success });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: REMOVE_CART_ITEM_FAIL,
      payload: errorMessage,
    });
  }
};

// Add to cart
export const updateCartItems =
  (id, quantity = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_CART_ITEM_REQUEST });

      // Send the quantity along with the product ID
      const { data } = await axios.put(`/api/v1/cartItems/product/${id}`, {
        quantity,
      });

      // Dispatch the updated cart data to update the Redux state
      dispatch({
        type: UPDATE_CART_ITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: UPDATE_CART_ITEM_FAIL,
        payload: errorMessage,
      });
    }
  };

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
