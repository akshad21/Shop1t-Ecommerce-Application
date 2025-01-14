import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartContext } from "../context/cart_context";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaBalanceScale } from "react-icons/fa"; // Import a new icon for the compare button

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist, addToCompare, compareProducts } = useContext(CartContext); // Access addToCompare from context

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const mainImage =
    product.images && product.images.length > 1
      ? product.images[1]
      : product.thumbnail;

  const isInWishlist = wishlist.some((item) => item.id === product.id); // Check if product is in wishlist

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id); // Remove product from wishlist
      toast.error(`${product.title} removed from wishlist!`, {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      addToWishlist(product); // Add product to wishlist
      toast.success(`${product.title} added to wishlist!`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const handleAddToCompare = (e) => {
    e.stopPropagation();
  
    // Check if the product is already in the compare list
    const isInCompare = compareProducts.some((item) => item.id === product.id);
  
    if (isInCompare) {
      // If the product is already in the compare list, show a toast notification
      toast.error(`${product.title} is already in the compare list!`, {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      // Check if all products in the compare list are from the same category
      const isSameCategory = compareProducts.every(
        (item) => item.category === product.category
      );
  
      if (!isSameCategory && compareProducts.length > 0) {
        // Show error toast if the product is from a different category
        toast.error("Cannot compare products from different categories!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
        });
      } else {
        // Add the product to the compare list
        addToCompare(product);
        toast.success(`${product.title} added to compare!`, {
          position: "top-right",
          autoClose: 1000,
        });
      }
    }
  };
  

  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 bg-white hover:bg-gray-50 cursor-pointer">
      <Link href={`/products/${product.id}`} passHref>
        <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
          <Image
            src={mainImage}
            alt={product.title}
            layout="fill"
            objectFit="contain"
            className="rounded-t-lg transition-transform duration-300 transform hover:scale-110"
          />
        </div>
        <div className="mt-4 text-center h-32">
          <h3 className="text-lg font-semibold capitalize text-gray-800 hover:text-[#e64a19] transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-gray-600 text-xl mt-2">{formattedPrice}</p>
          <div className="mt-2">
            <p className="text-sm text-yellow-500">⭐ {product.rating.toFixed(1)} / 5</p>
          </div>
        </div>
      </Link>

      <div className="mt-4 flex justify-center items-center space-x-3">
        <div className="flex space-x-3">
          <button
            onClick={handleAddToCart}
            className="text-[#e64919] p-2 rounded-full hover:bg-gray-200 transition"
          >
            <FaCartShopping style={{ fontSize: "23px" }} />
          </button>

          {/* Heart icon with conditional styling based on wishlist status */}
          <button
            onClick={handleAddToWishlist}
            className={`p-2 rounded-full transition ${isInWishlist ? "text-red-600" :   "text-gray-400"} hover:bg-gray-200`}
          >
            <FaHeart style={{ fontSize: "23px" }} />
          </button>

          {/* Compare icon */}
          <button
            onClick={handleAddToCompare}
            className="p-2 rounded-full transition  text-blue-500 hover:bg-gray-200"
          >
            <FaBalanceScale style={{ fontSize: "23px" }} /> {/* Icon for comparing products */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
