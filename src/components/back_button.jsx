import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();

  const goBack = () => {
    const currentPath = router.pathname;

    // If we are on the wishlist, cart, or compare page, redirect to the homepage
    if (currentPath === "/wishlist" || currentPath === "/cart" || currentPath === "/compare_page") {
      router.push("/"); // Redirect to the homepage
    } else {
      // If history length is greater than 1, go back; else go to homepage
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push("/"); // Redirect to the homepage
      }
    }
  };

  return (
    <button
      onClick={goBack}
      aria-label="Go back"
      className="flex items-center gap-2 bg-[#423c39] text-white py-2 px-6 rounded-full shadow-lg hover:bg-[#ff5622] transform hover:scale-105 transition duration-300 ease-in-out"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 12H5M5 12l7-7M5 12l7 7"
        />
      </svg>

      
    </button>
  );
};

export default BackButton;
