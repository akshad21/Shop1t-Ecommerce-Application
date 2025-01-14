import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import CategoryFilter from "../components/category_filter"; // Import CategoryFilter component

// Dynamically import other components to avoid server-side rendering issues
const Card = dynamic(() => import("../components/category_card"), { ssr: false });
const NavBar = dynamic(() => import("../components/navbar"), { ssr: false });
const Footer = dynamic(() => import("../components/footer"), { ssr: false });


// getStaticProps fetches data at build time
export async function getStaticProps() {
  try {
    const res = await fetch('https://dummyjson.com/products/category-list'); // Fetch categories from the API
    const categories = await res.json();

    return {
      props: {
        categories: Array.isArray(categories)
          ? categories.map((c) => ({
              name: c,
              slug: c.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') // Create SEO-friendly slugs
            }))
          : [],
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error); // Handle any errors during the fetch
    return {
      props: {
        categories: [], // Return empty categories in case of an error
      },
    };
  }
}


const Home = ({ categories }) => {
  // State to store categories fetched from API or localStorage
  const [cachedCategories, setCachedCategories] = useState(categories || []);
  
  // State to store categories after filtering
  const [filteredCategories, setFilteredCategories] = useState(categories || []);
  
  // State to handle loading state when fetching categories
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Effect to load categories from localStorage or fetch from the API
  useEffect(() => {
    if (!categories && !cachedCategories.length) {
      const cachedData = localStorage.getItem("categories");
      if (cachedData) {
        setCachedCategories(JSON.parse(cachedData)); // Load categories from localStorage
      } else {
        fetchCategories(); // Fetch categories from API if not in localStorage
      }
    }
  }, [categories, cachedCategories]);

  // Function to fetch categories from the API
  const fetchCategories = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const res = await fetch('https://dummyjson.com/products/category-list');
      const categories = await res.json();
      setCachedCategories(categories); // Update cached categories state
      localStorage.setItem("categories", JSON.stringify(categories)); // Save categories to localStorage for future use
    } catch (error) {
      console.error("Error fetching categories:", error); // Handle any errors during API call
    } finally {
      setIsLoading(false); // Set loading state to false after fetching is done
    }
  };

  // Function to handle filter changes
  const handleFilterChange = (selectedCategories) => {
    // If no categories are selected, show all categories
    if (selectedCategories.length === 0) {
      setFilteredCategories(cachedCategories); // No filter, show all categories
    } else {
      // Filter categories based on selected checkboxes
      const filtered = cachedCategories.filter((category) =>
        selectedCategories.includes(category.slug || category.name)
      );
      setFilteredCategories(filtered); // Update the filteredCategories state
    }
  };

  // Show loading message while categories are being fetched
  if (isLoading) {
    return <div className="text-center mt-10 text-xl">Loading categories...</div>;
  }

  // Show message if no categories are found
  if (!cachedCategories || cachedCategories.length === 0) {
    return <div className="text-center mt-10 text-xl">No categories found.</div>;
  }

  return (
    <>
      
      <Head>
        <title>Shop1t | Best Products Store</title>
        <meta name="description" content="Explore the best collection of products in various categories. Shop now for exclusive offers!" />
        <meta name="keywords" content="best products, new collection, online shopping, categories, best deals" />
      </Head>

      <NavBar />
      <div className="w-full m-0 p-0">
        {/* Hero Section */}
        <div
          className="relative h-[45vh] flex flex-col justify-center items-center text-black bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1475965894430-b05c9d13568a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <h1 className="text-3xl md:text-[48px] font-bold mb-[10px]">NEW COLLECTION</h1>
          <p className="text-lg md:text-[18px] mb-[20px]">
            Your one-stop shop for the best products.
          </p>
          <Link href="">
            <button className="bg-[#423C39] hover:bg-[#ff5722] text-white font-[18px] py-[15px] px-[30px] rounded-[8px] transition">
              Shop Now
            </button>
          </Link>
        </div>

        {/* Category Filter Section */}
        <CategoryFilter
          categories={cachedCategories}
          onFilterChange={handleFilterChange} // Pass the filter change handler to CategoryFilter component
        />

        {/* Categories Section */}
        <div className="py-6 px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">CATEGORIES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <Link
                href={`/category/${encodeURIComponent(category.slug || category.name)}`} // Navigate to the dynamic category page
                key={category.slug || category.name}
              >
                <Card
                  title={category.name || category.slug} // Display the category name
                  imageSrc={`/images/${category.slug || category.name}.jpg`} // Display the category image (you may need to replace this with correct path)
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};



export default Home;
