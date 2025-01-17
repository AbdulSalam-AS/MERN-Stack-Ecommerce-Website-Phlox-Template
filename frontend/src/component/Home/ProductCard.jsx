import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

function ProductCard({ product }) {
  const options = {
    readOnly: true,
    value: product.ratings,
    precision: 0.5,
  };
  return (
    <Link className="product grid" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p className="fs-poppins bold-500">{product.name}</p>
      <div className="bottom-Section">
        <span className="fs-poppins bold-500">{`AFN ${product.price}`}</span>

        <Rating {...options} />
        <span className="productCardSpan fs-poppins bold-500">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
    </Link>
  );
}

export default ProductCard;
