import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('CALIBRATING GRAVITATIONAL FIELD...');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFinished(true), 300);
          setTimeout(onComplete, 800);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 14) + 4;
        if (next > 35 && next < 65) {
          setStatusText('SYNCING IST TELEMETRY NODES...');
        } else if (next >= 65 && next < 90) {
          setStatusText('INITIALIZING ORBITAL VECTOR SHADERS...');
        } else if (next >= 90) {
          setStatusText('MISSION CONTROL READY');
        }
        return next > 100 ? 100 : next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-space-950 flex flex-col items-center justify-center px-6"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Central Telemetry Hex Ring */}
          <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-accent/30 border-t-cyan-accent"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-lime-accent/30 border-b-lime-accent"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
            />
            <span className="font-mono text-2xl font-bold text-cyan-accent tracking-tighter">
              {progress}%
            </span>
          </div>

          {/* System Terminal Log Text */}
          <div className="text-center font-mono space-y-2">
            <p className="text-xs uppercase tracking-widest text-cyan-accent/80 font-medium">
              [ SYSTEM INITIALIZATION ]
            </p>
            <p className="text-sm text-space-text tracking-wide font-mono h-6">
              {statusText}
            </p>
          </div>

          {/* Loading Progress Bar */}
          <div className="w-64 h-1 bg-space-800 rounded-full overflow-hidden mt-6 relative border border-space-border">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-accent via-lime-accent to-amber-solar"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <div className="mt-8 text-[11px] font-mono text-space-muted tracking-widest uppercase">
            Institute of Space Technology • Islamabad
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
