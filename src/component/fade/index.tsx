import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  isActive: boolean;
  children: any;
}

const Fade: React.FC<Props> = ({ children, isActive }) => {
  return (
    isActive && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    )
  );
};

export default Fade;
