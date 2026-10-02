import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for trailing ring
  const springConfig = { damping: 24, stiffness: 220, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples(prev => [...prev.slice(-4), newRipple]); // keep max 5
      setTimeout(() => setIsClicked(false), 250);
    };

    // Magnetic snapping & hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('a, button, [role="button"], input, textarea, select, .magnetic-target')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-cyan-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicked ? 0.6 : isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Trailing Physics Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-accent/60 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
          borderColor: isHovered ? '#00FF99' : 'rgba(0, 240, 255, 0.5)',
          boxShadow: isHovered ? '0 0 16px rgba(0, 255, 153, 0.4)' : 'none',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      {/* Click Distortion Ripples */}
      {ripples.map(r => (
        <motion.div
          key={r.id}
          className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border border-cyan-accent/80 bg-cyan-accent/10"
          initial={{ x: r.x, y: r.y, translateX: '-50%', translateY: '-50%', width: 10, height: 10, opacity: 0.9 }}
          animate={{ width: 140, height: 140, opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          onAnimationComplete={() => {
            setRipples(prev => prev.filter(item => item.id !== r.id));
          }}
        />
      ))}
    </>
  );
};
