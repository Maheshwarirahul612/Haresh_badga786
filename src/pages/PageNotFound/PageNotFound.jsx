import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import loadingImage from '../../../public/images/1 (5).jpg';
import secondImage from '../../../public/images/1 (6).jpg';
import thardimage from '../../../public/images/1 (8).jpg';

const PageNotFound = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-gradient-to-r from-indigo-400 via-purple-600 to-blue-500 text-white relative overflow-hidden px-4">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-600 to-indigo-700 opacity-40 animate-pulse z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500 via-indigo-500 to-transparent opacity-50 z-0" />

            {/* Left Side: Error Text */}
            <div className="w-full md:w-1/2 text-center z-10 mb-10 md:mb-0">
                <p className="text-5xl font-bold text-white drop-shadow-md">
                    404 - Page Not Found
                </p>
                <p className="text-lg md:text-xl text-white mt-4">
                    We're sorry, the page you are looking for doesn't exist.
                </p>

                 <Link
                     to="/"
                className="mt-6 inline-block text-lg text-black hover:text-gray-600 transition-colors duration-200"
                >
                    Go back to Home
                </Link>


                <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: 'easeInOut' }}
                    className="h-1 bg-white rounded-full mt-6 w-full max-w-xs mx-auto"
                />
            </div>

            {/* Right Side: Concentric Circles */}
            <div className="w-full md:w-1/2 flex justify-center items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="relative w-[200px] h-[200px] flex justify-center items-center"
                >
                    {/* Outermost Rotating Circle */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                        className="absolute w-[220px] h-[220px] rounded-full overflow-hidden shadow-2xl"
                    >
                        <img
                            src={thardimage}
                            alt="Layer 1"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </motion.div>

                    {/* Middle Rotating Circle */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                        className="absolute w-[180px] h-[180px] rounded-full overflow-hidden shadow-xl"
                    >
                        <img
                            src={secondImage}
                            alt="Layer 2"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </motion.div>

                    {/* Innermost Static Circle */}
                    <div className="absolute w-[140px] h-[140px] rounded-full overflow-hidden shadow-md z-20">
                        <img
                            src={loadingImage}
                            alt="Center"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PageNotFound;
    