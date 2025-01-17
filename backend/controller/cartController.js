const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.AddToCart = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Get the quantity from the request body (default to 1 if not provided)
  const quantity = req.body.quantity || 1;

  let cart = await Cart.findOne({ user: user });

  if (!cart) {
    // If no cart exists, create a new cart with the product and quantity
    cart = await Cart.create({
      user: user,
      products: [{ product: product._id, quantity: quantity }],
    });

    await cart.save();
  } else {
    // If cart exists, check if the product is already in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === product._id.toString()
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity; // Update quantity
    } else {
      cart.products.push({ product: product._id, quantity: quantity });
    }

    await cart.save();
  }

  // Return the updated cart with all product details
  res.status(200).json({
    success: true,
    cart,
  });
});

exports.GetCartItems = catchAsyncErrors(async (req, res, next) => {
  const userId = req?.user?._id;

  // Attempt to find the user's cart
  let cart = await Cart.findOne({ user: userId }).populate("products.product");

  // If no cart exists, respond with an empty array
  if (!cart || cart == null) {
    return res.status(200).json({
      success: true,
      items: [], // Return an empty array for the cart items
    });
  }

  // Map the products in the cart to the required format
  const products = cart?.products?.map((item) => ({
    product: item?.product?._id,
    name: item?.product?.name,
    price: item?.product?.price,
    image: item?.product?.images[0],
    stock: item?.product?.stock,
    quantity: item?.quantity,
  }));

  // Respond with the cart items
  res.status(200).json({
    success: true,
    items: products,
  });
});

exports.UpdateCartItem = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const productId = req.params.id;
  const quantity = req.body.quantity;

  if (!user) return next(new ErrorHandler("Invalid User", 404));

  let cart = await Cart.findOne({ user: user });

  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }

  // Find the product in the cart's products array
  const productIndex = cart.products.findIndex(
    (product) => product.product.toString() === productId
  );

  // Update the quantity of the existing product
  cart.products[productIndex].quantity = quantity;

  // Save the updated cart
  await cart.save();

  res.status(200).json({
    success: true,
    cart,
  });
});

exports.removeFromCart = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const productId = req.params.id;

  if (!user) return next(new ErrorHandler("Invalid User", 404));

  let cart = await Cart.findOne({ user: user });

  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }

  // Remove the product from the cart using $pull
  await Cart.updateOne(
    { user: user },
    { $pull: { products: { product: productId } } }
  );

  res.status(200).json({
    success: true,
    message: "Item Removed successfully",
  });
});
