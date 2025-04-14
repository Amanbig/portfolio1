"use client";

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { usePathname } from 'next/navigation';
import Stairs from './Stairs';

function StairEffect() {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
        <div className='h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-40 flex'>
          <Stairs />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default StairEffect;
