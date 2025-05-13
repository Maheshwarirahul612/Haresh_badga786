import React from 'react';
import { motion } from 'framer-motion';

import loadingImage from '../../../public/images/1 (5).jpg';
import secondImage from '../../../public/images/1 (6).jpg';
import thardimage from '../../../public/images/1 (8).jpg';

const AdvancedLoading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-400 via-purple-600 to-blue-500 text-white relative overflow-hidden">
      {/* Layered Pulsing Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-600 to-indigo-700 opacity-40 animate-pulse z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500 via-indigo-500 to-transparent opacity-50 z-0" />

      {/* Centered Concentric Circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="relative w-[200px] h-[200px] z-10 flex justify-center items-center"
      >
        {/* Outermost */}
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

        {/* Middle */}
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

        {/* Center */}
        <div className="absolute w-[140px] h-[140px] rounded-full overflow-hidden shadow-md z-20">
          <img
            src={loadingImage}
            alt="Center"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </motion.div>

      {/* Text and Progress Bar */}
      <div className="absolute bottom-24 text-center z-10">
        <p className="text-xl font-semibold">
          તમારું ડિજિટલ દુશ્મન હવે પરેશાન થશે!
        </p>
        <p className="text-sm text-cyan-100 mt-1">
          તમારા ડેટા અને ગોપનીયતાને શ્રેષ્ઠ સુરક્ષા મળતી રહી છે.
        </p>

        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: 'easeInOut' }}
          className="h-1 bg-cyan-400 rounded-full mt-4 w-full max-w-xs mx-auto"
        />
      </div>
    </div>
  );
};

export default AdvancedLoading;
