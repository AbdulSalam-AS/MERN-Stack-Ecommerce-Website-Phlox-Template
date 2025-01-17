import { configureStore } from "@reduxjs/toolkit";
import {
  productReducer,
  productsReducer,
  productDetailsReducer,
  newProductReducer,
} from "./reducers/productReducer";

import {
  cartItemsReducer,
  cartReducer,
  ItemReducer,
} from "./reducers/cartReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  OrderReducer,
} from "./reducers/orderReducer";
import {
  newReviewReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/reviewReducer";

const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    cartItems: cartItemsReducer,
    cartItem: ItemReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    OrderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: OrderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
