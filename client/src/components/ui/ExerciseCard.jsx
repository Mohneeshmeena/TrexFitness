import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ExerciseCard({ exercise, index = 0 }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { playClick } = useSound();

  const imgSrc = exercise.gifUrl || exercise.imageUrl;

  const handleToggleInstructions = () => {
    playClick();
    setShowInstructions((v) => !v);
  };

  const handleToggleTips = () => {
    playClick();
    setShowTips((v) => !v);
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.07 }}
      className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
    >
      <div>
        {/* Image / Placeholder */}
        <div className="relative w-full h-48 overflow-hidden rounded-2xl mb-4 bg-slate-100 border border-slate-200">
          {imgSrc && !imgError ? (
            <img
              src={imgSrc}
              alt={exercise.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-500">
              <span className="text-3xl mb-1">🏋️</span>
              <span className="text-xs font-bold text-slate-700">{exercise.name}</span>
            </div>
          )}
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
            Drill #{index + 1}
          </div>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-black text-slate-900">{exercise.name}</h3>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          {exercise.reps && (
            <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-red-50 text-red-600 border border-red-200">
              {exercise.reps}
            </span>
          )}
          {exercise.sets && (
            <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {exercise.sets} sets
            </span>
          )}
          {exercise.restTime && (
            <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {exercise.restTime}s rest
            </span>
          )}
        </div>

        {/* Target muscles */}
        {exercise.targetMuscles?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {exercise.targetMuscles.map((muscle) => (
              <span
                key={muscle}
                className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200"
              >
                {muscle}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-100">
        {/* Instructions accordion */}
        {exercise.instructions && (
          <div>
            <button
              onClick={handleToggleInstructions}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-600 hover:text-red-600 py-1 transition-colors"
            >
              <span>Execution Guide</span>
              {showInstructions ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {showInstructions && (
              <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200">
                {exercise.instructions}
              </p>
            )}
          </div>
        )}

        {/* Tips accordion */}
        {exercise.tips?.length > 0 && (
          <div>
            <button
              onClick={handleToggleTips}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-600 hover:text-red-600 py-1 transition-colors"
            >
              <span>Coaching Tips</span>
              {showTips ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {showTips && (
              <ul className="text-xs text-slate-600 space-y-1 mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200">
                {exercise.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-1.5 font-normal">
                    <span className="text-red-600 font-bold shrink-0">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
