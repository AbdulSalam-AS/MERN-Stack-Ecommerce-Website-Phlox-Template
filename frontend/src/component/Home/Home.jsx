import React, { useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import { useAlert } from "react-alert";
import "./Home.css";
import MetaData from "../layout/MetaData.jsx";
import { getProduct, clearErrors } from "../../store/actions/productAction";
import Loader from "../layout/Loader/Loader.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <!-- Hero Section --> */}
          <MetaData title="Home" />
          <main className="hero-section">
            <div>
              <h1 className="fs-200 fs-poppins">
                Sony
                <span className="big-wireless block lineheight fs-300 bold-900 fs-poppins">
                  Playstaion
                </span>
                <span className="text-white uppercase lineheight2 bold-bolder fs-poppins fs-900">
                  Light Silver
                </span>
              </h1>
              <img src="/image/gam.png" alt="" />
            </div>
            <div className="hero-inner flex">
              <div>
                <button className="large-btn bg-red text-white fs-poppins fs-50">
                  <Link
                    to="/products?category=Gaming Console"
                    className="text-white"
                  >
                    Shop By Category
                  </Link>
                </button>
              </div>
              <div className="hero-info">
                <h4 className="fs-montserrat">Description</h4>
                <p className="fs-montserrat">
                  There are many variations passages of Lorem Ipsum Available,
                  but the majority have suffered alteration
                </p>
              </div>
            </div>
          </main>

          {/* <!-- Hero Section End --> */}

          {/* <!-- Product Section --> */}

          <section className="product-section">
            <div className="category bg-black grid">
              <div>
                <h3 className="text-white fs-50 fs-montserrat">
                  Enjoy <span className="block fs-300 fs-poppins">With</span>
                  <span className="earphone uppercase fs-400 fs-montserrat bold-900 lineheight">
                    Earphone
                  </span>
                </h3>
                <button className="product-btn large-btn text-white bg-red fs-montserrat">
                  <Link to="/products?category=Headset" className="text-white">
                    Browse
                  </Link>
                </button>
              </div>
              <div className="product-img1">
                <img src="/image/h.png" alt="" />
              </div>
            </div>

            <div className="category bg-yellow grid">
              <div>
                <h3 className="text-white fs-50 fs-montserrat">
                  Enjoy <span className="block fs-300 fs-poppins">With</span>
                  <span className="earphone uppercase fs-400 fs-montserrat bold-900 lineheight">
                    SmartWatch
                  </span>
                </h3>
                <button className="product-btn large-btn text-yellow bg-white fs-montserrat">
                  <Link to="/products?category=Gadgets" className="text-yellow">
                    Browse
                  </Link>
                </button>
              </div>
              <div className="product-img2">
                <img src="/image/w.png" alt="" />
              </div>
            </div>

            <div className="category bg-red grid">
              <div>
                <h3 className="text-white fs-50 fs-montserrat">
                  Enjoy <span className="block fs-300 fs-poppins">With</span>
                  <span className="earphone uppercase fs-400 fs-montserrat bold-900 lineheight">
                    Laptop
                  </span>
                </h3>
                <button className="product-btn large-btn text-red bg-white fs-montserrat">
                  <Link to="/products?category=Laptop" className="text-red">
                    Browse
                  </Link>
                </button>
              </div>
              <div className="product-img3">
                <img src="/image/Laptop.png" alt="" />
              </div>
            </div>

            <div className="category bg-gray grid">
              <div>
                <h3 className="text-black fs-50 fs-montserrat">
                  Enjoy <span className="block fs-300 fs-poppins">With</span>
                  <span className="earphone uppercase fs-400 fs-montserrat bold-900 lineheight">
                    Console
                  </span>
                </h3>
                <button className="product-btn large-btn text-white bg-red fs-montserrat">
                  <Link
                    to="/products?category=Gaming Console"
                    className="text-white"
                  >
                    Browse
                  </Link>
                </button>
              </div>
              <div className="product-img4">
                <img src="/image/gam.png" alt="" />
              </div>
            </div>

            <div className="category bg-green grid">
              <div>
                <h3 className="text-white fs-50 fs-montserrat">
                  Enjoy <span className="block fs-300 fs-poppins">With</span>
                  <span className="earphone uppercase fs-400 fs-montserrat bold-900 lineheight">
                    VR
                  </span>
                </h3>
                <button className="product-btn large-btn text-green bg-white fs-montserrat">
                  <Link to="/products?category=Gadgets" className="text-green">
                    Browse
                  </Link>
                </button>
              </div>
              <div className="product-img5">
                <img src="/image/man2.png" alt="" />
              </div>
            </div>

            <div className="category bg-blue grid">
              <div>
                <h3 className="text-white fs-50 fs-montserrat">
                  Enjoy <span className="block fs-300 fs-poppins">With</span>
                  <span className="earphone uppercase fs-400 fs-montserrat bold-900 lineheight">
                    Speaker
                  </span>
                </h3>
                <button className="product-btn large-btn text-blue bg-white fs-montserrat">
                  <Link to="/products?category=Speakers" className="text-blue">
                    Browse
                  </Link>
                </button>
              </div>
              <div className="product-img6">
                <img src="/image/mus.png" alt="" />
              </div>
            </div>
          </section>

          {/* <!-- Product Section End--> */}

          {/* <!-- Service Section --> */}

          <section className="service-section">
            <div className="service">
              <img src="/image/free.svg" />
              <div className="service-info">
                <h3 className="fs-poppins fs-200">Free Shipping</h3>
                <p className="fs-montserrat fs-50">
                  Free Shipping On All Orders
                </p>
              </div>
            </div>

            <div className="service">
              <img src="/image/sett.svg" />
              <div className="service-info">
                <h3 className="fs-poppins fs-200">Money Guarantee</h3>
                <p className="fs-montserrat fs-50">30 Day Money Back</p>
              </div>
            </div>

            <div className="service">
              <img src="/image/supt.svg" />
              <div className="service-info">
                <h3 className="fs-poppins fs-200">Online Support 24/7</h3>
                <p className="fs-montserrat fs-50">Technical Support 24/7</p>
              </div>
            </div>

            <div className="service">
              <img src="/image/pay.svg" />
              <div className="service-info">
                <h3 className="fs-poppins fs-200">Secure Payment</h3>
                <p className="fs-montserrat fs-50">All Cards Accepted</p>
              </div>
            </div>
          </section>
          {/* <!-- Service Section End --> */}

          {/* <!-- Feature Section  --> */}
          <section className="feature-section bg-red">
            <div className="feature-one grid">
              <img src="/image/p-1.png" alt="" />
              <p className="text-white uppercase">20% OFF</p>
              <p className="font-size lineheight fs-600 text-white fs-poppins lineheight2 bold-900 uppercase">
                fine <span className="smile">Smile</span>
              </p>
              <p className="date text-white fs-poppins fs-50">
                15 Nov To & Dec
              </p>
            </div>
            <div className="feature-info">
              <h2 className="fs-200 text-white fs-poppins bold-500">
                Beats Solo Air
              </h2>
              <p className="fs-poppins fs-300 bold-800 text-white">
                Summer Sale
              </p>
              <button className="product-btn large-btn text-red bg-white fs-poppins">
                <Link to="/products" className="text-red">
                  Shop
                </Link>
              </button>
            </div>
          </section>

          {/* <!-- Feature Section  End--> */}

          {/* <!-- Best Seller Product --> */}
          <section className="best-product container">
            <h2 className="letter-spacing bold-bolder fs-300 fs-poppins">
              Featured Products
            </h2>
          </section>

          <section className="best-Seller">
            {products &&
              products.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
          </section>

          {/* <!-- Best Seller Product End --> */}

          {/* Feature Section 2  */}

          <section className="feature-section bg-green">
            <div className="feature-green feature-one grid">
              <img src="/image/p12.png" alt="" />
              <p className="text-white uppercase">20% OFF</p>
              <p className="font-size lineheight fs-600 text-white fs-poppins lineheight2 bold-900 uppercase">
                fine <span className="smile">Smile</span>
              </p>
              <p className="date text-white fs-poppins fs-50">
                15 Nov To & Dec
              </p>
            </div>
            <div className="feature-info">
              <h2 className="fs-200 text-white fs-poppins bold-500">
                Beats Solo Air
              </h2>
              <p className="fs-poppins fs-300 bold-800 text-white">
                Summer Sale
              </p>
              <p className="fs-montserrat text-white fs-50">
                Company that's grown from 270 to 480 employees in the last 12
                months.
              </p>
              <button className="product-btn large-btn bg-white fs-poppins">
                <Link to="/products" className="text-green">
                  Shop
                </Link>
              </button>
            </div>
          </section>
          {/* <!-- Feature Section 2 End --> */}
        </>
      )}
    </>
  );
}

export default Home;
