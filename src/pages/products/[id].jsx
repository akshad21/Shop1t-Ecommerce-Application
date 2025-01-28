import React, { useState } from "react";
import Head from "next/head";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import BackButton from "../../components/back_button";
import DetailedProductCard from "../../components/product_detail_card";
import { ToastContainer } from "react-toastify";

export async function getServerSideProps({ params }) {
  const { id } = params;
  let product = null;
  let error = null;

  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) {
      throw new Error("Product not found.");
    }
    product = await res.json();
  } catch (err) {
    error = "An error occurred while fetching product details.";
  }

  return {
    props: {
      product,
      error,
    },
  };
}

const ProductDetails = ({ product, error }) => {
  const [isLoading, setIsLoading] = useState(true);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!product) {
    return <div className="text-red-500 text-center">Product not found.</div>;
  }

  // Handle image load event to hide the spinner
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>{product.name} | Product Details</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={`${product.category}, ${product.name}, online shopping`} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={`https://yourwebsite.com/products/${product.id}`} />
      </Head>

      <NavBar />

      <div className="container-lg bg-gray-200 mx-auto py-8 px-4 relative">
        <BackButton />
        <ToastContainer />

        {/* 3D Cube Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <div className="cube-spinner-3d">
              <div className="cube-face front"></div>
              <div className="cube-face back"></div>
              <div className="cube-face left"></div>
              <div className="cube-face right"></div>
              <div className="cube-face top"></div>
              <div className="cube-face bottom"></div>
            </div>
          </div>
        )}

        {/* Product Details */}
        <div className={`${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
          <DetailedProductCard
            product={{
              ...product,
              image: (
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-lg shadow-lg"
                  onLoad={handleImageLoad} // Call handleImageLoad when the image is fully loaded
                />
              ),
            }}
          />
        </div>
      </div>

      <Footer />


    </>
  );
};

export default ProductDetails;
