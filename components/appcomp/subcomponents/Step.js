import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Step = props => {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const { steps, setStart, delay } = props;

  const handleNext = () => {
    if (step >= steps.length - 1) return;
    setStep(step + 1);
  };
  const handlePrev = () => {
    if (step <= 0) return;
    setStep(step - 1);
  };
  useEffect(() => {
    const timeRef = setTimeout(() => {
      setOpen(true);
    }, delay);

    return () => {
      clearTimeout(timeRef);
    };
  }, []);
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-gray-800/[0.95]">
            <div className="mx-4 flex h-[210px] max-w-[400px] flex-col justify-between rounded-md bg-white p-8 shadow-md">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-_dark text-base font-medium">
                {steps[step]}
              </motion.div>
              <div className="flex justify-between">
                <button
                  onClick={handlePrev}
                  className="rounded-full bg-gray-200 px-6 py-2 text-sm font-medium text-gray-500 transition-all duration-150 hover:bg-gray-300">
                  Back
                </button>
                {step === steps.length - 1 && (
                  <button
                    onClick={() => {
                      setStart();
                      setOpen(false);
                    }}
                    className="rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-blue-600">
                    Let&apos;s go
                  </button>
                )}
                {step < steps.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-blue-600">
                    Continue
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Step;
