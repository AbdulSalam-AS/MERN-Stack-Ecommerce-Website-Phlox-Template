const express = require("express");
const router = express.Router();

const { isAuthenticatedUser } = require("../middleware/auth");
const {
  GetCartItems,
  AddToCart,
  removeFromCart,
  UpdateCartItem,
} = require("../controller/cartController");

router.route("/cartItems").get(isAuthenticatedUser, GetCartItems);
router
  .route("/cartItems/product/:id")
  .post(isAuthenticatedUser, AddToCart)
  .put(isAuthenticatedUser, UpdateCartItem)
  .delete(isAuthenticatedUser, removeFromCart);

module.exports = router;
