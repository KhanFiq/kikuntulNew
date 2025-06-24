"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Rehydrate cart from localStorage on mount
  useEffect(() => {
    const storedCart = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCart(parsed);
        } else {
          setCart([]);
        }
      } catch (e) {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, []);

  // Persist cart to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart([product]); // hanya satu produk untuk checkout akun game
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
