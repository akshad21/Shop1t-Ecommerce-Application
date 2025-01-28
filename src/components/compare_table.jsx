import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { CartContext } from "../context/cart_context"; // Adjust the path as needed
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";


const CompareTable = ({ compareProducts, removeFromCompare }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 1000, // 1 second
      hideProgressBar: true,
      closeButton: true,
      
    });
  };
  
  const handleRemoveFromCompare = (productId) => {
    removeFromCompare(productId);
    toast.info("Product removed from comparison!", {
      position: "top-right",
      autoClose: 1000, // 1 second
      hideProgressBar: true,
      closeButton: true,
      
    });
  };
  

  if (compareProducts.length === 0) {
    return <div>No products to compare</div>;
  }

  const renderProductRow = (featureName, featureKey) => {
    return compareProducts.map((product) => {
      const featureValue = product[featureKey];

      if (typeof featureValue === "object" && featureValue !== null) {
        if (featureKey === "dimensions") {
          return `${featureValue.width} x ${featureValue.height} x ${featureValue.depth}`;
        }
        return JSON.stringify(featureValue);
      }

      return featureValue;
    });
  };

  return (
    <div className="overflow-x-auto">
      
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-300">
          <tr>
            <th className="border p-4">Comparison Feature</th>
            {compareProducts.map((product) => (
              <th key={product.id} className="border p-4">
                <div className="flex justify-between items-center">
                  <span>{product.title}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-black hover:text-red-600 transform hover:scale-110 hover:rotate-8 transition duration-300 ease-in-out"
                      onClick={() => handleRemoveFromCompare(product.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-4">Image</td>
            {compareProducts.map((product) => (
              <td key={`image-${product.id}`} className="border p-4">
                <Link href={`/products/${product.id}`} passHref>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-24 h-24 object-contain"
                />
                </Link>
              </td>
            ))}
          </tr>

          <tr>
            <td className="border p-4">Price</td>
            {renderProductRow("Price", "price").map((value, index) => (
              <td key={index} className="border p-4">
                {value}
              </td>
            ))}
          </tr>

          <tr>
            <td className="border p-4">Description</td>
            {renderProductRow("Description", "description").map((value, index) => (
              <td key={index} className="border p-4">
                {value}
              </td>
            ))}
          </tr>

          <tr>
            <td className="border p-4">Rating</td>
            {renderProductRow("Rating", "rating").map((value, index) => (
              <td key={index} className="border p-4">
                {value}
              </td>
            ))}
          </tr>

          <tr>
            <td className="border p-4">Category</td>
            {renderProductRow("Category", "category").map((value, index) => (
              <td key={index} className="border p-4">
                {value}
              </td>
            ))}
          </tr>

          <tr>
            <td className="border p-4">Availability</td>
            {renderProductRow("Availability", "availabilityStatus").map((value, index) => (
              <td key={index} className="border p-4">
                {value}
              </td>
            ))}
          </tr>

          <tr>
            <td className="border p-4">Brand</td>
            {renderProductRow("Brand", "brand").map((value, index) => (
              <td key={index} className="border p-4">
                {value}
              </td>
            ))}
          </tr>

          <tr>
            <td className="border p-4">Dimensions</td>
            {renderProductRow("Dimensions", "dimensions").map((value, index) => (
              <td key={index} className="border p-4">
                {value}
              </td>
            ))}
          </tr>

          <tr>
            <td className="border p-4">Add to Cart</td>
            {compareProducts.map((product) => (
              <td key={`add-to-cart-${product.id}`} className="border p-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
