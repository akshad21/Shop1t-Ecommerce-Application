import React, { useState } from "react";
import { useRouter } from "next/router";
import Pagination from "../components/pagination";
import ProductCard from "../components/product_card";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import Link from "next/link"; // Import Link for navigation
import BackButton from "@/components/back_button";
import { ToastContainer } from "react-toastify";

// Fetch Products from the DummyJSON API
const fetchProducts = async (query) => {
  const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  const data = await response.json();
  return data.products || [];
};

const SearchResults = ({ initialProducts, totalItems, searchQuery }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Paginated products
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = initialProducts.slice(startIndex, endIndex);

  // Handle product click
  const handleProductClick = (id) => {
    router.push(`/products/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-100 min-h-screen p-6 relative">
        {/* Back Button */}
        <Link href="/" passHref>
          <BackButton/>
        </Link>

        <h1 className="text-3xl font-bold mb-8 text-center">
          Search Results for "{searchQuery}"
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <div
                key={product.id}
                className="cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No products found for your search.
            </p>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
      <ToastContainer/>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { query: searchQuery } = query;

  // Fetch products based on the search query
  const products = await fetchProducts(searchQuery || "");

  return {
    props: {
      initialProducts: products,
      totalItems: products.length,
      searchQuery: searchQuery || "",
    },
  };
}

export default SearchResults;
