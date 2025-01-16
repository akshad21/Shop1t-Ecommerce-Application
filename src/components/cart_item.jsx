import React, { useContext } from "react";
import { CartContext } from "../context/cart_context";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify"; // Import toast
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  // Handle quantity update with toast notification
  const handleQuantityUpdate = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
    toast.info(`Quantity of ${item.title} updated to ${newQuantity}`,
      { // Display a success toast
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeButton: true,
    }); // Toast when quantity is updated
  };

  // Handle item removal with toast notification
  const handleRemoveItem = () => {
    removeFromCart(item.id);
    toast.error(`${item.title} removed from cart`,
      { // Display a success toast
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeButton: true,
      }
    ); // Toast when item is removed
  };

  return (
    <div className="flex items-center justify-between border p-4 rounded-lg">
      <div className="flex items-center gap-4">
        {/* Updated Image tag */}
        <Image
          src={item.images[0] || "/default-image.png"}
          alt={item.title}
          width={64} // Adjust width
          height={64} // Adjust height
          className="object-contain"
        />
        <div>
          <h3 className="font-semibold">{item.title}</h3>
          <span className="text-gray-500">${item.price}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="bg-gray-300 px-2 rounded"
          onClick={() => handleQuantityUpdate(item.quantity - 1)}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          className="bg-gray-300 px-2 rounded"
          onClick={() => handleQuantityUpdate(item.quantity + 1)}
        >
          +
        </button>
        <button
          className="text-black hover:text-red-600 px-3 py-1 rounded"
          onClick={handleRemoveItem}
        >
          <FaTrash style={{ fontSize: "22px" }} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
