import React from "react";
import { toast } from "react-toastify"; // Toast for notifications
import { FaTrashAlt, FaCartPlus } from "react-icons/fa"; // Icons for buttons
import Link from "next/link";

const WishlistCard = ({ product, moveToCart, removeFromWishlist }) => {
  const handleMoveToCart = (product) => {
    moveToCart(product); // Move the product to the cart
    toast.success(`${product.title} has been moved to the cart!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeButton: true,
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId); // Remove the product from the wishlist
    toast.error("Product has been removed from the wishlist.", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeButton: true,
    });
  };

  return (
    
    <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg gap-4">
      < Link href={`/products/${product.id}`} passHref >
      <div className="flex flex-col items-center">
      {/* Product Image */}
      <img
        src={product.images[0] || "/default-image.png"}
        alt={product.title}
        className="w-32 h-32 object-contain rounded-lg"
      />
      {/* Product Info */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
      </div>
      </div>
      </Link>
      {/* Action Buttons */}
      <div className="flex gap-2">
        {/* Move to Cart Button */}
        <button
          onClick={() => handleMoveToCart(product)}
          className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-md text-sm"
        >
          <FaCartPlus />
          <span>Cart</span>
        </button>
        {/* Remove from Wishlist Button */}
        <button
          onClick={() => handleRemoveFromWishlist(product.id)}
          className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-md text-sm"
        >
          <FaTrashAlt />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
