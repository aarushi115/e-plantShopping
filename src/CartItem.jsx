import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // FIXED: Only pass name
  };

  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
    } else {
      dispatch(removeItem(item.name)); // FIXED: Only pass name
    }
  };

  const parseCost = (cost) => {
    return typeof cost === 'string' ? parseFloat(cost.substring(1)) : cost;
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const calculateTotalCost = (item) => {
    const price = parseCost(item.cost);
    return formatCurrency(price * item.quantity);
  };

  const calculateTotalAmount = () => {
    const total = cart.reduce((total, item) => {
      const price = parseCost(item.cost);
      return total + price * item.quantity;
    }, 0);
    return formatCurrency(total);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping && onContinueShopping();
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Checkout functionality to be added.');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: {calculateTotalAmount()}
      </h2>

      {cart.length === 0 ? (
        <p style={{ color: 'gray', textAlign: 'center' }}>
          Your cart is empty.
        </p>
      ) : (
        cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">
                {formatCurrency(parseCost(item.cost))}
              </div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: {calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
