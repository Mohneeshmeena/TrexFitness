import React, { useState, useEffect } from 'react';

/**
 * AnimatedExerciseImage Component
 * Demonstrates exact exercise biomechanics with an active 2-frame animation loop (0.9s cadence).
 * Alternates seamlessly between Starting Position (eccentric stretch) and Peak Contraction (concentric).
 * Gracefully falls back to high-res fitness photography if images are loading.
 */
export default function AnimatedExerciseImage({ 
  frames = [], 
  fallback = '', 
  alt = '', 
  className = '',
  badge = 'ANIMATED FORM'
}) {
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);
  const [imgError, setImgError] = useState(false);
  const validFrames = Array.isArray(frames) ? frames.filter(Boolean) : [];

  useEffect(() => {
    if (validFrames.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentFrameIdx((prev) => (prev + 1) % validFrames.length);
    }, 900); // 900ms rep tempo cadence
    return () => clearInterval(interval);
  }, [validFrames.length]);

  const activeSrc = !imgError && validFrames.length > 0 
    ? validFrames[currentFrameIdx] 
    : fallback;

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      <img
        src={activeSrc}
        alt={alt}
        className="w-full h-full object-cover transition-opacity duration-300"
        loading="lazy"
        onError={() => setImgError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-85 pointer-events-none" />

      {/* Live Animated Badge */}
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600/90 text-white backdrop-blur shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span>{badge}</span>
        </span>
        {validFrames.length > 1 && (
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-950/70 text-slate-200 border border-white/10 backdrop-blur">
            {currentFrameIdx === 0 ? 'START FORM' : 'PEAK REP'}
          </span>
        )}
      </div>
    </div>
  );
}
