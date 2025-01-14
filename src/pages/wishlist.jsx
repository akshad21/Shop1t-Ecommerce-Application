import React, { useContext } from "react";
import { CartContext } from "../context/cart_context";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import WishlistCard from "../components/wishlist_card";
import BackButton from "../components/back_button"; // Import your BackButton component
import { ToastContainer } from "react-toastify";

const Wishlist = () => {
  const { wishlist, moveToCart, removeFromWishlist } = useContext(CartContext);

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <NavBar />

      <div className="container mx-auto py-8 px-4 flex-grow">
        <div className="mb-8">
          {/* Use your BackButton component */}
          <BackButton />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Your Wishlist
        </h1>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-lg"
              >
                <WishlistCard
                  product={product}
                  moveToCart={moveToCart}
                  removeFromWishlist={removeFromWishlist}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Your wishlist is empty.</p>
        )}
      </div>
        <ToastContainer/>
      <Footer />
    </div>
  );
};

export default Wishlist;
