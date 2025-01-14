import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [compareProducts, setCompareProducts] = useState([]); // State for compare products

  // Load cart, wishlist, and compareProducts from localStorage once at the start
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));

    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

    const storedCompareProducts = localStorage.getItem("compareProducts");
    if (storedCompareProducts) setCompareProducts(JSON.parse(storedCompareProducts));
  }, []);

  // Save cart, wishlist, and compareProducts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    localStorage.setItem("compareProducts", JSON.stringify(compareProducts));
  }, [cart, wishlist, compareProducts]);

  // Add to cart function
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Add to compare list function
  const addToCompare = (product) => {
    setCompareProducts((prevCompareProducts) => {
      if (prevCompareProducts.length > 0) {
        const comparisonCategory = prevCompareProducts[0].category;
        if (product.category !== comparisonCategory) {
          
          return prevCompareProducts;
        }
      }
      if (prevCompareProducts.find((item) => item.id === product.id)) {
        return prevCompareProducts; // Avoid duplicates
      }
      return [...prevCompareProducts, product];
    });
  };

  // Remove from compare list function
  const removeFromCompare = (id) => {
    setCompareProducts((prevCompareProducts) =>
      prevCompareProducts.filter((item) => item.id !== id)
    );
  };

  // Remove from cart function
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Add to wishlist function
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.find((item) => item.id === product.id)) {
        return prevWishlist; // Avoid duplicates
      }
      return [...prevWishlist, product];
    });
  };

  // Remove from wishlist function
  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  // Move to cart from wishlist function
  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  // Update quantity function
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        compareProducts,
        addToCompare,
        removeFromCompare,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
