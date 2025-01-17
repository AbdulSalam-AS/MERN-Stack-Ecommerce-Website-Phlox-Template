import "./ConfirmOrder.css";
import React, { useState, useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import MetaData from "../layout/MetaData";
import Loader from "./../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { getCartItems } from "../../store/actions/cartAction";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useAlert } from "react-alert";
import { createOrder } from "../../store/actions/orderAction";

function ConfirmOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cartItems);
  const [showLinks, setShowLinks] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const profileHander = () => {
    setIsDialogVisible(true);
  };

  useEffect(() => {
    setIsDialogVisible(showLinks);
  }, [showLinks]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleClickOutside = (event) => {
    if (event.target.closest(".paymentDialog") === null) {
      setIsDialogVisible(false);
    }
  };

  useEffect(() => {
    // Attach event listener to detect clicks outside the dialog
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  useEffect(() => {
    // Redirect to login if the user is not authenticated
    if (isAuthenticated === false) {
      navigate("/login");
    }
    dispatch(getCartItems());
  }, [navigate, isAuthenticated]);

  if (loading) {
    return <Loader />;
  }

  // Handle case where user is not available (null or undefined)
  if (!user) {
    return <Loader />;
  }

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const handlePaymentOption = () => {
    switch (selectedOption) {
      case "Credit Card":
        const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        navigate("/process/payment");
        break;

      case "Cash On Delivery":
        const orderItems =
          cartItems?.length > 0
            ? cartItems.map((item) => ({
                image: item.image.url,
                product: item.product,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
              }))
            : [];
        const order = {
          shippingInfo,
          orderItems,
          itemsPrice: subtotal,
          taxPrice: tax,
          shippingPrice: shippingCharges,
          totalPrice: totalPrice,
          paymentInfo:{
            id:"unregistered",
            status:"NOT PAID"
          }
        };
        dispatch(createOrder(order));
        navigate("/success");
        break;
    }
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
            <div className={`paymentDialog ${isDialogVisible ? "show" : ""}`}>
              <div className="paymentHeader">
                <Typography className="Header">
                  Choose Payment Option
                </Typography>
              </div>
              <div className="options">
                <div>
                  <input
                    type="radio"
                    name="paymentOption"
                    value="Credit Card"
                    id="creditCard"
                    checked={selectedOption === "Credit Card"}
                    onChange={handleChange}
                  />
                  <CreditCardIcon />
                  <label htmlFor="creditCard">Credit Card</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="paymentOption"
                    value="Cash On Delivery"
                    id="cashOnDelivery"
                    checked={selectedOption === "Cash On Delivery"}
                    onChange={handleChange}
                  />
                  <LocalShippingIcon />
                  <label htmlFor="cashOnDelivery">Cash On Delivery</label>
                </div>
                <button className="paymentBtn" onClick={handlePaymentOption}>
                  Proceed
                </button>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image.url} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X AFN {item.price} ={" "}
                      <b>AFN {item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>AFN {subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span> AFN {shippingCharges}</span>
              </div>
              <div>
                <p> Tax:</p>
                <span> AFN {tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>AFN {totalPrice}</span>
            </div>
            <button onClick={profileHander}>Continue</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmOrder;
