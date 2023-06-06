"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PregameModal = ({
  nameGame,
  Howplayed,
  photoURL,
  visibleModal,
  setVisibleModal
}) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {visibleModal && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`bg-_bg_dark fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300`}>
            <div className="flex w-1/2 flex-col items-center">
              <Image
                width={80}
                height={80}
                src={photoURL}
                alt={nameGame}
              />
              <h3 className="text-_red my-1 text-xl font-bold tracking-tighter">
                {nameGame}
              </h3>
              <p className="my-1 text-center text-xs leading-tight tracking-tighter text-white md:text-base">
                {Howplayed}
              </p>
              <button
                className="mt-5 rounded-full bg-black px-8 py-2 text-sm font-bold text-white"
                onClick={() => setVisibleModal(false)}>
                Already!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PregameModal;
