import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  Flame, 
  Clock, 
  Play, 
  Activity, 
  Target, 
  Timer as TimerIcon,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { workoutsApi } from '../lib/api';
import { muscleGroupMeta, categoryMeta, exerciseFallbackData } from '../data/workoutData';
import WorkoutTimerModal from '../components/ui/WorkoutTimer';
import AnimatedExerciseImage from '../components/ui/AnimatedExerciseImage';

export default function WorkoutsPage() {
  const { muscleGroup: paramMuscle } = useParams();
  const navigate = useNavigate();
  const { playClick, playSuccess, playBeep } = useSound();

  const [activeMuscle, setActiveMuscle] = useState(paramMuscle || 'abs');
  const [activeCategory, setActiveCategory] = useState('home');
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);
  const [activeExerciseIdx, setActiveExerciseIdx] = useState(0);

  // Sync param changes
  useEffect(() => {
    if (paramMuscle && paramMuscle !== activeMuscle) {
      setActiveMuscle(paramMuscle);
    }
  }, [paramMuscle]);

  // Fetch workout or fallback
  useEffect(() => {
    let isMounted = true;
    async function loadWorkoutData() {
      setLoading(true);
      try {
        const res = await workoutsApi.getAll({ muscleGroup: activeMuscle, category: activeCategory });
        if (isMounted) {
          if (res.data && res.data.length > 0) {
            setWorkout(res.data[0]);
          } else {
            setWorkout(exerciseFallbackData[activeMuscle]?.[activeCategory] || null);
          }
        }
      } catch (err) {
        if (isMounted) {
          setWorkout(exerciseFallbackData[activeMuscle]?.[activeCategory] || null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadWorkoutData();
    return () => { isMounted = false; };
  }, [activeMuscle, activeCategory]);

  const currentMuscleInfo = muscleGroupMeta.find(m => m.id === activeMuscle) || muscleGroupMeta[0];

  const handleMuscleChange = (id) => {
    playClick();
    setActiveMuscle(id);
    navigate(`/workouts/${id}`, { replace: true });
  };

  const handleCategoryChange = (id) => {
    playClick();
    setActiveCategory(id);
  };

  const exercises = workout?.exercises || [];

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4">
      {/* ─── Hero Section with Real Muscle Imagery ─────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-red-50 text-red-600 border border-red-200 mb-3">
                <Activity className="w-3.5 h-3.5" />
                <span>7 TARGET REGIONS • 4 REGIMES • 20+ EXERCISES EACH</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <span>{currentMuscleInfo.emoji}</span>
                <span className="uppercase">{currentMuscleInfo.name}</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl font-normal leading-relaxed">
                {currentMuscleInfo.description} — Master complete anatomical definition, explosive power, and injury-resistant joints with full biomechanic cues.
              </p>
            </div>

            {/* Quick Start Timer CTA */}
            <div className="pt-6 flex items-center gap-4">
              <button
                onClick={() => {
                  playSuccess();
                  setTimerOpen(true);
                }}
                className="btn-brand inline-flex items-center gap-2 text-sm px-6 py-3 shadow-brand"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Lets Start,Just Smash it.</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-[280px] bg-slate-100">
            <img
              src={currentMuscleInfo.image}
              alt={currentMuscleInfo.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs font-bold uppercase tracking-widest bg-red-600 px-2.5 py-0.5 rounded">
                Active Focal Muscle
              </span>
              <p className="text-lg font-black mt-1">{currentMuscleInfo.name}</p>
            </div>
          </div>

        </div>

        {/* ─── Muscle Selector Horizontal Strip ─────────────────────── */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-red-600" /> SELECT TARGET MUSCLE GROUP
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {muscleGroupMeta.map((mg) => {
              const active = mg.id === activeMuscle;
              return (
                <button
                  key={mg.id}
                  onClick={() => handleMuscleChange(mg.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                    active 
                      ? 'bg-red-600 text-white shadow-brand' 
                      : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span>{mg.emoji}</span>
                  <span>{mg.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── 4 Category Tabs with Relevant Category Photos ─────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categoryMeta.map((cat) => {
          const isSelected = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`rounded-2xl overflow-hidden text-left transition-all duration-200 border relative ${
                isSelected 
                  ? 'border-red-600 bg-red-50/50 shadow-md ring-2 ring-red-600' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img 
                  src={cat.image} 
                  alt={cat.label} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/40" />
                <span className="absolute top-2 left-2 text-xl drop-shadow">
                  {cat.icon}
                </span>
                {isSelected && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-black uppercase bg-red-600 text-white">
                    Active
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className={`font-black text-sm sm:text-base ${isSelected ? 'text-red-600' : 'text-slate-900'}`}>
                  {cat.label}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 font-normal">
                  {cat.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ─── Workout Summary Info Bar ────────────────────────────── */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Total Drills</p>
              <p className="text-base sm:text-lg font-black text-slate-900">{exercises.length} Exercises</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Estimated Duration</p>
              <p className="text-base sm:text-lg font-black text-slate-900">{workout?.duration || 45} Minutes</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Calorie Output</p>
              <p className="text-base sm:text-lg font-black text-slate-900">{workout?.caloriesBurn || 350} kcal</p>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Difficulty: <span className="text-red-600 font-bold uppercase">{workout?.difficulty || 'Intermediate'}</span>
        </div>
      </div>

      {/* ─── Exercise List (20+ Exercises with Relevant Photography) ─── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>EXERCISES</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 font-black">
              {exercises.length} Detailed Drills
            </span>
          </h2>
          <span className="text-xs text-slate-500 hidden sm:inline-block">Click "Time This Drill" to launch rest timer</span>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4" />
            <p className="text-slate-500 text-sm font-medium">Assembling precision biomechanics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {exercises.map((ex, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.4) }}
                className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-red-400 transition-all duration-200 shadow-card hover:shadow-card-hover flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Number & Badges */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-xs font-black text-red-600">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-red-600 transition-colors">
                          {ex.name}
                        </h3>
                        <p className="text-xs font-bold text-red-600">
                          {ex.reps} • {ex.sets || 3} Sets • {ex.duration || '45 sec'}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                      Rest: {ex.restTime || 60}s
                    </span>
                  </div>

                  {/* Visual Image - Active 2-Frame Rep-by-Rep Biomechanical Animation */}
                  <div className="relative rounded-2xl overflow-hidden mb-3 aspect-video bg-slate-900 border border-slate-200 group-hover:border-red-300 transition-colors">
                    <AnimatedExerciseImage
                      frames={ex.frames || (ex.imageUrl ? [ex.imageUrl] : [])}
                      fallback={ex.staticFallback || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80'}
                      alt={ex.name}
                      className="w-full h-full"
                    />

                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white pointer-events-none z-10">
                      <span className="font-semibold bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur">
                        Form Guidance
                      </span>
                      <span className="text-red-400 font-bold uppercase">
                        {activeCategory}
                      </span>
                    </div>
                  </div>

                  {/* Form Instructions */}
                  <div className="space-y-2 mb-3">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {ex.instructions}
                    </p>

                    {/* Target Muscles */}
                    {ex.targetMuscles && ex.targetMuscles.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {ex.targetMuscles.map((tm, tIdx) => (
                          <span 
                            key={tIdx}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            🎯 {tm}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Form Tips */}
                    {ex.tips && ex.tips.length > 0 && (
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-2 space-y-1">
                        <p className="text-[10px] font-black text-red-600 uppercase tracking-wider">
                          Key Form Cues:
                        </p>
                        {ex.tips.slice(0, 2).map((tip, tipIdx) => (
                          <p key={tipIdx} className="text-xs text-slate-700 flex items-start gap-1.5">
                            <span className="text-red-600 font-bold">✓</span>
                            <span>{tip}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Drill #{idx + 1}</span>
                  <button
                    onClick={() => {
                      playBeep();
                      setActiveExerciseIdx(idx);
                      setTimerOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-white px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-600 transition-all border border-red-200 hover:border-red-600"
                  >
                    <TimerIcon className="w-3.5 h-3.5" />
                    <span>Time This Drill</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ─── Workout Timer Modal ──────────────────────────────────── */}
      {timerOpen && (
        <WorkoutTimerModal 
          exercises={exercises}
          initialIndex={activeExerciseIdx}
          onClose={() => setTimerOpen(false)}
        />
      )}
    </div>
  );
}
