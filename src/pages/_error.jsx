import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ErrorPage = ({ statusCode }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center text-center">
                {/* Animated Title */}
                <motion.h1
                    className="text-8xl font-extrabold mb-6"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                    Oops!
                </motion.h1>

                {/* Error Message with Animation */}
                <motion.p
                    className="text-2xl mb-8 max-w-md"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
                >
                    {statusCode
                        ? `An error ${statusCode} occurred on the server.`
                        : 'An error occurred on the client.'}
                </motion.p>

                {/* Animated Link */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeInOut' }}
                >
                    <Link
                        href="/"
                        className="px-6 py-3 bg-gray-50 text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105"
                    >
                        Go Back Home
                    </Link>
                </motion.div>

                {/* Floating Effects */}
                
            </main>
            <Footer />
        </div>
    );
};

ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default ErrorPage;
