"use client";

import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 font-roboto"
      style={{
        background: "linear-gradient(45deg, #22b455, #1dd1a1)",
      }}
    >
      {/* Main Loading Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col justify-center items-center"
      >
        {/* App Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl font-bold mb-6 text-center drop-shadow-2xl"
          style={{
            background: "linear-gradient(45deg, #C9B037, #8BBF3F)", // gold + green
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
          }}
        >
          Salaty
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white text-xl font-semibold mb-12 text-center drop-shadow-lg"
        >
          Your Islamic Prayer Companion
        </motion.p>

        {/* Loading Dots */}
        <div className="flex space-x-3 mb-12">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="w-4 h-4 rounded-full shadow-lg"
              style={{
                background: "radial-gradient(circle, #ffffff, #f0f0f0)",
                boxShadow: "0 0 20px rgba(255,255,255,0.5)",
              }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.p
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-white/90 text-lg font-medium drop-shadow-md"
        >
          Preparing your spiritual journey...
        </motion.p>
      </motion.div>

      {/* Islamic Greeting */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <p className="text-white font-arabic text-2xl font-bold drop-shadow-lg mb-3">
          السلام عليكم ورحمة الله وبركاته
        </p>
        <p className="text-white/90 text-base font-medium drop-shadow-sm">
          Assalamu Alaikum wa Rahmatullahi wa Barakatuh
        </p>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, -120],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
