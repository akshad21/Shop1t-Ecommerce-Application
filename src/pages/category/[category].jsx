import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import ProductCard from "../../components/product_card";
import Pagination from "../../components/pagination";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import FilterComponent from "../../components/filter";
import BackButton from "../../components/back_button";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

// Server-side rendering: Fetch data before rendering the page
export async function getServerSideProps(context) {
  const { category } = context.query;
  const normalizedCategory = category
    ? category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    : "";

  try {
    const res = await fetch(`https://dummyjson.com/products/category/${normalizedCategory}`);
    const data = await res.json();

    if (data.products && data.products.length > 0) {
      // Determine the maximum price from the products
      const maxPrice = Math.max(...data.products.map((product) => product.price));

      return { props: { products: data.products, maxPrice } };
    } else {
      return { props: { products: [], maxPrice: 1000, error: "No products found for this category." } };
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return { props: { products: [], maxPrice: 1000, error: "An error occurred while fetching the products." } };
  }
}

const CategoryPage = ({ products, error, maxPrice }) => {
  const router = useRouter();
  const { category } = router.query;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  // Memoized filtered and sorted products to avoid unnecessary re-renders
  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
      )
      .sort((a, b) => {
        if (sortOrder === "low-to-high") return a.price - b.price;
        if (sortOrder === "high-to-low") return b.price - a.price;
        return 0;
      });
  }, [products, sortOrder, priceRange]);

  // Paginated products
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Dynamic Meta Tags */}
      <Head>
        <title>{category ? `${category} | Products` : "Category Page"}</title>
        <meta
          name="description"
          content={`Explore the ${category} collection of products. Find great deals and offers on the best products.`}
        />
        <meta
          name="keywords"
          content={`${category}, products, best deals, online shopping, category`}
        />
        <meta property="og:title" content={`${category} Collection`} />
        <meta
          property="og:description"
          content={`Explore the ${category} collection of products. Find great deals and offers on the best products.`}
        />
        <meta property="og:url" content={`https://yourwebsite.com/category/${category}`} />
      </Head>

      <NavBar />
      <div className="bg-gray-200 min-h-screen py-8 px-4">
        {/* Back Button */}
        <div className="text-center mb-6">
          <BackButton />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 capitalize">
          {category} Collection
        </h1>

        {/* Error Handling */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* FilterComponent */}
        <FilterComponent
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          maxPrice={maxPrice} // Pass maxPrice to the FilterComponent
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 max-w-screen-xl mx-auto">
          {(paginatedProducts.length === 0 && !error) && (
            <div className="text-center text-gray-500">No products available.</div>
          )}
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && !error && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default CategoryPage;
