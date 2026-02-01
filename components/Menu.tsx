
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../types';

interface MenuProps {
  onClose: () => void;
  onSelect: (section: Section) => void;
  currentSection: Section;
}

const Menu: React.FC<MenuProps> = ({ onClose, onSelect, currentSection }) => {
  const sections = Object.values(Section);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'spring', damping: 12, stiffness: 100 } },
    exit: { y: -50, opacity: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 bg-white z-40 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col gap-4 md:gap-8 items-center">
        {sections.map((section, idx) => (
          <motion.button
            key={section}
            variants={itemVariants}
            onClick={() => onSelect(section)}
            className={`text-6xl md:text-9xl font-bold tracking-tighter uppercase transition-colors relative group ${
              currentSection === section ? 'text-black' : 'text-gray-200 hover:text-black'
            }`}
          >
            <span className="relative z-10">{section}</span>
            {currentSection === section && (
              <motion.span 
                layoutId="menu-active"
                className="absolute left-[-2rem] top-1/2 -translate-y-1/2 text-2xl"
              >
                ●
              </motion.span>
            )}
            <span className="absolute bottom-0 left-0 w-0 h-2 bg-black transition-all group-hover:w-full" />
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        variants={itemVariants}
        className="absolute bottom-12 flex gap-12 text-sm uppercase tracking-widest font-semibold"
      >
        <a href="#" className="hover:line-through">Instagram</a>
        <a href="#" className="hover:line-through">Twitter</a>
        <a href="#" className="hover:line-through">Behance</a>
      </motion.div>
    </motion.div>
  );
};

export default Menu;
