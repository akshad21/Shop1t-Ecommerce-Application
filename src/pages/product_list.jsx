import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ProductCard from "../components/product_card";
import Pagination from "../components/pagination";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import FilterComponent from "../components/filter";
import CategoryFilter from "../components/category_filter";
import { motion } from "framer-motion";

// Fetch data with SSR
export async function getServerSideProps(context) {
  const { query } = context;
  const page = parseInt(query.page) || 1;
  const itemsPerPage = 8;

  try {
    const res = await fetch("https://dummyjson.com/products?limit=0");
    const data = await res.json();
    const products = data.products;

    // Extract unique categories from the products
    const categories = Array.from(
      new Set(products.map((product) => product.category))
    ).map((name) => ({ name, slug: name }));

    // Calculate pagination data
    const totalItems = products.length;
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

    return {
      props: {
        products: paginatedProducts,
        totalItems,
        itemsPerPage,
        currentPage: page,
        allProducts: products, // Pass all products for filtering
        categories, // Pass categories
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
        totalItems: 0,
        itemsPerPage,
        currentPage: page,
        allProducts: [],
        categories: [],
      },
    };
  }
}

const ProductList = ({
    products,
    totalItems,
    itemsPerPage,
    currentPage,
    allProducts = [],
    categories = [],
  }) => {
    const router = useRouter();
    const { categories: queryCategories } = router.query;
  
    const initialSelectedCategories = queryCategories ? queryCategories.split(",") : [];
    const [selectedCategories, setSelectedCategories] = useState(initialSelectedCategories);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [sortOrder, setSortOrder] = useState("");
    const [priceRange, setPriceRange] = useState([
      0,
      allProducts?.length > 0 ? Math.max(...allProducts.map((p) => p.price)) : 0,
    ]);
  
    // Synchronize `selectedCategories` with URL on page load
    useEffect(() => {
      const urlCategories = queryCategories ? queryCategories.split(",") : [];
      setSelectedCategories(urlCategories);
    }, [queryCategories]);
  
    const filterProducts = useCallback(() => {
      let updatedProducts = allProducts;
  
      // Filter by price range
      updatedProducts = updatedProducts.filter(
        (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
      );
  
      // Filter by selected categories
      if (selectedCategories.length > 0) {
        updatedProducts = updatedProducts.filter((product) =>
          selectedCategories.includes(product.category)
        );
      }
  
      // Sort by price
      if (sortOrder === "low-to-high") {
        updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "high-to-low") {
        updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
      }
  
      setFilteredProducts(updatedProducts);
    }, [sortOrder, priceRange, selectedCategories, allProducts]);
  
    useEffect(() => {
      filterProducts();
    }, [filterProducts]);
  
    const handleCategoryChange = (newSelectedCategories) => {
      // Set the selected categories immediately to prevent delay
      setSelectedCategories(newSelectedCategories);
  
      // Update the URL based on new category selection
      const updatedQuery = {
        ...router.query,
        page: 1, // Reset page
        categories: newSelectedCategories.length > 0 ? newSelectedCategories.join(",") : undefined,
      };
  
      // Remove `categories` from the query if none are selected
      if (newSelectedCategories.length === 0) {
        delete updatedQuery.categories;
      }
  
      router.replace({
        pathname: router.pathname,
        query: updatedQuery,
      });
    };
  
    const handlePageChange = (page) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page },
      });
    };
  
    return (
      <>
        <Head>
          <title>All Products | Shop1t</title>
          <meta
            name="description"
            content="Browse our wide selection of products across various categories."
          />
          <meta name="keywords" content="products, shopping, deals, categories" />
        </Head>
        <NavBar />
  
        <div className="w-full min-h-screen bg-gray-200">
          <h2 className="text-2xl md:text-3xl font-semibold text-center p-5">
            Explore All Products
          </h2>
  
          <div className="container mx-auto px-4 pb-4">
            <FilterComponent
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              maxPrice={Math.max(...allProducts.map((p) => p.price))}
            />
            <CategoryFilter
              categories={categories}
              onFilterChange={handleCategoryChange}
              selectedCategories={selectedCategories}
            />
          </div>
  
          <div className="container mx-auto px-4 py-8">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-xl text-gray-600">No products found.</p>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {filteredProducts
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
              </motion.div>
            )}
  
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Pagination
                currentPage={currentPage}
                totalItems={filteredProducts.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </motion.div>
          </div>
        </div>
        <Footer />
      </>
    );
  };
  
  export default ProductList;
  