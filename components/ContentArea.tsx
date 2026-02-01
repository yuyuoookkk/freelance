
import React from 'react';
import { motion } from 'framer-motion';
import { Section, SECTION_CONFIGS } from '../types';

interface ContentAreaProps {
  section: Section;
}

const ContentArea: React.FC<ContentAreaProps> = ({ section }) => {
  const config = SECTION_CONFIGS[section];
  
  const contentMap: Record<Section, { title: string; subtitle: string; description: string }> = {
    [Section.WORK]: {
      title: "PHYS_WORK_SYS",
      subtitle: "B00-24 // LOG",
      description: "Architecture of digital systems. Focused on high-fidelity interaction and algorithmic aesthetics."
    },
    [Section.SHOP]: {
      title: "STORE_REPL",
      subtitle: "OBJECTS // ASSETS",
      description: "Tangible manifestations of digital logic. High-frequency tools for the modern engineer."
    },
    [Section.ABOUT]: {
      title: "KERNEL_ETHOS",
      subtitle: "CORE // STACK",
      description: "We navigate the intersection of human gravity and silicon logic. Multidisciplinary by design."
    },
    [Section.CONTACT]: {
      title: "UPLINK_REQ",
      subtitle: "CONNECT // STREAM",
      description: "Initializing new protocols for collaboration. Open channels for Q4 2025."
    }
  };

  const { title, subtitle, description } = contentMap[section];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col justify-center px-8 md:px-24 max-w-7xl pointer-events-none"
    >
      <div className="relative z-10">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[10px] md:text-xs tracking-[0.4em] mb-4 flex items-center gap-4"
          style={{ color: config.accent }}
        >
          <span className="w-8 h-[1px] bg-current opacity-50" />
          {subtitle}
        </motion.div>

        <h1 className="text-5xl md:text-[10rem] font-bold tracking-tighter uppercase leading-[0.8] mb-8 text-white mix-blend-difference">
          {title.split('').map((char, i) => (
            <motion