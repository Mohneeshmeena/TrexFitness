import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  Flame, 
  TrendingUp, 
  Apple, 
  ArrowRight, 
  Zap, 
  Sparkles, 
  Activity,
  HeartPulse,
  ChevronRight,
  CheckCircle2,
  Trophy,
  ShieldCheck
} from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { muscleGroupMeta } from '../data/workoutData';

const quotes = [
  { text: "DISCIPLINE IS THE BRIDGE BETWEEN GOALS AND ACCOMPLISHMENT.", author: "Jim Rohn" },
  { text: "PUSH YOUR LIMITS TODAY. EXPAND YOUR CAPACITY TOMORROW.", author: "Apex Protocol" },
  { text: "THE PAIN OF DISCIPLINE IS FAR LESS THAN THE PAIN OF REGRET.", author: "Elite Mindset" },
  { text: "STRENGTH DOES NOT COME FROM WINNING. YOUR STRUGGLES DEVELOP IT.", author: "Arnold Schwarzenegger" }
];

const features = [
  {
    icon: Dumbbell,
    title: "28 Elite Workout Plans",
    desc: "Over 560+ step-by-step exercises spanning Home, Gym, Stretching, and Dumbbell routines.",
    badge: "560+ Exercises",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80"
  },
  {
    icon: Apple,
    title: "Precision Nutrition",
    desc: "Macro-calculated Vegetarian, Non-Vegetarian, and Anabolic Keto meal schedules.",
    badge: "3 Curated Regimens",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80"
  },
  {
    icon: TrendingUp,
    title: "Interactive Planner & Todo",
    desc: "Build custom workouts and dietary checklists with satisfying real-time sound audio feedback.",
    badge: "Custom Protocol",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80"
  },
  {
    icon: HeartPulse,
    title: "Science-Backed Health Tips",
    desc: "24 peer-reviewed strategies covering deep sleep, hypertrophy, and rapid recovery.",
    badge: "Hypertrophy Science",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=80"
  }
];

export default function Home() {
  const { playClick, playSuccess } = useSound();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* ─── Hero Section (Clean White with Red Accents & Hero Visual) ─── */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-14 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs sm:text-sm font-bold text-red-600 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-red-600 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Ready to transform Yourself,to Next Level.</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] text-slate-900"
              >
                FORGE YOUR <span className="text-red-600">TREX PHYSIQUE</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-slate-600 text-base sm:text-xl font-normal leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Master Your Fitness,Will power and true Strength With Variety of Deits,Workouts plans.We have Separate Plans for Gym workouts , Home workouts and yoga lovers to give you wide range of experiences. 
              </motion.p>

              {/* Dynamic Quote Box */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm max-w-xl mx-auto lg:mx-0"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={quoteIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-1"
                  >
                    <p className="text-sm sm:text-base font-semibold text-slate-800 italic">
                      "{quotes[quoteIndex].text}"
                    </p>
                    <p className="text-xs text-red-600 font-black tracking-wider uppercase">
                      — {quotes[quoteIndex].author}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Action CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <Link
                  to="/workouts"
                  onClick={playClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-brand px-8 py-3.5 text-base shadow-brand"
                >
                  <Dumbbell className="w-5 h-5" />
                  <span>7 Different Mucles Workout PLans/Days,Tap to Explore.</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/planner"
                  onClick={playClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white px-7 py-3.5 rounded-xl font-bold text-slate-800 border border-slate-300 hover:border-red-500 hover:bg-slate-50 transition-all duration-200 shadow-sm"
                >
                  <Zap className="w-5 h-5 text-red-600" />
                  <span>You can create Your own Plan Also.Be your coach.</span>
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Hero Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/5] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&auto=format&fit=crop&q=80"
                  alt="Elite Athlete Training"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                {/* Floating pill badge on hero image */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">Unleash the True Strength.</p>
                      <p className="text-xs text-slate-500 font-medium">Day one is,Not one day.</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                    Feel Energy.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Quick Stats Summary Bar ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Target Muscle Groups", val: "7 Core", icon: Activity, color: "text-red-600 bg-red-50" },
            { label: "Execution Categories", val: "4 Modalities", icon: Dumbbell, color: "text-red-600 bg-red-50" },
            { label: "Total Exercise Library", val: "560+ Moves", icon: Flame, color: "text-red-600 bg-red-50" },
            { label: "Macro Diet Plans", val: "3 Blueprints", icon: Apple, color: "text-red-600 bg-red-50" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"
            >
              <div className={`p-3 rounded-xl border border-red-100 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">{stat.val}</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Muscle Group Hub with Real Section Photography (7 Core Categories) ─── */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-red-600 font-bold tracking-widest uppercase mb-1">
              <Zap className="w-3.5 h-3.5 fill-current" /> Welcome to Playground.
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              7 Days,7 Muscles
            </h2>
          </div>
          <Link
            to="/workouts"
            onClick={playClick}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-700"
          >
            <span>View All Protocols</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {muscleGroupMeta.map((mg, idx) => (
            <motion.div
              key={mg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                to={`/workouts/${mg.id}`}
                onClick={playClick}
                className="group block bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-red-400 transition-all duration-300 hover:-translate-y-1 shadow-card hover:shadow-card-hover"
              >
                {/* Real Muscle Photo Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={mg.image}
                    alt={mg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 text-2xl drop-shadow-md">
                    {mg.emoji}
                  </span>

                  <span className="absolute top-3 right-3 text-[11px] font-black tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-red-600 shadow-sm">
                    4 Regimes
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-black tracking-wide">
                      {mg.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <p className="text-xs text-slate-600 line-clamp-2 font-normal">
                    {mg.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-slate-500">
                    <span>Home • Gym • Dumbbells</span>
                    <span className="text-red-600 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* 8th card - Explore All Master Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            <Link
              to="/workouts"
              onClick={playSuccess}
              className="group block h-full bg-red-600 rounded-3xl p-6 text-white transition-all duration-300 hover:bg-red-700 shadow-brand flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">⚡</span>
                <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                  All Hubs
                </span>
              </div>
              <div className="my-6">
                <h3 className="text-2xl font-black">Full Workout Matrix</h3>
                <p className="text-xs text-red-100 mt-2 font-normal leading-relaxed">
                  Every category includes 20+ detailed exercise form cards with interval rest timers.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-black text-white">
                <span>Enter Training Arena</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Nutrition Quick Access (Clean White Card with Real Food Photos) ─── */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-200 inline-block">
                NUTRITION PROTOCOL
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Diet Plans Designed For Muscle Growth
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Choose between High-Protein Vegetarian Bulking, Lean Non-Veg Shredding, or Anabolic Keto Carb-Cycling with calculated macro allocations.
              </p>
              <div className="space-y-2.5 pt-2">
                {[
                  "Calculated Protein, Carbs & Fat Targets",
                  "Timed Daily Meal Timelines with Cooking Guides",
                  "Science-Validated Nutrient Timing Strategies"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Link
                  to="/diet"
                  onClick={playClick}
                  className="inline-flex items-center gap-2 btn-brand text-sm shadow-brand"
                >
                  <Apple className="w-4 h-4" />
                  <span>EXPLORE DIETARY PLANS</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { 
                  title: "Veg Plan", 
                  cal: "2,750 kcal", 
                  protein: "175g Protein", 
                  badge: "Plant Power", 
                  link: "/diet", 
                  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80" 
                },
                { 
                  title: "Non-Veg", 
                  cal: "2,250 kcal", 
                  protein: "215g Protein", 
                  badge: "Lean Shred", 
                  link: "/diet", 
                  image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80" 
                },
                { 
                  title: "Creative", 
                  cal: "2,100 kcal", 
                  protein: "155g Protein", 
                  badge: "Keto Matrix", 
                  link: "/diet", 
                  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80" 
                },
              ].map((diet, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-red-400 transition-all shadow-sm flex flex-col justify-between">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                    <img 
                      src={diet.image} 
                      alt={diet.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <span className="absolute top-2 right-2 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-slate-900">
                      {diet.badge}
                    </span>
                    <span className="absolute bottom-2 left-2 text-white font-black text-sm">
                      {diet.title}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xl font-black text-red-600">{diet.cal}</p>
                    <p className="text-xs text-slate-600 font-bold mt-0.5">{diet.protein}</p>
                    <Link
                      to={diet.link}
                      onClick={playClick}
                      className="mt-4 text-xs font-bold text-slate-700 hover:text-red-600 flex items-center justify-between pt-2 border-t border-slate-200"
                    >
                      <span>Inspect Meal Schedule</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── Core Architecture Features with Relevant Section Visuals ─── */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
            ARTITECHED WITHOUT COMPROMISE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
            Elite-Level Athletic Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-red-400 transition-all duration-300 hover:-translate-y-1 shadow-card hover:shadow-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 p-2 rounded-xl bg-white text-red-600 shadow-sm">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <span className="absolute top-2 right-2 text-[10px] font-bold text-slate-800 bg-white/95 px-2 py-0.5 rounded-full">
                    {f.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-black text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {f.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
