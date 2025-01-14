import React, { useState } from 'react';
import { CiFilter } from "react-icons/ci";

const CategoryFilter = ({ categories, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setSelectedCategories((prevSelected) => {
      if (checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter((category) => category !== value);
      }
    });
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Notify parent component of the selected categories
  React.useEffect(() => {
    onFilterChange(selectedCategories);
  }, [selectedCategories]);

  return (
    <div className="category-filter">
      <button
        className="w-full text-left font-bold py-1 px-3 bg-gray-200 shadow-lg rounded-md  flex justify-between items-center text-sm"
        onClick={handleToggle}
      >
        <span>Filter Categories </span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="p-2 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <div
                key={category.slug || category.name}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id={category.slug || category.name}
                  value={category.slug || category.name}
                  checked={selectedCategories.includes(category.slug || category.name)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor={category.slug || category.name} className="text-sm">
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
