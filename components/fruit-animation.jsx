"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const fruits = [
  { name: "apple", color: "#ff0000", rotation: 360 },
  { name: "banana", color: "#ffd700", rotation: -360 },
  { name: "orange", color: "#ffa500", rotation: 360 },
  { name: "grape", color: "#800080", rotation: -360 },
];

export default function FruitAnimation() {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div className="relative h-64 w-full overflow-hidden p-4">
      {fruits.map((fruit, index) => (
        <motion.div
          key={fruit.name}
          className="absolute"
          style={{
            left: `${index * 25 + 10}%`,
            top: "50%",
            width: "60px",
            height: "60px",
            backgroundColor: fruit.color,
            borderRadius: "50%",
          }}
          initial={{
            y: 0,
            rotate: 0,
            scale: 1,
          }}
          animate={
            isAnimating
              ? {
                  y: [0, -100, 0],
                  rotate: [0, fruit.rotation],
                  scale: [1, 1.2, 1],
                }
              : {
                  y: 0,
                  rotate: 0,
                  scale: 1,
                }
          }
          transition={{
            duration: 2,
            repeat: isAnimating ? Infinity : 0,
            repeatType: "reverse",
            delay: index * 0.3,
            ease: "linear", // Linear easing for frame-like abruptness
          }}
          whileHover={{ scale: 1.5 }}
          drag
          dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50,
          }}
        >
          <motion.div
            className="h-3 w-8 absolute -top-2 left-1/2 -translate-x-1/2"
            style={{
              backgroundColor: "#2d5a27",
              borderRadius: "3px",
            }}
          />
        </motion.div>
      ))}
      <button
        onClick={() => setIsAnimating(!isAnimating)}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 shadow-lg hover:bg-gray-100 text-black"
      >
        {isAnimating ? "Pause" : "Play"} Animation
      </button>
    </div>
  );
}
