
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundCanvas from './components/BackgroundCanvas';
import Overlay from './components/Overlay';
import Menu from './components/Menu';
import ContentArea from './components/ContentArea';
import { Section, SECTION_CONFIGS } from './types';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.WORK);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const sections = [Section.WORK, Section.SHOP, Section.ABOUT, Section.CONTACT];

  const navigateTo = (direction: 'next' | 'prev') => {
    const currentIndex = sections.indexOf(currentSection);
    let nextIndex = currentIndex;
    
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % sections.length;
    } else {
      nextIndex = (currentIndex - 1 + sections.length) % sections.length;
    }
    
    setCurrentSection(sections[nextIndex]);
  };

  const handleWheel = (e: WheelEvent) => {
    if (isMenuOpen) return;
    if (Math.abs(e.deltaY) > 50) {
      navigateTo(e.deltaY > 0 ? 'next' : 'prev');
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      navigateTo(diff > 0 ? 'next' : 'prev');
    }
    setTouchStart(null);
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, isMenuOpen, touchStart]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white select-none">
      <BackgroundCanvas config={SECTION_CONFIGS[currentSection]} />
      
      <Overlay 
        currentSection={currentSection} 
        isMenuOpen={isMenuOpen} 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} 
      />

      <AnimatePresence mode="wait">
        {!isMenuOpen && (
          <ContentArea key={currentSection} section={currentSection} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <Menu 
            onClose={() => setIsMenuOpen(false)} 
            onSelect={(section) => {
              setCurrentSection(section);
              setIsMenuOpen(false);
            }}
            currentSection={currentSection}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
