import React from "react";
import { FaArrowLeftLong,FaArrowRightLong } from "react-icons/fa6";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages === 1) return null;

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {/* Previous Button */}
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-[50%] ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-800 hover:bg-[#ff5722]"
        }`}
      >
        <FaArrowLeftLong style={{fontSize:"23px"}}/> {/* Left arrow for previous */}
      </button>

      {/* Next Button */}
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-[50%] ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-800 hover:bg-[#ff5722]"
        }`}
      >
        <FaArrowRightLong style={{fontSize:"23px"}}/> {/* Right arrow for next */}
      </button>
    </div>
  );
};

export default Pagination;
