import React from "react";
import { GrPowerReset } from "react-icons/gr";

const FilterComponent = ({
  sortOrder,
  setSortOrder,
  priceRange,
  setPriceRange,
  maxPrice,
}) => {
  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange([Math.min(value, priceRange[1]), priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange([priceRange[0], Math.max(value, priceRange[0])]);
  };

  // Reset price range to its initial state
  const handleReset = () => {
    setPriceRange([0, maxPrice]); // Reset price range to 0 and maxPrice
  };

  return (
    <div className="flex flex-wrap justify-between items-center bg-gray-50 shadow-md rounded-lg p-6 max-w-screen-xl mx-auto mb-6 space-y-4 sm:space-y-0">
      {/* Sorting Dropdown */}
      <div className="w-full sm:w-auto mb-4 sm:mb-0 flex-1 min-w-[200px]">
        <label
          htmlFor="sortOrder"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Sort By
        </label>
        <select
          id="sortOrder"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-[#ff5722] focus:outline-none transition duration-200 ease-in-out hover:shadow-lg"
        >
          <option value="">Select</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Price Range:
        </span>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="0"
            max={maxPrice}
            placeholder="Min"
            value={priceRange[0] === 0 ? "" : priceRange[0]}
            onChange={handleMinPriceChange}
            className="border rounded-lg p-3 w-full sm:w-28 text-gray-700 focus:ring-2 focus:ring-[#ff5722] focus:outline-none transition duration-200 ease-in-out hover:shadow-lg"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            min="0"
            max={maxPrice}
            placeholder="Max"
            value={priceRange[1] === 0 ? "" : priceRange[1]}
            onChange={handleMaxPriceChange}
            className="border rounded-lg p-3 w-full sm:w-28 text-gray-700 focus:ring-2 focus:ring-[#ff5722] focus:outline-none transition duration-200 ease-in-out hover:shadow-lg"
          />
          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="p-2 bg-[#ff5722] text-white rounded-full hover:bg-orange-600 transition duration-200 ease-in-out flex items-center justify-center"
          >
            <GrPowerReset style={{ fontSize: "20px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
