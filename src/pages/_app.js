import "@/styles/globals.css";
import "../styles/footer.css";
import { CartProvider } from "../context/cart_context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
      <ToastContainer  />
    </>
  );
}

export default MyApp;
