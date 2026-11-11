import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Moon, Droplets, Shield, Zap, Activity, RefreshCw,
  ChevronRight, Dna, Brain, FlameKindling, Timer, Dumbbell, HeartPulse, CheckCircle2
} from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES = ['All', 'Recovery', 'Sleep', 'Hydration', 'Injury Prevention', 'Hypertrophy'];

const CATEGORY_IMAGES = {
  Recovery: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
  Sleep: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
  Hydration: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&auto=format&fit=crop&q=80',
  'Injury Prevention': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
  Hypertrophy: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
};

const HEALTH_TIPS = [
  // ── RECOVERY ──────────────────────────────────────────────────────────────
  {
    id: 1, category: 'Recovery', icon: Activity,
    title: 'Active Recovery Protocol',
    body: 'Rest days with light movement (walk, swim, mobility flow) reduce DOMS by up to 40% and accelerate myofibrillar repair.',
    insight: 'Target: 2 active recovery days per week for optimal hormonal balance.',
  },
  {
    id: 2, category: 'Recovery', icon: RefreshCw,
    title: 'Cold Therapy & Contrast Showers',
    body: 'Cold exposure (2-3 min, 15°C) post-workout reduces inflammation markers and resets the central nervous system.',
    insight: 'Contrast therapy (hot/cold) improves peripheral blood circulation by 300%.',
  },
  {
    id: 3, category: 'Recovery', icon: Zap,
    title: 'Myofascial Foam Rolling',
    body: '60-90 seconds per muscle group pre/post workout. Focus on IT band, quads, lats, and calves.',
    insight: 'Research shows a 20% immediate increase in joint range of motion without strength loss.',
  },
  {
    id: 4, category: 'Recovery', icon: Moon,
    title: 'Deep Sleep Anabolism',
    body: 'Over 95% of natural human growth hormone (HGH) pulse release occurs during stage 3 and 4 deep non-REM sleep.',
    insight: 'Athletes sleeping 10h/night demonstrated 20% faster sprint times and 9% higher shooting accuracy.',
  },
  {
    id: 5, category: 'Recovery', icon: Timer,
    title: 'Strategic Deload Weeks',
    body: 'Every 4-6 weeks, reduce total working volume by 40-50%. Eliminates cumulative connective tissue fatigue.',
    insight: 'Athletes consistently break through long-standing strength plateaus following planned deloads.',
  },
  {
    id: 6, category: 'Recovery', icon: Dumbbell,
    title: 'Percussive Therapy Benefits',
    body: 'Percussive massage for 30-60 seconds increases micro-vascular blood flow and relaxes hypertonic muscle knots.',
    insight: 'Tissue perfusion increases by 70%. Use directly on worked muscle bellies post-training.',
  },

  // ── SLEEP ─────────────────────────────────────────────────────────────────
  {
    id: 7, category: 'Sleep', icon: Moon,
    title: 'Anabolic Sleep Window',
    body: '10:00 PM to 2:00 AM represents the highest natural testosterone and growth hormone circadian secretion window.',
    insight: 'Every hour of deep sleep achieved prior to midnight is twice as restorative for cellular repair.',
  },
  {
    id: 8, category: 'Sleep', icon: RefreshCw,
    title: 'Slow-Release Pre-Bed Protein',
    body: 'Consuming 30-40g of micellar casein or cottage cheese before sleep maintains positive nitrogen balance for 7-8 hours.',
    insight: 'Prevents nocturnal muscle catabolism during extended overnight fasting windows.',
  },
  {
    id: 9, category: 'Sleep', icon: Zap,
    title: 'Blue Light Suppression Protocol',
    body: 'Eliminate screens and high-lux artificial illumination 90 minutes before bed to allow natural melatonin synthesis.',
    insight: 'Blue light suppresses melatonin production by up to 50%, delaying REM onset by an average of 45 minutes.',
  },
  {
    id: 10, category: 'Sleep', icon: Activity,
    title: 'Thermal Bedroom Regulation',
    body: 'Keep bedroom temperature strictly between 65-68°F (18-20°C). Core temperature must drop to initiate deep sleep.',
    insight: 'A 2°F reduction in core temperature triggers the body’s natural somnogenic sleep switch.',
  },
  {
    id: 11, category: 'Sleep', icon: Timer,
    title: 'Circadian Consistency',
    body: 'Retiring and rising at the exact same hour daily (±30 minutes) locks in peripheral biological clock genes.',
    insight: 'Regularity synchronizes metabolic and cortisol rhythms within 14-21 days of strict adherence.',
  },
  {
    id: 12, category: 'Sleep', icon: Brain,
    title: 'Magnesium Glycinate Supplementation',
    body: '200-400mg of highly bioavailable magnesium glycinate 30 minutes before sleep activates GABAergic neurotransmitters.',
    insight: 'Clinical trials demonstrate a 56% improvement in subjective sleep quality and deeper slow-wave phases.',
  },

  // ── HYDRATION ─────────────────────────────────────────────────────────────
  {
    id: 13, category: 'Hydration', icon: Droplets,
    title: 'Performance Hydration Formula',
    body: 'Drink 500ml of fluid 2 hours before training, 200ml every 15 minutes during, and 150% of sweat loss afterward.',
    insight: 'A sweat loss equivalent to just 2% of body weight degrades isometric peak power output by 15%.',
  },
  {
    id: 14, category: 'Hydration', icon: Zap,
    title: 'Intra-Workout Electrolyte Balance',
    body: 'Water alone is insufficient during grueling sessions. Supplement sodium (500mg), potassium (200mg), and magnesium.',
    insight: 'Prevents exercise-induced hyponatremia and enhances cellular glucose transport via sodium-potassium pumps.',
  },
  {
    id: 15, category: 'Hydration', icon: Activity,
    title: 'Urine Color Telemetry',
    body: 'Monitor morning urine color: pale straw yellow indicates optimal cellular hydration; dark amber signals dehydration.',
    insight: 'Dark amber urine correlates with a 10-15% drop in central nervous system firing velocity.',
  },
  {
    id: 16, category: 'Hydration', icon: Dumbbell,
    title: 'Creatine Cell Volumization',
    body: 'Creatine monohydrate pulls water directly into the sarcoplasm of muscle fibers. Increase fluid intake by 500ml daily.',
    insight: 'Cellular swelling acts as an anabolic physical trigger for muscle protein synthesis signaling pathways.',
  },
  {
    id: 17, category: 'Hydration', icon: RefreshCw,
    title: 'Caffeine Timing Mechanics',
    body: 'Consume 200-300mg of caffeine 45 minutes prior to training. Moderate doses do not exert net dehydrating effects.',
    insight: 'Caffeine blocks adenosine receptors, lowering perceived exertion (RPE) by an average of 6%.',
  },
  {
    id: 18, category: 'Hydration', icon: Timer,
    title: 'Morning Rehydration Ritual',
    body: 'Drink 500ml of room-temperature water with a pinch of Celtic sea salt immediately upon waking.',
    insight: 'Reactivates digestive enzymes and restores intracellular blood volume after 8 hours of sleep dehydration.',
  },

  // ── INJURY PREVENTION ─────────────────────────────────────────────────────
  {
    id: 19, category: 'Injury Prevention', icon: Shield,
    title: 'Dynamic Warm-Up Science',
    body: '10-15 minutes of dynamic mobility elevates intramuscular temperature by 1-2°C and lubricates joint capsules.',
    insight: 'Static stretching prior to heavy loading reduces elastic explosive force output by up to 8%.',
  },
  {
    id: 20, category: 'Injury Prevention', icon: Timer,
    title: '10% Progressive Overload Ceiling',
    body: 'Never increase weekly training load or working volume by more than 10% in a single 7-day microcycle.',
    insight: '60% of all tendon and ligament overuse injuries stem from excessive volume spikes.',
  },
  {
    id: 21, category: 'Injury Prevention', icon: Brain,
    title: 'Pain vs. Discomfort Diagnostic',
    body: 'Distinguish muscular burn (lactic accumulation) from joint discomfort. Sharp, sudden, or unilateral pain = abort set.',
    insight: 'Pushing through tendon joint impingement transforms minor micro-tears into multi-month tendonosis.',
  },
  {
    id: 22, category: 'Injury Prevention', icon: Dumbbell,
    title: 'Rotator Cuff & Hip Prehab',
    body: 'Incorporate face pulls, band pull-aparts, external rotations, and monster walks into your weekly routine.',
    insight: 'Consistent prehab protocols mitigate up to 80% of common shoulder and knee patellar track dysfunctions.',
  },
  {
    id: 23, category: 'Injury Prevention', icon: Activity,
    title: 'Footwear & Kinetic Anchoring',
    body: 'Use flat-soled zero-drop shoes or Olympic lifting shoes with stable wooden/polymer heels for squatting and pulling.',
    insight: 'Compressible running shoes dissipate ground reaction force and cause inward knee valgus collapse.',
  },
  {
    id: 24, category: 'Injury Prevention', icon: RefreshCw,
    title: 'Post-Workout Glycogen Window',
    body: 'Consume 25-40g of rapid-absorbing protein combined with 40-75g of clean carbohydrates within 45 minutes of training.',
    insight: 'Drives insulin-mediated amino acid shuttling and halves cortisol-induced muscle protein breakdown.',
  },

  // ── HYPERTROPHY ───────────────────────────────────────────────────────────
  {
    id: 25, category: 'Hypertrophy', icon: Dumbbell,
    title: 'Rep Range Continuum Spectrum',
    body: 'Muscle growth occurs across 6 to 30 reps when sets are taken within 1-3 Reps in Reserve (RIR) from technical failure.',
    insight: 'Vary weekly volume across heavy strength (5-8), hypertrophy (8-12), and metabolic pump (15-20).',
  },
  {
    id: 26, category: 'Hypertrophy', icon: Activity,
    title: 'Volume Landmark Architecture',
    body: 'Minimum Effective Volume (MEV) is 10-12 weekly sets per muscle. Maximum Adaptive Volume (MAV) is 18-22 sets.',
    insight: 'Exceeding 22 sets/week yields diminishing returns and shifts tissue balance into systemic overreaching.',
  },
  {
    id: 27, category: 'Hypertrophy', icon: Brain,
    title: 'Mind-Muscle Neurological Tension',
    body: 'Consciously focusing on contracting the target muscle through a full range of motion boosts electromyographic activity.',
    insight: 'Controlled 3-4 second eccentric phases produce significant mechanical tension, the primary driver of hypertrophy.',
  },
  {
    id: 28, category: 'Hypertrophy', icon: Zap,
    title: 'Protein Distribution Timing',
    body: 'Muscle Protein Synthesis (MPS) peaks with 30-45g of high-leucine protein per feeding. Divide daily intake across 4-5 meals.',
    insight: 'Total daily protein goal: 1.6 - 2.2 grams per kilogram of lean body weight for optimal tissue accretion.',
  },
  {
    id: 29, category: 'Hypertrophy', icon: Timer,
    title: 'Optimal Training Frequency',
    body: 'Training each muscle group 2 times per week outperforms 1x/week splits by 70% when weekly volume is equated.',
    insight: 'Elevated muscle protein synthesis returns to baseline within 36-48 hours post-workout.',
  },
  {
    id: 30, category: 'Hypertrophy', icon: FlameKindling,
    title: 'Mechanical Tension vs. Metabolic Pump',
    body: 'Mechanical tension is king. Finish heavy compound lifts first, then finish with high-rep drop sets or blood flow occlusion.',
    insight: 'Combining heavy tension with cell swelling activates both mTORC1 and satellite cell proliferation pathways.',
  },
];

const TipCard = ({ tip, index }) => {
  const Icon = tip.icon;
  const image = CATEGORY_IMAGES[tip.category] || CATEGORY_IMAGES.Hypertrophy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.4) }}
      className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-red-400 transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
            {tip.category}
          </span>
          <div className="p-2 rounded-xl bg-slate-50 text-red-600 border border-slate-100">
            <Icon className="w-4 h-4" />
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors mb-2">
          {tip.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
          {tip.body}
        </p>
      </div>

      <div className="bg-red-50/70 p-3 rounded-2xl border border-red-100">
        <p className="text-[11px] font-bold text-red-700 leading-snug">
          <span className="font-black text-red-600 uppercase tracking-wider block text-[10px] mb-0.5">
            Science Insight:
          </span>
          {tip.insight}
        </p>
      </div>
    </motion.div>
  );
};

export default function HealthTipsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filterRef = useRef(null);

  const filtered = activeCategory === 'All'
    ? HEALTH_TIPS
    : HEALTH_TIPS.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-red-50 text-red-600 border border-red-200">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>EXERCISE PHYSIOLOGY & SPORTS SCIENCE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">
            HEALTH & RECOVERY <span className="text-red-600">TIPS</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-xl mx-auto">
            30 peer-reviewed performance strategies covering circadian sleep, hydration mechanics, injury prehab, and muscle hypertrophy.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none justify-center">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-red-600 text-white shadow-brand'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Tip Counter */}
        <p className="text-xs font-bold text-slate-400 text-center">
          Displaying <span className="text-red-600">{filtered.length}</span> verified insights in {activeCategory}
        </p>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tip, i) => (
            <TipCard key={tip.id} tip={tip} index={i} />
          ))}
        </div>

        {/* Featured Deep-Dive Science Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80"
                alt="Muscle Hypertrophy Science"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white font-black text-sm">
                Cellular Hypertrophy Mechanics
              </span>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                Peer-Reviewed Guide
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                The Science of Muscle Hypertrophy
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Muscle hypertrophy is governed by three primary physiological mechanisms: mechanical tension, muscle damage, and metabolic stress. Among these, <strong className="text-slate-900">mechanical tension</strong> — created by lifting challenging loads through a complete active range of motion with controlled eccentrics — is the primary stimulus for mTORC1 signaling and myofibrillar protein synthesis.
              </p>
              <div className="space-y-2 pt-1 text-xs text-slate-700 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Prioritize progressive overload by adding weight or reps systematically</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Control the eccentric descent for 2-3 seconds per repetition</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Allow 48-72 hours of recovery before retraining the same muscle group</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
