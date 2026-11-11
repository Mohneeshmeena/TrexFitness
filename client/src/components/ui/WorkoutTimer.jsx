import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, CheckCircle, X, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

export default function WorkoutTimer({ 
  totalTime = 45, 
  restTime = 20, 
  onComplete,
  onClose,
  exercises = [],
  initialIndex = 0
}) {
  const [currentIdx, setCurrentIdx] = useState(initialIndex);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isResting, setIsResting] = useState(false);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);
  const { playBeep, playSuccess, playClick } = useSound();

  const currentEx = exercises[currentIdx] || null;

  const currentTotal = isResting ? restTime : totalTime;
  const progress = timeLeft / currentTotal;

  const tick = useCallback(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(intervalRef.current);
        setRunning(false);
        if (isResting) {
          // Rest finished: advance to next exercise if available
          setIsResting(false);
          setTimeLeft(totalTime);
          if (exercises.length > 0 && currentIdx < exercises.length - 1) {
            setCurrentIdx((c) => c + 1);
          }
        } else {
          // Work finished: switch to rest or complete
          if (restTime > 0) {
            setIsResting(true);
            setTimeLeft(restTime);
            playSuccess();
          } else {
            setFinished(true);
            playSuccess();
            onComplete?.();
          }
        }
        return 0;
      }
      // Beep on last 3 seconds
      if (prev <= 4 && prev > 1) {
        playBeep(prev <= 2 ? 1200 : 880);
      }
      return prev - 1;
    });
  }, [isResting, totalTime, restTime, playBeep, playSuccess, onComplete, exercises.length, currentIdx]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, tick]);

  useEffect(() => {
    if (isResting) {
      setRunning(true);
    }
  }, [isResting]);

  const handleStart = () => {
    playClick();
    if (finished) return;
    setRunning((v) => !v);
  };

  const handleReset = () => {
    playClick();
    clearInterval(intervalRef.current);
    setRunning(false);
    setFinished(false);
    setIsResting(false);
    setTimeLeft(totalTime);
  };

  const handleComplete = () => {
    clearInterval(intervalRef.current);
    setFinished(true);
    playSuccess();
    onComplete?.();
  };

  const handleNext = () => {
    playClick();
    if (currentIdx < exercises.length - 1) {
      setCurrentIdx((c) => c + 1);
      setIsResting(false);
      setTimeLeft(totalTime);
      setRunning(false);
    }
  };

  const handlePrev = () => {
    playClick();
    if (currentIdx > 0) {
      setCurrentIdx((c) => c - 1);
      setIsResting(false);
      setTimeLeft(totalTime);
      setRunning(false);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const color = finished ? '#16a34a' : isResting ? '#3b82f6' : '#dc2626';
  const circumference = 2 * Math.PI * 54;
  const strokeDash = circumference * (1 - progress);

  const content = (
    <div className="flex flex-col items-center gap-5 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 w-full max-w-md mx-auto shadow-2xl relative">
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X size={20} />
        </button>
      )}

      {/* Drill Header if exercise exists */}
      {currentEx ? (
        <div className="text-center w-full px-4 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Drill {currentIdx + 1} of {exercises.length}
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-2 truncate">
            {currentEx.name}
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            Target: <span className="text-red-600">{currentEx.reps}</span>
          </p>
        </div>
      ) : null}

      <div className="text-xs font-black tracking-widest uppercase flex items-center gap-1.5" style={{ color }}>
        <Zap className="w-4 h-4 fill-current" />
        <span>{finished ? 'Completed!' : isResting ? 'Recovery Interval' : 'High Output Interval'}</span>
      </div>

      {/* Circular progress */}
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#f1f5f9" strokeWidth="8" />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDash}
            transition={{ duration: 0.5 }}
            style={{ filter: `drop-shadow(0 2px 8px ${color}30)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-slate-900 tabular-nums tracking-tight">{displayTime}</span>
          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 mt-1">
            {isResting ? 'Deep Breaths' : 'Maximum Effort'}
          </span>
        </div>
      </div>

      {/* Exercise Navigation if multiple exercises */}
      {exercises.length > 1 && (
        <div className="flex items-center justify-between w-full px-2 text-xs font-bold text-slate-500">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="flex items-center gap-1 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft size={16} /> Prev Drill
          </button>
          <span>{currentIdx + 1} / {exercises.length}</span>
          <button
            onClick={handleNext}
            disabled={currentIdx === exercises.length - 1}
            className="flex items-center gap-1 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            Next Drill <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleReset}
          className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all border border-slate-200"
          title="Reset Interval"
        >
          <RotateCcw size={18} />
        </button>

        <button
          onClick={handleStart}
          disabled={finished}
          className="px-8 py-3 rounded-xl font-black text-base flex items-center gap-2 transition-all duration-200 text-white shadow-sm"
          style={{
            background: finished ? '#94a3b8' : running ? '#475569' : color,
          }}
        >
          {running ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current" />}
          <span>{running ? 'PAUSE' : 'ENGAGE'}</span>
        </button>

        <button
          onClick={handleComplete}
          disabled={finished}
          className="p-3 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 transition-all border border-green-200"
          title="Mark Completed"
        >
          <CheckCircle size={18} />
        </button>
      </div>
    </div>
  );

  if (onClose) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-fade-in">
        {content}
      </div>
    );
  }

  return content;
}
