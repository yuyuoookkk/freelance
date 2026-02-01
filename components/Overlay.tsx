
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../types';

interface OverlayProps {
  currentSection: Section;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ currentSection, isMenuOpen, onMenuToggle }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-8 md:p-12">
      <div className="flex justify-between items-start pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          WOORK®
        </motion.div>

        <button 
          onClick={onMenuToggle}
          className="group relative flex flex-col items-end gap-1.5 focus:outline-none"
        >
          <motion.span 
            animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-8 h-0.5 bg-black block transition-transform origin-center"
          />
          <motion.span 
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-black block"
          />
          <motion.span 
            animate={isMenuOpen ? { rotate: -45, y: -8, width: 32 } : { rotate: 0, y: 0, width: 16 }}
            className="w-4 h-0.5 bg-black block transition-all origin-center"
          />
        </button>
      </div>

      <div className="flex justify-between items-end">
        <div className="hidden md:block">
          <motion.div 
            key={currentSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-widest font-medium"
          >
            Creative Direction / Digital Experience
          </motion.div>
        </div>
        
        <div className="pointer-events-auto flex gap-8 items-center">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
            Scroll to explore
          </div>
          <div className="w-12 h-px bg-black opacity-20" />
          <div className="text-xl font-mono tabular-nums">
            0{['Work', 'Shop', 'About', 'Contact'].indexOf(currentSection) + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
