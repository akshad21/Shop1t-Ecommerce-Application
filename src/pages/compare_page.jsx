import React, { useContext } from "react";
import { CartContext } from "../context/cart_context";
import CompareTable from "../components/compare_table";
import BackButton from "../components/back_button"; // Assuming you have a BackButton component
import Header from "../components/navbar"; // Assuming you have a Header component
import Footer from "../components/footer"; // Assuming you have a Footer component
import { ToastContainer } from "react-toastify"; // For notifications

const ComparePage = () => {
  const { compareProducts, removeFromCompare } = useContext(CartContext);

  if (compareProducts.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <div className="flex-grow container mx-auto p-6 bg-white shadow-2xl rounded-lg mt-8 mb-8">
          <div className="text-center my-8">
            <h2 className="text-xl font-semibold text-gray-800">No products to compare.</h2>
            <p className="text-gray-500 mt-4">Add some products to compare!</p>
          </div>
        </div>

        {/* Footer */}
        <Footer />

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="container mx-auto p-6 flex-grow bg-white shadow-2xl rounded-lg mt-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Product Comparison</h1>
          <BackButton />
        </div>

        {/* Compare Table */}
        <CompareTable compareProducts={compareProducts} removeFromCompare={removeFromCompare} />
      </div>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default ComparePage;
