import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Each phase in sequence
const phases = [
  {
    key: 'ganesh',
    content: (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-orange-500 tracking-wide">
          ॐ શ્રી ગણેશાય નમઃ
        </h1>
        <p className="text-gray-700 italic text-lg">
          શુભ શરૂઆત માટે દૈવી આશીર્વાદ.
        </p>
      </motion.div>
    ),
  },
  {
    key: 'matang',
    content: (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 1.5 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-red-600 tracking-wide leading-snug">
          પરમ પૂજ્ય શ્રી ધણી માતંગ દેવ
        </h1>
        <p className="text-gray-700 italic text-lg">
          ભક્તિ અને આશીર્વાદ સાથે સુરક્ષા શરૂ થાય છે.
        </p>
      </motion.div>
    ),
  },
  {
    key: 'ram',
    content: (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 1.5 }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-red-600 tracking-wider">
          🚩 જય શ્રીરામ 🚩
        </h1>
        <p className="text-gray-700 italic text-lg">
          અંધકાર પર પ્રકાશની વિજય ગાથા.
        </p>
      </motion.div>
    ),
  },
  {
    key: 'welcome',
    content: (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="max-w-4xl p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-center space-y-4"
      >
        <h1 className="text-5xl sm:text-7xl font-black text-gray-900">
          આપનું સ્વાગત છે{' '}
          <span className="bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-700 bg-clip-text text-transparent">
            Guardify
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-800 font-light">
          એઆઈ આધારિત ડિજિટલ શિલ્ડ – ચોકસાઇ અને કાળજી સાથે તમારા ડિજિટલ જગતને સુરક્ષિત કરે છે.
        </p>
      </motion.div>
    ),
  },
  {
    key: 'deployer',
    content: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="text-center mt-12 space-y-2"
      >
        <p className="text-gray-600 italic text-lg">તૈયાર કરનાર અને જાળવનાર</p>
        <p className="text-3xl sm:text-4xl font-signature text-gray-900 tracking-wider">
          હરેશ નારાયણભાઇ મહેશ્વરી
        </p>
      </motion.div>
    ),
  },
  {
    key: 'cta',
    content: ({ navigate }) => (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-center mt-12 space-y-4"
      >
        <p className="text-xl text-gray-700">તમારું સુરક્ષિત સફર હવે શરૂ કરો.</p>
        <div className="flex justify-center gap-6 flex-wrap">
          <button
            onClick={() => navigate('/auth')}
            className="px-8 py-3 text-lg font-bold rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:scale-105"
          >
            🚀 શરૂ કરો
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="px-8 py-3 text-lg font-bold rounded-xl border border-black text-black hover:bg-black hover:text-white transition-all duration-300 shadow-lg hover:scale-105"
          >
            🔐 લૉગિન
          </button>
        </div>
      </motion.div>
    ),
  },
];

const Intro = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);

  // Timed transitions through intro phases
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 2500),
      setTimeout(() => setPhase(2), 6000),
      setTimeout(() => setPhase(3), 10500),
      setTimeout(() => setPhase(4), 14000),
      setTimeout(() => setPhase(5), 17500),
      setTimeout(() => setPhase(6), 21000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-blue-50 text-black flex justify-center items-center overflow-hidden px-4">
{/* Glowing Background Circles */}
<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
  <div className="absolute -top-6 -left-6 w-[250px] h-[250px] bg-gradient-to-br from-purple-300 via-indigo-200 to-transparent rounded-full blur-2xl animate-pulse" />
  <div className="absolute bottom-0 right-0 w-[280px] h-[280px] bg-gradient-to-tr from-pink-300 via-red-300 to-transparent rounded-full blur-2xl animate-pulse" />
</div>
      {/* Animated Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phases[phase]?.key}
          className="z-10 max-w-4xl w-full flex flex-col items-center"
        >
          {phase === 6
            ? phases[phase]?.content({ navigate })
            : phases[phase]?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Intro;
