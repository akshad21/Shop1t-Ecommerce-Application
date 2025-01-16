import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

const CategoryFilter = ({ categories, onFilterChange }) => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Set the selected categories from the URL query when the component mounts
  useEffect(() => {
    const selectedCategoriesFromQuery = router.query.categories
      ? router.query.categories.split(",")
      : [];
    setSelectedCategories(selectedCategoriesFromQuery);
  }, [router.query.categories]);

  // Handle category checkbox change
  const handleCheckboxChange = useCallback(
    (e) => {
      const { value, checked } = e.target;

      // Use functional setState to ensure the state is updated with the latest value
      setSelectedCategories((prevSelectedCategories) => {
        let updatedCategories;
        if (checked) {
          updatedCategories = [...prevSelectedCategories, value];
        } else {
          updatedCategories = prevSelectedCategories.filter(
            (category) => category !== value
          );
        }

        onFilterChange(updatedCategories);

        // Update the URL query
        const query = { ...router.query, categories: updatedCategories.join(",") };
        if (updatedCategories.length === 0) {
          delete query.categories;
        }

        // Only update the router if the query has actually changed
        if (router.query.categories !== updatedCategories.join(",")) {
          router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
        }

        return updatedCategories;
      });
    },
    [onFilterChange, router.query.categories, router.pathname]
  );

  // Toggle the filter dropdown visibility
  const handleToggle = () => setIsOpen((prev) => !prev);

  // Determine background color based on the current pathname
  const bgColor = router.pathname === "/" ? "bg-gray-200" : "bg-white";
  

  return (
    <div className="category-filter rounded-md shadow-md transition-all duration-300">
      <button
        className={`w-full text-left font-bold py-1 px-3 ${bgColor} shadow-lg rounded-md flex justify-between items-center text-sm`}
        onClick={handleToggle}
      >
        <span>Filter Categories</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="p-2 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <div key={category.slug || category.name} className="flex items-center gap-2">
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
