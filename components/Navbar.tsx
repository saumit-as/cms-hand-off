"use client";
import { Logo } from "./Logo";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Navigation } from "./Navigation";
import { useState } from "react";
export const Navbar = () => {
  const [isTop, setIsTop] = useState(false);
  const { scrollY } = useScroll();
  const navAnimations = {
    dropShadow: {
      filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
    },
    noDropShadow: {
      filter: "drop-shadow(0px 5px 10px rgba(0,0,0,0.2))",
    },
  };

  useMotionValueEvent(scrollY, "change", (y) => {
    setIsTop(y < 10);
  });

  return (
    <div className="fixed flex justify-center w-full z-10">
      <motion.div
        style={{ width: "100%" }}
        animate={isTop ? "dropShadow" : "noDropShadow"}
        variants={navAnimations}
      >
        <div className="flex justify-between w-full items-center  md:px-10 px-4 md:h-20 h-16 bg-white">
          <Logo showText />
          <Navigation />
        </div>
      </motion.div>
    </div>
  );
};
