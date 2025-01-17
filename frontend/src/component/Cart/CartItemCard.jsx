import { Link } from "react-router-dom";

function CartItemCard({
  item,
  deleteCartItems,
  increaseQuantity,
  decreaseQuantity,
}) {
  return (
    <tr>
      <td className="product-remove">
        <p onClick={() => deleteCartItems(item.product)}>x</p>
      </td>
      <td className="product-thumbnail">
        <img src={item.image.url} alt={item.name} />
      </td>

      <td className="product-name" data-title="Product">
        <Link to={`/product/${item.product}`}>{item.name}</Link>
      </td>

      <td className="product-price" data-title="Price">
        <p>{`Price: AFN ${item.price}`}</p>
      </td>

      <td className="product-quantity" data-title="Quantity">
        <div className="quantity">
          <button
            className="decrement"
            onClick={() => decreaseQuantity(item.product, item.quantity)}
          >
            -
          </button>
          <input
            type="number"
            value={item.quantity}
            min="0"
            max=""
            step="1"
            placeholder=""
            inputmode="numeric"
            autocomplete="off"
            className="input-text"
          />

          <button
            className="increment"
            onClick={() =>
              increaseQuantity(item.product, item.quantity, item.stock)
            }
          >
            +
          </button>
        </div>
      </td>

      <td className="product-subtotal" data-title="Subtotal">
        <p>{`AFN ${item.price * item.quantity}`}</p>
      </td>
    </tr>
  );
}

export default CartItemCard;
