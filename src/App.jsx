import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { TbMusic, TbVolume3, TbHeart, TbAnchor, TbMailOpened } from 'react-icons/tb';

// ✅ Correct import path from src/App.jsx → src/assets/music/music.mp3
import musicFile from './assets/music/music.mp3';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.4 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } },
};

export default function FathersDayApp() {
  const [isOpened, setIsOpened] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  const bgMusicRef = useRef(null);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const handleOpenLetter = () => {
    setIsOpened(true);
    setShowCelebration(true);
    setIsPlaying(true);
    
    if (bgMusicRef.current) {
      bgMusicRef.current.currentTime = 0;
      bgMusicRef.current.play().catch(console.error);
    }

    setTimeout(() => setShowCelebration(false), 3200);
  };

  const toggleMusic = () => {
    const audio = bgMusicRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const AnimatedText = ({ text, className = "" }) => (
    <div className={`flex flex-wrap justify-center gap-x-3 gap-y-1 ${className}`}>
      {text.split(" ").map((word, index) => (
        <motion.span key={index} variants={wordVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-red-700 overflow-hidden relative flex flex-col items-center justify-center">
      
      {/* Background Music */}
      <audio
        ref={bgMusicRef}
        loop
        src={musicFile}
        preload="auto"
      />

      {/* Cinematic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-red-950/20 rounded-full blur-[150px] pointer-events-none" />

      {showCelebration && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti 
            width={windowSize.width} 
            height={windowSize.height} 
            recycle={false} 
            numberOfPieces={650} 
            colors={['#ef4444', '#f87171', '#ffffff', '#fbbf24']}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="unopened"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
            transition={{ duration: 0.8 }}
            className="z-20 flex flex-col items-center"
          >
            <button 
              onClick={handleOpenLetter}
              className="group relative px-10 py-6 bg-red-800/20 border-2 border-red-500/50 rounded-3xl hover:bg-red-700/30 hover:border-red-400 transition-all duration-700 flex items-center gap-4 backdrop-blur-md shadow-xl"
            >
              <TbMailOpened size={36} className="text-red-400 group-hover:text-red-100 transition-colors" />
              <span className="text-2xl font-serif tracking-[4px] text-red-100 group-hover:text-white uppercase">
                Open Dad’s Letter
              </span>
              <div className="absolute inset-0 rounded-3xl border border-red-500/30 group-hover:animate-ping" />
            </button>
          </motion.div>
        ) : (
          <motion.main
            key="opened"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3 }}
            className="relative z-20 w-full max-w-3xl px-6 py-12"
          >
            <div className="p-8 md:p-16 text-center border border-red-900/30 rounded-3xl relative">
              <div className="absolute -top-6 left-8 text-red-700/40"><TbHeart size={52}/></div>
              <div className="absolute -bottom-6 right-8 text-red-700/40"><TbAnchor size={52}/></div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="font-letter text-slate-200 text-[28px] md:text-[42px] leading-[1.85] flex flex-col items-center space-y-8 tracking-[-0.02em]"
              >
                <motion.div variants={wordVariants} className="font-sans text-sm tracking-[3px] text-red-400/90 uppercase mb-2">
                  To My Hero • My Father
                </motion.div>

                <AnimatedText text="Dad, you are the quiet strength that holds our world together," />
                <AnimatedText text="the gentle voice that calms every fear," />
                <AnimatedText text="the unwavering love that taught me what it truly means to sacrifice." />
                
                <AnimatedText text="Through every late night, every quiet prayer, and every moment you chose us first—" />
                <AnimatedText text="you showed me the heart of a father who reflects the love of our Heavenly Father." />

                <motion.div variants={wordVariants} className="py-10 my-8 border-y border-red-900/40 w-full max-w-xl mx-auto opacity-95">
                  <p className="font-serif text-2xl md:text-3xl text-red-200 italic leading-tight">
                    "As a father has compassion on his children, so the Lord has compassion on those who fear him."
                  </p>
                  <p className="font-sans text-base text-red-400/80 mt-5 tracking-widest uppercase">— Psalm 103:13</p>
                </motion.div>

                <AnimatedText text="Thank you for being my rock, my guide, and the greatest blessing in my life." className="text-red-300" />
                <motion.div variants={wordVariants} className="pt-6">
                  <AnimatedText text="I love you more than words can ever say." className="text-red-400 text-3xl md:text-5xl font-light" />
                </motion.div>
                <motion.div variants={wordVariants} className="text-4xl md:text-6xl text-red-500/90 tracking-widest font-serif pt-6">
                  Happy Father’s Day
                </motion.div>
              </motion.div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Music Control Button */}
      <AnimatePresence>
        {isOpened && (
          <motion.button 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2 }}
            onClick={toggleMusic}
            className="fixed bottom-8 right-8 p-5 rounded-2xl bg-slate-900/90 border border-slate-700 text-red-400 hover:text-red-300 hover:bg-slate-800/90 transition-all z-50 shadow-2xl flex items-center gap-2 pl-6"
          >
            {isPlaying ? <TbVolume3 size={28} /> : <TbMusic size={28} />}
            <span className="text-sm font-medium pr-2">
              {isPlaying ? "Pause Music" : "Play Music"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}