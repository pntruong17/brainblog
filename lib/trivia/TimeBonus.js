'use client'
import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TimeBonus = ({ visible, setVisible, timeBonus, correct }) => {
  const tick = useRef();
  useEffect(() => {
    if (timeBonus === 0) return;
    setVisible(true);
    tick.current = setTimeout(() => {
      setVisible(false);
    }, 1000);
    return () => clearTimeout(tick.current);
  }, [correct]);
  return (
    <>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 1.5, type: "spring" }}
            key={correct}
            className="text-_w_almost absolute right-2 top-[-20px] font-bold">
            +{timeBonus}
          </motion.h3>
        )}
      </AnimatePresence>
    </>
  );
};

export default TimeBonus;
