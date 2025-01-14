import React, { useState, useContext } from "react";
import { CartContext } from "../context/cart_context";
import { toast } from "react-toastify";

const DetailedProductCard = ({ product }) => {
  const { addToCart, addToWishlist, addToCompare, compareProducts } = useContext(CartContext);

  // Check if the image URL is valid
  const imageUrl = product.images[0] ? product.images[0] : "/default-image.png"; // Fallback image URL

  // State to store the current main image URL
  const [currentImage, setCurrentImage] = useState(imageUrl);

  // Handle thumbnail click to change main image
  const handleThumbnailClick = (image) => {
    setCurrentImage(image);
  };

  // Handle add to cart with toast notification
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeButton: true,
    });
  };

  // Handle add to wishlist with toast notification
  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.success(`${product.title} added to wishlist!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeButton: true,
    });
  };

  // Handle add to compare with toast notification and category check
  const handleAddToCompare = () => {
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
        closeButton: true,
      });
    } else {
      addToCompare(product);
      toast.success(`${product.title} added to compare list!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeButton: true,
      });
    }
  };

  // Calculate the number of full, half, and empty stars based on the rating
  const getStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    return { fullStars, halfStar, emptyStars };
  };

  // Extract rating information from product data
  const { fullStars, halfStar, emptyStars } = getStarRating(product.rating || 0);

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white border rounded-lg shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side: Product Image */}
        <div className="flex justify-center flex-col items-center">
          <img
            src={currentImage}
            alt={product.title || "Product Image"}
            className="w-full h-auto max-h-96 object-contain"
          />

          {/* Image Thumbnails Below */}
          {product.images && product.images.length > 1 && (
            <div className="mt-4 flex gap-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 object-contain cursor-pointer border rounded-md hover:opacity-75"
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right side: Product Details */}
        <div>
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">{product.title}</h1>
          <p className="text-xl text-gray-700 mb-4">{product.description}</p>

          {/* Price & Category */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-green-500">${product.price}</span>
            <span className="text-lg text-gray-600">{product.category}</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition"
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </button>
            <button
              className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition"
              onClick={handleAddToCompare}
            >
              Add to Compare
            </button>
          </div>

          {/* Product Stock and Return Policy */}
          <div className="bg-white p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Product Stock</h3>
            <p className="text-gray-700">
              {product.stock > 0
                ? `In stock: ${product.stock} units available`
                : "Out of stock"}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Return Policy</h3>
            <p className="text-gray-700">
              {product.returnPolicy
                ? product.returnPolicy
                : "Returns accepted within 30 days of purchase."}
            </p>
          </div>

          {/* Ratings Section */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Customer Ratings</h3>
            <div className="flex items-center gap-2">
              {/* Render full stars */}
              {[...Array(fullStars)].map((_, index) => (
                <span key={index} className="text-yellow-500">⭐</span>
              ))}
              {/* Render half star if applicable */}
              {halfStar && <span className="text-yellow-500">⭐</span>}
              {/* Render empty stars */}
              {[...Array(emptyStars)].map((_, index) => (
                <span key={index} className="text-gray-400">⭐</span>
              ))}
              <span className="text-gray-600">({product.rating || 0} out of 5)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedProductCard;
