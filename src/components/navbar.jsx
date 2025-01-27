import React, { useState, useEffect, useRef, useContext } from "react";
import { IoBagHandleSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import { FaHeart } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link"; // Import Link for navigation
import { CartContext } from "../context/cart_context"; // Import CartContext to manage cart and wishlist state

// Function to fetch products based on the search query
const fetchProducts = async (query) => {
  if (!query) return []; // If no query, return an empty array
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${query}`
  );
  const data = await response.json();
  return data.products || []; // Return the products from the response
};

const NavBar = () => {
  // State variables for menu and search functionality
  const [menuOpen, setMenuOpen] = useState(false); // To toggle the mobile menu
  const [searchQuery, setSearchQuery] = useState(""); // To store the current search query
  const [searchResults, setSearchResults] = useState([]); // To store search results
  const [isLoading, setIsLoading] = useState(false); // To track the loading state for search
  const [searchExecuted, setSearchExecuted] = useState(false); // Track if search has been executed
  const router = useRouter(); // Router for navigation
  const searchRef = useRef(null); // Reference to the search input container

  // Use CartContext to access cart and wishlist information
  const { cart, wishlist, compareProducts } = useContext(CartContext);

  // Function to toggle menu visibility on mobile
  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  // Navigate to the cart page
  const goToCart = () => {
    router.push("/cart"); // Navigate to the cart page
  };

  // Navigate to the wishlist page
  const goToWishlist = () => {
    router.push("/wishlist"); // Navigate to the wishlist page
  };

  // Navigate to the compare page
  const goToCompare = () => {
    router.push("/compare_page"); // Navigate to the compare page
  };

  // Handle the search action (navigate to the search results page)
  const handleSearch = () => {
    setSearchExecuted(true); // Mark search as executed
    router.push(`/search_results?query=${searchQuery}`); // Navigate to the search results page with the query
  };

  // Calculate the total quantity of items in the cart
  const totalCartQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Effect hook to perform debounced search functionality
  useEffect(() => {
    // Set a delay for search input changes to avoid excessive API calls
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery && !searchExecuted) {
        setIsLoading(true); // Show loading state while fetching results
        fetchProducts(searchQuery).then((products) => {
          setSearchResults(products); // Set search results
          setIsLoading(false); // Hide loading state after fetching results
        });
      } else {
        setSearchResults([]); // Clear results when search query is empty or search has been executed
      }
    }, 500); // 500ms debounce time

    // Cleanup function to clear the timeout if the component unmounts or query changes
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchExecuted]);

  // Effect hook to close the search results dropdown if the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]); // Close search results if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Listen for clicks outside
    return () => document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener
  }, []);

  return (
    <div className="flex flex-col bg-white text-black">
      {/* Upper Half of Navbar */}
      <div className="flex justify-between items-center p-2 bg-white relative lg:flex-row flex-col lg:gap-0 gap-4">
        <div ref={searchRef} className="relative flex w-full lg:w-auto">
          {/* Search Bar with Button */}
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-md border-0 w-full lg:w-80 text-sm lg:text-base"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value); // Update search query on change
              setSearchExecuted(false); // Allow the dropdown to show again after the user starts typing
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchQuery.trim()) {
                // Check if "Enter" key is pressed and there is input
                handleSearch(); // Trigger the search function
              }
            }}
          />
          <button
            onClick={handleSearch} // Trigger search on button click
            className="text-black px-2 py-1 rounded-md ml-2 hover:bg-[#ff5722] text-sm lg:text-base"
          >
            <IoIosSearch style={{ fontSize: "26px" }} />
          </button>

          {/* Display Search Results */}
          {searchQuery && !searchExecuted && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 bg-white border mt-10 shadow-lg max-h-60 overflow-y-auto z-10 rounded-lg transition-all duration-300 w-[365px] lg:w-80">
              {isLoading ? (
                <div className="text-center p-4">Loading...</div> // Show loading text while fetching data
              ) : (
                searchResults.slice(0, 10).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    passHref
                  >
                    <div className="p-4 cursor-pointer hover:bg-[#ff5722] flex items-center transition-colors duration-300 rounded-lg">
                      {/* Product Image */}
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-12 h-12 object-contain rounded-lg mr-4"
                      />
                      <div className="flex flex-col">
                        {/* Product Title */}
                        <span className="text-black font-medium text-sm">
                          {product.title}
                        </span>
                        {/* Product Price */}
                        <span className="text-sm text-gray-600">
                          {product.price}$
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        {/* Sale Text - Centered on Large Screens */}
<div className="hidden  lg:flex justify-center items-center w-full lg:w-auto">
  <div className="text-black text-sm lg:text-lg text-center lg:text-left">
    New Year Sale. Flat 40% Off On All Products!
  </div>
</div>

{/* Login Button */}
<div className="hidden lg:flex justify-end w-full lg:w-auto">
  <button className="bg-[#ff5722] text-white px-4 py-2 rounded-md hover:bg-[#ff4e22] text-sm lg:text-base">
    Login
  </button>
</div>

      </div>

      {/* Lower Half of Navbar */}
      <div
        className={`flex justify-between items-center border-t-2 p-4 bg-[#423c39] ${
          menuOpen ? "flex-col gap-6" : "gap-4"
        } lg:flex-row transition-all duration-300 ease-in-out`}
      >
        {/* Website Name - Centered when the menu is open */}
        <div
          className={`${
            menuOpen ? "w-full text-center" : "w-auto"
          } text-white text-3xl font-bold`}
        >
          <Link href="/" passHref>
            <span className="text-white hover:text-[#ff5722]">Shop1t</span>
          </Link>
        </div>

        {/* Hamburger Icon - Positioned to the extreme right */}
        <button
          className="lg:hidden p-2 text-2xl cursor-pointer absolute right-4"
          onClick={toggleMenu} // Toggle menu open/close
          aria-label="Toggle menu"
        >
          <GiHamburgerMenu style={{ color: "white" }} />
        </button>

        {/* Menu Links and Icons - Hidden on Mobile until clicked */}
        <div
          className={`flex gap-6 lg:flex ${
            menuOpen ? "flex-col gap-6" : "hidden"
          } transition-all duration-300 ease-in-out`}
        >
          <Link href="">
            <span className="text-white text-sm px-4 py-2 rounded-md hover:bg-[#ff5722] transition duration-300">
              Shop
            </span>
          </Link>
          <Link href="">
            <span className="text-white text-sm px-4 py-2 rounded-md hover:bg-[#ff5722] transition duration-300">
              Sale
            </span>
          </Link>
          <Link href="">
            <span className="text-white text-sm px-4 py-2 rounded-md hover:bg-[#ff5722] transition duration-300">
              Customer Care
            </span>
          </Link>
          <Link href="">
            <span className="text-white text-sm px-4 py-2 rounded-md hover:bg-[#ff5722] transition duration-300">
              Stores
            </span>
          </Link>
        </div>

        {/* Icons - Hidden on Mobile until clicked */}
        <div
  className={`flex ${
    menuOpen ? "flex-row justify-evenly gap-8" : "hidden"
  } lg:flex gap-4 transition-all duration-300 ease-in-out`}
>
  <button
    className="bg-transparent text-white p-2 rounded-md hover:text-[#ff5722] transition duration-300 relative"
    onClick={goToCompare}
    aria-label="Go to Compare"
  >
    <FaBalanceScale style={{ fontSize: "23px" }} />
    {compareProducts.length > 0 && (
      <span className="absolute top-[0px] right-[-2px] text-xs text-white bg-[#ff5722] rounded-full px-1">
        {compareProducts.length}
      </span>
    )}
  </button>

  <button
    className="bg-transparent text-white p-2 rounded-md hover:text-[#ff5722] transition duration-300 relative"
    onClick={goToWishlist}
    aria-label="Go to Wishlist"
  >
    <FaHeart style={{ fontSize: "23px" }} />
    {wishlist.length > 0 && (
      <span className="absolute top-0 left-[26px]  text-xs text-white bg-[#ff5722] rounded-full px-1">
        {wishlist.length}
      </span>
    )}
  </button>

  <button
    className="bg-transparent text-white p-2 rounded-md hover:text-[#ff5722] transition duration-300 relative"
    onClick={goToCart}
    aria-label="Go to Cart"
  >
    <IoBagHandleSharp style={{ fontSize: "23px" }} />
    {totalCartQuantity > 0 && (
      <span className="absolute top-0 right-0 text-xs text-white bg-[#ff5722] rounded-full px-1">
        {totalCartQuantity}
      </span>
    )}
  </button>
</div>


      </div>
    </div>
  );
};

export default NavBar;
