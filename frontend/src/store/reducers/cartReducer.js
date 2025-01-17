import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_RESET,
  GET_CARTITEMS_FAIL,
  GET_CARTITEMS_REQUEST,
  GET_CARTITEMS_SUCCESS,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAIL,
  REMOVE_CART_ITEM_RESET,
  CLEAR_ERRORS,
  SAVE_SHIPPING_INFO,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAIL,
  UPDATE_CART_ITEM_RESET,
} from "./../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: {}, shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        cartItems: action.payload.cart,
      };

    case ADD_TO_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TO_CART_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};

export const cartItemsReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case GET_CARTITEMS_REQUEST:
      return {
        loading: true,
        cartItems: [],
      };
    case GET_CARTITEMS_SUCCESS:
      return {
        loading: false,
        cartItems: action.payload.items,
      };
    case GET_CARTITEMS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const ItemReducer = (state = { cartItems: {} }, action) => {
  switch (action.type) {
    case REMOVE_CART_ITEM_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        isRemoved: action.payload,
      };

    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case REMOVE_CART_ITEM_FAIL:
    case UPDATE_CART_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REMOVE_CART_ITEM_RESET:
      return {
        ...state,
        isRemoved: false,
      };
    case UPDATE_CART_ITEM_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
