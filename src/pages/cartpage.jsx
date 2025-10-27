import React from "react";
import { useCart } from "./cartprovider";
import '../components/cartpage.css';
import emptyCart from "../images/undraw_empty-cart_574u.svg";

const CartPage = () => {
  const { cart, removeFromCart, updateCartItemQty } = useCart();

  if (cart.length === 0) return <div className="cart-boy">
    <img  className="img-cart" src={emptyCart} alt="Empty Cart" />
  </div>

  const handleIncrease = (id, currentQty) => {
    updateCartItemQty(id, currentQty + 1);
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      updateCartItemQty(id, currentQty - 1);
    }
  };

  return (
    <div className="cart1">
      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item.id} style={{ marginBottom: "20px" }} className="cartpage">
          <img src={item.image} alt={item.title} style={{ width: 100, height: 150 }} />
          <div className="title">
              <h4>{item.title}</h4>
              <p>
                ${item.price} x {item.qty} = ${item.price * item.qty}
              </p>
            <div className="button">
				<div className="cart-button" >
					 <button className="cart-buttons" onClick={() => handleDecrease(item.id, item.qty)}>-</button>
              <span style={{ margin: "0 10px" }}>{item.qty}</span>
              <button className="cart-buttons" onClick={() => handleIncrease(item.id, item.qty)}>+</button>
				</div>
				<div>
					<span onClick={()=>removeFromCart(item.id)} className="material-symbols-outlined">delete</span>
				</div>
			</div>
         	
          </div>
        </div>
      ))}
      <h3 style={{textAlign:"right"}}>Estimated total: ${cart.reduce((sum, i) => sum + i.price * i.qty, 0)}</h3>
    </div>
  );
};

export default CartPage;
