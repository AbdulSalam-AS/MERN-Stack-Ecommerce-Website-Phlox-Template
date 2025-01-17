import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { CgSearch, CgProfile } from "react-icons/cg";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { logout } from "../../../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { CiSearch } from "react-icons/ci";
import { FaRegTimesCircle } from "react-icons/fa";
import {
  clearErrors,
  getCartItems,
  removeItemsFromCart,
} from "../../../store/actions/cartAction";
import Loader from "../Loader/Loader";
import {
  REMOVE_CART_ITEM_RESET,
  UPDATE_CART_ITEM_RESET,
} from "../../../store/constants/cartConstants";

const Header = ({ options, user }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const cartContainerRef = useRef(null);
  const searchIconRef = useRef(null);
  const navigationRef = useRef(null);
  const closeNavigationBtn = useRef(null);
  const AccountPropertiesRef = useRef(null);

  const { cartItems, loading, error } = useSelector((state) => state.cartItems);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems: items } = useSelector((state) => state.cart);
  const { isRemoved, isUpdated } = useSelector((state) => state.cartItem);

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    closeSearchBar();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successful");
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      dispatch(getCartItems());

      if (isRemoved) {
        dispatch({ type: REMOVE_CART_ITEM_RESET });
      }

      if (isUpdated) {
        dispatch({ type: UPDATE_CART_ITEM_RESET });
      }
    }
  }, [dispatch, error, isAuthenticated, items, isRemoved, isUpdated]);

  // Toggle data-visible attribute on click of shopping bag icon
  const toggleCartVisibility = () => {
    const currentVisible =
      cartContainerRef.current.getAttribute("data-visible");
    if (currentVisible === "false") {
      cartContainerRef.current.setAttribute("data-visible", "true");
    } else {
      cartContainerRef.current.setAttribute("data-visible", "false");
    }
  };

  // Close the cart when the cross button is clicked
  const closeCart = () => {
    cartContainerRef.current.setAttribute("data-visible", "false");
  };

  const displaySearchBar = () => {
    const currentVisible = searchIconRef.current.getAttribute("data-visible");
    if (currentVisible === "false") {
      searchIconRef.current.setAttribute("data-visible", "true");
    }
  };

  const closeSearchBar = () => {
    searchIconRef.current.setAttribute("data-visible", "false");
  };

  const openNavigation = () => {
    const currentVisible = navigationRef.current.getAttribute("data-visible");
    if (currentVisible === "false") {
      navigationRef.current.setAttribute("data-visible", "true");
      closeNavigationBtn.current.setAttribute("data-visible", "true");
    }
  };

  const closeNavigation = () => {
    navigationRef.current.setAttribute("data-visible", "false");
    closeNavigationBtn.current.setAttribute("data-visible", "false");
  };

  const toggleAccountLinks = () => {
    const currentVisible =
      AccountPropertiesRef.current.getAttribute("data-visible");
    if (currentVisible === "false") {
      AccountPropertiesRef.current.setAttribute("data-visible", "true");
    } else {
      AccountPropertiesRef.current.setAttribute("data-visible", "false");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            class="search"
            ref={searchIconRef}
            data-visible="false"
            id="search-bar"
          >
            <FaRegTimesCircle
              class="uil uil-times-circle search-close-btn"
              onClick={closeSearchBar}
            ></FaRegTimesCircle>
            <form onSubmit={searchSubmitHandler}>
              <input
                type="text"
                class="fs-montserrat fs-300 bold-bolder"
                onChange={(e) => setKeyword(e.target.value)}
              />

              <CgSearch class="uil uil-search search-btn"></CgSearch>
            </form>
          </div>

          <header className="primary-header Container flex">
            <div className="header-inner-one flex">
              <div className="logo">
                <Link to="/" className="LogoName">
                  Buy<span>Digital</span>
                </Link>
              </div>
              <button
                className="mobile-close-btn"
                ref={closeNavigationBtn}
                onClick={closeNavigation}
                data-visible="false"
                aria-controls="primary-navigation"
              >
                <FaRegTimesCircle className="uil uil-times-circle"></FaRegTimesCircle>
              </button>
              <nav>
                <ul
                  id="primary-navigation"
                  ref={navigationRef}
                  data-visible="false"
                  className="primary-navigation flex"
                >
                  <li>
                    <Link to="/" className="fs-100 fs-montserrat bold-500">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products"
                      className="fs-100 fs-montserrat bold-500"
                    >
                      Shop
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="header-login flex">
              {isAuthenticated ? (
                <p
                  className="links profile-link fs-montserrat"
                  onClick={toggleAccountLinks}
                >
                  <>
                    <CgProfile className="profileImag" />
                    <div className="userName">{user.name}</div>
                    <div
                      data-visible="false"
                      ref={AccountPropertiesRef}
                      className="profile-link-section"
                    >
                      <Link to="/account" className="link">
                        <PersonIcon /> Account
                      </Link>
                      <Link
                        to="/admin/dashboard"
                        className="link"
                        style={{
                          display: user.role == "admin" ? "flex" : "none",
                        }}
                      >
                        <DashboardIcon /> Dashboard
                      </Link>
                      <Link to="/orders" className="link">
                        <ListAltIcon /> Orders
                      </Link>
                      <Link to="/login" className="link" onClick={logoutUser}>
                        <ExitToAppIcon /> Logout
                      </Link>
                    </div>
                  </>
                </p>
              ) : (
                <Link
                  to="/Login"
                  className="fs-100 fs-montserrat bold-500 login links"
                >
                  Login
                </Link>
              )}

              <CiSearch
                className="uil header-search"
                onClick={displaySearchBar}
              />
              <div className="cartSection">
                <MdOutlineShoppingBag
                  id="cart-box"
                  aria-controls="cart-icon"
                  className="uil uil-shopping-bag"
                  onClick={toggleCartVisibility}
                ></MdOutlineShoppingBag>
                <div className="productsAmount bg-red text-white fs-poppins">
                  {cartItems?.length ?? 0}
                </div>
              </div>
              <div
                id="cart-icon"
                ref={cartContainerRef}
                data-visible="false"
                className="cart-icon"
              >
                <div className="shopping flex">
                  <p>Shopping Basket</p>
                  <i
                    id="cross-btn"
                    className="uil uil-times"
                    onClick={closeCart}
                  ></i>
                </div>
                <div className="cart bold-900 flex">
                  {cartItems?.length > 0 ? (
                    <>
                      <div className="cart-box">
                        {cartItems.map((item, i) => (
                          <div className="cart-item" key={item}>
                            <img src={item?.image?.url} />
                            <div>
                              <p className="fs-montserrat fs-50 text-black">
                                {item.name}
                              </p>
                              <p className="fs-poppins fs-100 text-black bold-900">
                                {item.quantity} X {item.price}
                              </p>
                            </div>
                            <button
                              onClick={() => deleteCartItems(item.product)}
                            >
                              x
                            </button>
                          </div>
                        ))}
                        <hr />
                        <Link to="/Cart" className="fs-montserrat cart-button">
                          View Cart
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <img src="/empty-cart.svg" />
                      <p>Cart is empty</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mobile-open-btn">
              <RxHamburgerMenu
                className="uil"
                onClick={openNavigation}
              ></RxHamburgerMenu>
            </div>
          </header>
        </>
      )}
    </>
  );
};
export default Header;

// {loading ? (
//   <Loader />
// ) : (
//   <div className="header">
//     <Link to="/" className="logo">
//       Buy<span>Digital</span>
//     </Link>
//     <form
//       className="search"
//       onSubmit={searchSubmitHandler}
//       style={{ display: displaySearch }}
//     >
//       <input
//         type="text"
//         placeholder="Search"
//         onChange={(e) => setKeyword(e.target.value)}
//       />
//       <button>
//         <CgSearch />
//       </button>
//     </form>

//     <div className="links-section">
//       <Link to="/Products" className="links">
//         Products
//       </Link>
//       <Link to="/Cart" className="links cart-link">
//         <FaShoppingCart
//           style={{
//             color:
//               (cartItems?.length ?? 0) > 0 ? "tomato" : "unset",
//           }}
//         />{" "}
//         Cart{" "}
//         <span
//           style={{
//             color:
//               (cartItems?.length ?? 0) > 0 ? "white" : "black",
//           }}
//         >
//           {cartItems?.length ?? 0}
//         </span>
//       </Link>

//   </div>
// )}
