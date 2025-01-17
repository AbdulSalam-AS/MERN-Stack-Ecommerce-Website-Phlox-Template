import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProduct,
  getProductDetails,
} from "../../store/actions/productAction.js";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import { addItemsToCart } from "../../store/actions/cartAction.js";
import { newReview } from "./../../store/actions/reviewAction";
import { NEW_REVIEW_RESET } from "../../store/constants/reviewConstants.js";
import { ADD_TO_CART_RESET } from "../../store/constants/cartConstants.js";

const ProductDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { success: cartSuccess, error: cartError } = useSelector(
    (state) => state.cartItems
  );

  const {
    loading: productsLoading,
    error: productsError,
    products,
  } = useSelector((state) => state.products);

  const relatedProducts = products?.filter(
    (p) => p.category === product.category && p._id !== product._id
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (cartError) {
      alert.error(cartError);
      dispatch(clearErrors());
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    if (cartSuccess) {
      dispatch({ type: ADD_TO_CART_RESET });
    }

    dispatch(getProduct());

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success, isAuthenticated]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- ECOMMERCE`} />

          <div className="productHeaderSection">
            <p>Shop {">"} Product</p>
            <p>Product Details</p>
          </div>

          <section className="productDetails">
            <div className="image-section">
              {product.images && <img src={product?.images[0]?.url} alt="" />}
            </div>
            <div className="details-section">
              <h1 className="fs-500 fs-poppins">{product.name}</h1>
              <div className="review-section">
                <div className="ratings">
                  <Rating {...options} />
                </div>
                <p className="fs-poppins">
                  {product.numOfReviews == 1
                    ? `${product.numOfReviews} customer review`
                    : "customer reviews"}
                </p>
              </div>
              <p className="fs-300 fs-poppins bold-500">
                Price: AFN {product.price}
              </p>
              <p className="fs-poppins"> {product.description}</p>
              <div className="cart-section">
                <input
                  type="number"
                  className="fs-poppins bold-500 fs-200"
                  value={quantity}
                  min="0"
                />
                <div className="quantityBtn">
                  <button onClick={increaseQuantity}>+</button>
                  <button onClick={decreaseQuantity}>-</button>
                </div>
                <button
                  className="large-btn fs-poppins text-white bg-red"
                  disabled={
                    product.stock < 1
                      ? true
                      : false || isAuthenticated
                      ? false
                      : true
                  }
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>
              <div className="product-category">
                <p className="fs-poppins bold-500 fs-100">
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>

                <p className="fs-poppins bold-500 fs-100">
                  Category: <span className="text-red">{product.category}</span>
                </p>
              </div>
              <button
                onClick={submitReviewToggle}
                className="reviewBtn large-btn fs-poppins text-white"
              >
                Submit Review
              </button>
              <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
              >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />

                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={reviewSubmitHandler} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </section>

          <div className="tabs">
            <p className="fs-poppins bold-500 text-black rev">
              {product.reviews?.length === 1
                ? "Review (1)"
                : `Reviews (${product.reviews?.length})`}
            </p>
          </div>

          <section id="reviewSection" data-visible="true">
            <h1 className="fs-montserrat">
              {" "}
              {product.reviews?.length === 1
                ? `1 review for ${product.name}`
                : `${product.reviews?.length} reviews for ${product.name}`}
            </h1>
            <div className="review_section">
              {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ReviewCard key={review._id} review={review} />
                    ))}
                </div>
              ) : (
                <p className="noReviews">No Reviews Yet</p>
              )}
            </div>
          </section>

          <section className="products-section">
            <h1 className="fs-montserrat fs-300">Related Products</h1>
            <div className="related-products">
              {relatedProducts &&
                relatedProducts.map((product) => (
                  <Link to={`/product/${product._id}`} className="product">
                    {product?.images && (
                      <img src={product?.images[0]?.url} alt="" />
                    )}
                    <p className="fs-poppins fs-200 bold-500">{product.name}</p>
                    <div>
                      <p className="fs-poppins fs-200 bold-500">
                        AFN {product.price}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductDetails;

{
  /* <div className="ProductDetails">
            <div>
              <Carousel className="carousel">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`AFN ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={
                      product.stock < 1
                        ? true
                        : false || isAuthenticated
                        ? false
                        : true
                    }
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>


          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )} */
}
