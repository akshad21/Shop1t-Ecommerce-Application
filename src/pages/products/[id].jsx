import React from "react";
import Head from "next/head";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import BackButton from "../../components/back_button";
import DetailedProductCard from "../../components/product_detail_card";
import { ToastContainer } from "react-toastify";

// Server-side function to fetch product details using the product ID
export async function getServerSideProps({ params }) {
  // Extract product ID from the URL parameters
  const { id } = params;
  let product = null;
  let error = null;

  try {
    // Fetch product details from the external API based on the product ID
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    
    // If the API response is not okay, throw an error
    if (!res.ok) {
      throw new Error("Product not found.");
    }
    
    // If the fetch is successful, parse the product data
    product = await res.json();
  } catch (err) {
    // If an error occurs during fetching or processing, store an error message
    error = "An error occurred while fetching product details.";
  }

  // Return the product data (or error) as props to the component
  return {
    props: {
      product,
      error,
    },
  };
}

const ProductDetails = ({ product, error }) => {
  // If there was an error in fetching the product, display an error message
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  // If no product is found (e.g., empty product object), display a product not found message
  if (!product) {
    return <div className="text-red-500 text-center">Product not found.</div>;
  }

  return (
    <>
      {/* Head component for dynamic meta tags to improve SEO */}
      <Head>
        {/* Set the page title dynamically based on the product name */}
        <title>{product.name} | Product Details</title>
        
        {/* Dynamic meta tags to improve search engine optimization (SEO) */}
        <meta name="description" content={product.description} />
        <meta name="keywords" content={`${product.category}, ${product.name}, online shopping`} />
        
        {/* Open Graph meta tags for social media sharing */}
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={`https://yourwebsite.com/products/${product.id}`} />
      </Head>

      {/* Navigation bar */}
      <NavBar />
      
      <div className="container-lg bg-gray-200 mx-auto py-8 px-4">
        {/* Back button to navigate to the previous page */}
        <BackButton />
        
        {/* ToastContainer for displaying toast notifications (e.g., success or error messages) */}
        <ToastContainer />
        
        {/* Detailed product card to display the product's detailed information */}
        <DetailedProductCard product={product} />
      </div>

      {/* Footer section of the page */}
      <Footer />
    </>
  );
};

// Export the component as the default export
export default ProductDetails;
