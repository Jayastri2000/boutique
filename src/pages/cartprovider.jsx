import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children, user }) => {
  const [cart, setCart] = useState([]);

  // ✅ Load cart when user changes
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    const fetchCart = async () => {
      try {
        const cartRef = doc(db, "carts", user.uid);
        const snap = await getDoc(cartRef);
        if (snap.exists()) {
          const data = snap.data();
          setCart(Array.isArray(data.items) ? data.items : []);
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCart([]);
      }
    };

    fetchCart();
  }, [user]);

  // ✅ Save cart
  async function saveCart(items) {
    if (!user) {
      console.log("No user logged in");
      return;
    }
    await setDoc(doc(db, "carts", user.uid), {
      items,
      updatedAt: new Date()
    });
    console.log("Cart saved for:", user.uid);
  }

  // ✅ Add to cart
  const addToCart = async (item) => {
    if (!user) {
      alert("Please log in to add items to cart.");
      return;
    }
    const exists = cart.find((i) => i.id === item.id);
    const newCart = exists
      ? cart.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      : [...cart, { ...item, qty: 1 }];
    setCart(newCart);
    await saveCart(newCart);
  };

  // ✅ Remove from cart
  const removeFromCart = async (id) => {
    if (!user) {
      alert("Please log in to modify cart.");
      return;
    }
    const newCart = cart.filter((i) => i.id !== id);
    setCart(newCart);
    await saveCart(newCart);
  };

  const updateCartItemQty = (id, newQty) => {
  setCart((prev) =>
    prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
  );
};

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItemQty}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
