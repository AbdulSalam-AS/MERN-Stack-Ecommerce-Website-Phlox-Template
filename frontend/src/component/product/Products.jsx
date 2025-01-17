import { useState, useEffect, useRef } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../store/actions/productAction";
import Loader from "../layout/Loader/Loader.jsx";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Slider, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import MetaData from "./../layout/MetaData";
import { FiSearch } from "react-icons/fi";


const categories = [
  "All",
  "Gaming Console",
  "Laptop",
  "Camera",
  "SmartPhone",
  "Headset",
  "Speakers",
  "Gadgets",
];

function Products() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState();
  const [ratings, setRatings] = useState(0);

  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cate = searchParams.get("category");

  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const categoryHandler = (category) => {
    setCategory(category);
    clearCategory();
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (cate) {
      dispatch(getProduct(keyword, currentPage, price, cate, ratings));
    } else {
      dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    ratings,
    alert,
    error,
    cate,
  ]);

  let count = filteredProductsCount;

  const clearCategory = () => {
    // Remove the 'category' parameter from the URL
    const params = new URLSearchParams(location.search);
    params.delete("category");

    // Use navigate to change the URL without the category parameter
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />

          <section className="shop-feature bg-gray grid">
            <div>
              <p className="fs-montserrat text-black">
                Home{" "}
                <span aria-haspopup="true" className="margin">
                  {">"}
                </span>{" "}
                Products
              </p>
            </div>
            <h2 className="fs-poppins fs-300 bold-700">Products</h2>
          </section>

          <main className="shop-main-container grid">
            <section>
              <aside className="sidebar-category">
                <div className="category-list flex">
                  <h3 className="fs-poppins bold-700 fs-200">
                    Product Categories
                  </h3>
                </div>

                <div className="shop-category-list">
                  <ul
                    id="side-nav"
                    className="sidebar-nav grid"
                    data-category="true"
                  >
                    {categories.map((category) => (
                      <li
                        className="fs-montserrat text-black bold-500"
                        key={category}
                        onClick={() => {
                          categoryHandler(category);
                        }}
                      >
                        <a>{category}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="category-price flex">
                  <h3 className="fs-poppins bold-700 fs-100">Price</h3>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={100000}
                    color="error"
                  />
                </div>

                <fieldset>
                  <Typography component="legend">Ratings Above</Typography>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                    color="error"
                  />
                </fieldset>
              </aside>
            </section>

            <div>
              <div className="shop-title flex">
                <div>
                  <h2 className="fs-poppins fs-300">Shop</h2>
                </div>
              </div>

              <section className="shop-product grid">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </section>
            </div>
            {resultPerPage < count && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemclassName="page-item"
                  linkclassName="page-link"
                  activeclassName="pageItemActive"
                  activeLinkclassName="pageLinkActive"
                />
              </div>
            )}
          </main>
        </>
      )}
    </>
  );
}

export default Products;
