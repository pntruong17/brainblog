import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

const CheckAndXMark = ({ signal, checkChange }) => {
  const tick = useRef();
  const icon = {
    hidden: {
      pathLength: 0
      //fill: "rgba(255, 255, 255, 0)",
    },
    visible: {
      pathLength: 1
      //fill: "rgba(255, 255, 255, 1)",
    }
  };

  const [visible, setVisible] = useState(null);

  useEffect(() => {
    setVisible(true);
    tick.current = setTimeout(() => {
      setVisible(false);
    }, 200);
    return () => clearTimeout(tick.current);
  }, [checkChange]);

  return (
    <>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={signal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}>
            <motion.div className="h-20 w-20">
              {signal === 1 && (
                <svg
                  className={`text-6xl text-green-500`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor">
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  />
                </svg>
              )}
              {signal === 0 && (
                <svg
                  className={`text-6xl text-red-500`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor">
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  />
                </svg>
              )}
              {signal === -1 && ""}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CheckAndXMark;
