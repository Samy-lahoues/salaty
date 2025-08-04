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
