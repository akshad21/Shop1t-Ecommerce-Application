import React, { useContext } from "react";
import { useRouter } from "next/router";
import { CartContext } from "../context/cart_context";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import CartItem from "../components/cart_item";
import BackButton from "../components/back_button";
import { toast } from "react-toastify"; // Import toast
import { ToastContainer } from "react-toastify";

const Cart = () => {
  const { cart } = useContext(CartContext);
  const router = useRouter();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warn("Your cart is empty. Add items to proceed to checkout.");
    } else {
      toast.success("Proceeding to checkout...");
      // Logic to proceed to checkout or navigation to another page
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow container mx-auto py-8 px-4">
        <div className="mb-8">
          <BackButton />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          SHOPPING CART
        </h1>
        
        {cart.length > 0 ? (
          <div className="space-y-6">
            <div className="space-y-4 animate-fadeIn">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="flex justify-between items-center border-t border-gray-300 pt-6 mt-6">
              <h2 className="text-2xl font-semibold text-gray-700">Total Price</h2>
              <span className="text-3xl font-bold text-green-500">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="text-right mt-6">
              <button
                className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center mt-16">
            <p className="text-xl text-gray-500 mb-5">Your cart is empty.</p>
            <button
              className="px-6 py-3 bg-orange-500 text-white font-medium rounded-[30px] hover:bg-orange-600 transition-all transform hover:scale-105"
              onClick={() => router.push("/")}
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Cart;
