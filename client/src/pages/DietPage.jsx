import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, Clock, ChevronDown, ChevronUp, Leaf, Drumstick, Palette,
  Calendar, Droplets, BarChart3, CheckCircle, Info, UtensilsCrossed, Apple
} from 'lucide-react';

const MEAL_PHOTOS = {
  'Greek Yogurt Power Bowl': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80',
  'Protein Smoothie & Nuts': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80',
  'Paneer & Quinoa Bowl': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
  'Banana Rice Cakes with Dark Chocolate & Almonds': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
  'Paneer / Tofu Tikka Masala with Brown Rice': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
  'Whole Eggs & Egg White Omelet with Sourdough': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
  'Grilled Herb Chicken Breast & Roasted Sweet Potatoes': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
  'Whey Isolate Blast with Blueberries & Creatine': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80',
  'Pan-Seared Wild Alaskan Salmon & Jasmine Rice': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80',
  'Micellar Casein Pudding with Walnuts': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80',
  'Bulletproof Keto Omelet with Hass Avocado': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
  'Grass-Fed Beef Burger Bowl with MCT Olive Oil': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
  'Macadamia & Dark Cacao Power Crunch': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
  'Pan-Roasted Sea Bass with Garlic Butter & Asparagus': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80'
};

const DEFAULT_FOOD_PHOTO = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';

// ─── Static fallback data ──────────────────────────────────────────────────────
const FALLBACK_PLANS = {
  veg: {
    planType: 'veg',
    name: 'Plant Power Protocol',
    description: 'A high-protein vegetarian plan optimised for muscle gain and sustained energy throughout the day.',
    targetGoal: 'bulking',
    dailyCalories: 2800,
    macros: { protein: 30, carbs: 50, fats: 20 },
    healthBenefits: ['Reduces inflammation', 'Improves gut microbiome', 'Lower cardiovascular risk', 'Sustainable & eco-friendly'],
    bannerImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80',
    meals: [
      {
        mealTime: 'Breakfast — 7:00 AM',
        name: 'Greek Yogurt Power Bowl',
        macros: { protein: 42, carbs: 58, fats: 12, calories: 510 },
        ingredients: [
          { item: 'Greek Yogurt (full-fat)', amount: '300g', calories: 180 },
          { item: 'Oats (rolled)', amount: '80g', calories: 290 },
          { item: 'Mixed Berries', amount: '100g', calories: 50 },
          { item: 'Honey', amount: '1 tbsp', calories: 60 },
          { item: 'Chia Seeds', amount: '15g', calories: 73 },
        ],
        preparation: 'Mix rolled oats with greek yogurt the night before (overnight oats). In the morning, top with fresh mixed berries, a drizzle of honey, and chia seeds. Serve chilled.',
      },
      {
        mealTime: 'Mid-Morning — 10:00 AM',
        name: 'Protein Smoothie & Nuts',
        macros: { protein: 28, carbs: 35, fats: 18, calories: 410 },
        ingredients: [
          { item: 'Banana', amount: '1 large', calories: 105 },
          { item: 'Peanut Butter', amount: '2 tbsp', calories: 190 },
          { item: 'Soy Milk', amount: '250ml', calories: 80 },
          { item: 'Flaxseeds', amount: '10g', calories: 55 },
          { item: 'Mixed Nuts', amount: '30g', calories: 180 },
        ],
        preparation: 'Blend banana, peanut butter, soy milk, and flaxseeds until smooth. Pour into a tall glass and serve with a handful of mixed nuts on the side.',
      },
      {
        mealTime: 'Lunch — 1:00 PM',
        name: 'Paneer & Quinoa Bowl',
        macros: { protein: 55, carbs: 70, fats: 22, calories: 700 },
        ingredients: [
          { item: 'Paneer', amount: '200g', calories: 300 },
          { item: 'Quinoa (cooked)', amount: '180g', calories: 220 },
          { item: 'Spinach', amount: '100g', calories: 23 },
          { item: 'Cherry Tomatoes', amount: '100g', calories: 20 },
          { item: 'Olive Oil', amount: '1 tbsp', calories: 120 },
        ],
        preparation: 'Cube paneer and pan-sear in olive oil until golden on each side. Cook quinoa per packet instructions. Toss with spinach and cherry tomatoes.',
      },
      {
        mealTime: 'Afternoon Snack — 4:30 PM',
        name: 'Banana Rice Cakes with Dark Chocolate & Almonds',
        macros: { protein: 14, carbs: 48, fats: 12, calories: 350 },
        ingredients: [
          { item: 'Brown Rice Cakes', amount: '3 cakes', calories: 110 },
          { item: 'Almond Butter', amount: '20g', calories: 130 },
          { item: 'Sliced Banana', amount: '1 fruit', calories: 105 },
        ],
        preparation: 'Spread almond butter over crispy rice cakes, arrange sliced bananas, and sprinkle with cinnamon.',
      },
      {
        mealTime: 'Dinner — 8:00 PM',
        name: 'Paneer / Tofu Tikka Masala with Brown Rice',
        macros: { protein: 46, carbs: 65, fats: 18, calories: 600 },
        ingredients: [
          { item: 'Firm Tofu or Paneer', amount: '200g', calories: 320 },
          { item: 'Brown Basmati Rice', amount: '150g', calories: 180 },
          { item: 'Spiced Tomato Gravy', amount: '100g', calories: 100 },
        ],
        preparation: 'Simmer tofu or paneer cubes in tomato garam masala gravy. Serve over warm aromatic brown rice.',
      }
    ],
  },
  'non-veg': {
    planType: 'non-veg',
    name: 'Championship Shred & Build',
    description: 'Precision athletic fuel featuring lean poultry, wild salmon, and clean carb refeeds.',
    targetGoal: 'cutting',
    dailyCalories: 2250,
    macros: { protein: 40, carbs: 35, fats: 25 },
    healthBenefits: ['Maximum muscle protein synthesis', 'Rich in Omega-3 EPA/DHA', 'High bioavailable iron & zinc', 'Enhanced metabolic burn'],
    bannerImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80',
    meals: [
      {
        mealTime: 'Breakfast — 7:30 AM',
        name: 'Whole Eggs & Egg White Omelet with Sourdough',
        macros: { protein: 42, carbs: 36, fats: 14, calories: 440 },
        ingredients: [
          { item: 'Organic Eggs + Whites', amount: '2 whole + 4 whites', calories: 230 },
          { item: 'Toasted Sourdough', amount: '2 slices', calories: 160 },
          { item: 'Baby Spinach', amount: '50g', calories: 50 },
        ],
        preparation: 'Whisk eggs and whites together, cook with baby spinach in olive oil spray, and serve beside toasted sourdough.',
      },
      {
        mealTime: 'Lunch — 12:30 PM',
        name: 'Grilled Herb Chicken Breast & Roasted Sweet Potatoes',
        macros: { protein: 55, carbs: 52, fats: 11, calories: 530 },
        ingredients: [
          { item: 'Chicken Breast', amount: '220g', calories: 260 },
          { item: 'Sweet Potato', amount: '200g', calories: 180 },
          { item: 'Grilled Asparagus', amount: '100g', calories: 90 },
        ],
        preparation: 'Season chicken breast with paprika, oregano, and garlic. Grill thoroughly and plate with roasted sweet potato wedges.',
      },
      {
        mealTime: 'Post-Workout — 4:30 PM',
        name: 'Whey Isolate Blast with Blueberries & Creatine',
        macros: { protein: 35, carbs: 25, fats: 2, calories: 260 },
        ingredients: [
          { item: 'Whey Isolate Powder', amount: '35g', calories: 130 },
          { item: 'Frozen Blueberries', amount: '100g', calories: 60 },
          { item: 'Almond Milk', amount: '300ml', calories: 70 },
        ],
        preparation: 'Blend whey isolate with cold unsweetened almond milk and wild blueberries for immediate nutrient delivery.',
      },
      {
        mealTime: 'Dinner — 7:45 PM',
        name: 'Pan-Seared Wild Alaskan Salmon & Jasmine Rice',
        macros: { protein: 48, carbs: 48, fats: 18, calories: 550 },
        ingredients: [
          { item: 'Alaskan Salmon', amount: '200g', calories: 310 },
          { item: 'Jasmine Rice', amount: '140g', calories: 180 },
          { item: 'Zucchini & Lemon', amount: '100g', calories: 60 },
        ],
        preparation: 'Sear salmon skin-down in cast iron until crisp. Serve with steamed jasmine rice and sautéed zucchini.',
      },
      {
        mealTime: 'Night Recovery — 10:00 PM',
        name: 'Micellar Casein Pudding with Walnuts',
        macros: { protein: 32, carbs: 8, fats: 9, calories: 240 },
        ingredients: [
          { item: 'Micellar Casein', amount: '35g', calories: 130 },
          { item: 'Raw Walnuts', amount: '15g', calories: 100 },
          { item: 'Cinnamon', amount: 'pinch', calories: 10 },
        ],
        preparation: 'Mix micellar casein with water into a thick pudding. Top with raw walnuts for slow-release overnight repair.',
      }
    ],
  },
  creative: {
    planType: 'creative',
    name: 'Apex Keto-Anabolic Hybrid Matrix',
    description: 'High-fat, low-carb metabolic protocol engineered for clean ketones and laser mental focus.',
    targetGoal: 'keto',
    dailyCalories: 2100,
    macros: { protein: 30, carbs: 10, fats: 60 },
    healthBenefits: ['Metabolic flexibility', 'Zero blood sugar crashes', 'Cellular autophagy stimulation', 'Sustained neurological drive'],
    bannerImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80',
    meals: [
      {
        mealTime: 'Breakfast — 8:00 AM',
        name: 'Bulletproof Keto Omelet with Hass Avocado',
        macros: { protein: 32, carbs: 6, fats: 42, calories: 530 },
        ingredients: [
          { item: 'Whole Eggs', amount: '3 whole', calories: 210 },
          { item: 'Ghee & Cheddar', amount: '1 tbsp + 30g', calories: 230 },
          { item: 'Hass Avocado', amount: '1/2 fruit', calories: 90 },
        ],
        preparation: 'Cook eggs in grass-fed ghee with sharp white cheddar. Serve alongside freshly sliced ripe avocado.',
      },
      {
        mealTime: 'Lunch — 1:00 PM',
        name: 'Grass-Fed Beef Burger Bowl with MCT Olive Oil',
        macros: { protein: 45, carbs: 8, fats: 48, calories: 640 },
        ingredients: [
          { item: '85/15 Ground Beef', amount: '200g', calories: 420 },
          { item: 'Mixed Greens & Cucumber', amount: '150g', calories: 35 },
          { item: 'Olives & Extra Virgin Olive Oil', amount: '2 tbsp', calories: 185 },
        ],
        preparation: 'Grill seasoned beef patties and serve over crisp mixed greens with olives and extra virgin olive oil.',
      },
      {
        mealTime: 'Snack — 4:30 PM',
        name: 'Macadamia & Dark Cacao Power Crunch',
        macros: { protein: 8, carbs: 5, fats: 32, calories: 340 },
        ingredients: [
          { item: 'Roasted Macadamia Nuts', amount: '35g', calories: 250 },
          { item: '90% Dark Chocolate', amount: '20g', calories: 120 },
        ],
        preparation: 'Handful of raw macadamia nuts paired with rich 90% dark chocolate squares and black espresso.',
      },
      {
        mealTime: 'Dinner — 8:00 PM',
        name: 'Pan-Roasted Sea Bass with Garlic Butter & Asparagus',
        macros: { protein: 42, carbs: 7, fats: 34, calories: 500 },
        ingredients: [
          { item: 'Sea Bass Fillet', amount: '220g', calories: 240 },
          { item: 'Garlic Herb Butter', amount: '20g', calories: 150 },
          { item: 'Asparagus & Cauliflower Mash', amount: '150g', calories: 110 },
        ],
        preparation: 'Pan-sear sea bass in melted garlic butter. Serve over steamed cauliflower mash and asparagus.',
      }
    ],
  }
};

const MacroBar = ({ label, value, color }) => (
  <div className="mb-3">
    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
      <span>{label}</span>
      <span className="text-red-600">{value}%</span>
    </div>
    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
      <div 
        className="h-2.5 rounded-full" 
        style={{ width: `${value}%`, backgroundColor: color }} 
      />
    </div>
  </div>
);

const MealCard = ({ meal, index }) => {
  const [open, setOpen] = useState(false);
  const photo = MEAL_PHOTOS[meal.name] || DEFAULT_FOOD_PHOTO;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm mb-5 hover:border-red-300 transition-all"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Meal Photo */}
        <div className="md:col-span-4 relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={photo}
            alt={meal.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <span className="absolute bottom-2 left-2 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900/80 text-white">
            {meal.mealTime.split('—')[0]}
          </span>
        </div>

        {/* Meal Details */}
        <div className="md:col-span-8">
          <p className="text-xs font-black text-red-600 uppercase tracking-widest mb-1">{meal.mealTime}</p>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">{meal.name}</h3>

          {/* Macros Chips */}
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              { label: 'Protein', value: `${meal.macros.protein}g`, color: 'text-red-600 bg-red-50' },
              { label: 'Carbs', value: `${meal.macros.carbs}g`, color: 'text-slate-800 bg-slate-100' },
              { label: 'Fats', value: `${meal.macros.fats}g`, color: 'text-slate-800 bg-slate-100' },
              { label: 'Calories', value: `${meal.macros.calories} kcal`, color: 'text-red-600 bg-red-50 font-black' },
            ].map(m => (
              <div key={m.label} className={`rounded-xl px-3 py-1 text-xs font-bold border border-slate-200 ${m.color}`}>
                <span>{m.label}: </span>
                <span>{m.value}</span>
              </div>
            ))}
          </div>

          {/* Expand Prep Button */}
          <button
            onClick={() => setOpen(o => !o)}
            className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>{open ? 'Hide Ingredients & Method' : 'Show Ingredients & Method'}</span>
            {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Accordion Content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-4 pt-4 border-t border-slate-100 space-y-3"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                    <th className="text-left py-1.5">Ingredient</th>
                    <th className="text-left py-1.5">Serving</th>
                    <th className="text-right py-1.5">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {meal.ingredients.map((ing, i) => (
                    <tr key={i} className="border-b border-slate-50 text-slate-700">
                      <td className="py-1 font-semibold">{ing.item}</td>
                      <td className="py-1 text-slate-500">{ing.amount}</td>
                      <td className="py-1 text-right font-bold text-red-600">{ing.calories}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-normal">
              <span className="font-bold text-slate-900 block mb-1">Preparation Guide:</span>
              {meal.preparation}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TABS = [
  { key: 'veg', label: 'Vegetarian High-Protein', emoji: '🌱' },
  { key: 'non-veg', label: 'Non-Veg Lean Shred', emoji: '🍗' },
  { key: 'creative', label: 'Anabolic Keto Matrix', emoji: '🥑' },
];

export default function DietPage() {
  const [activeTab, setActiveTab] = useState('veg');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/diets?planType=${activeTab}`);
        const data = await res.json();
        const found = Array.isArray(data) ? data[0] : null;
        setPlan(found || FALLBACK_PLANS[activeTab]);
      } catch {
        setPlan(FALLBACK_PLANS[activeTab]);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-red-50 text-red-600 border border-red-200">
            <Apple className="w-3.5 h-3.5" />
            <span>PRECISION ATHLETIC NUTRITION</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">
            NUTRITION <span className="text-red-600">HUB</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-xl mx-auto">
            Science-validated meal allocations engineered for maximum muscle protein synthesis, metabolic clarity, and rapid recovery.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === tab.key
                  ? 'bg-red-600 text-white shadow-brand'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <span>{tab.emoji} </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Plan Overview Card */}
        {plan && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-black uppercase text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                  {plan.targetGoal} Target
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{plan.name}</h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal max-w-xl">{plan.description}</p>
              </div>

              <div className="flex items-center gap-3 bg-red-50 p-4 rounded-2xl border border-red-200">
                <Flame className="w-8 h-8 text-red-600 shrink-0" />
                <div>
                  <p className="text-2xl font-black text-slate-900">{plan.dailyCalories.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 font-bold uppercase">Daily kcal Target</p>
                </div>
              </div>
            </div>

            {/* Macros & Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">Macro Distribution</h3>
                <MacroBar label="Protein Ratio" value={plan.macros.protein} color="#dc2626" />
                <MacroBar label="Carbohydrate Ratio" value={plan.macros.carbs} color="#0f172a" />
                <MacroBar label="Healthy Fats Ratio" value={plan.macros.fats} color="#64748b" />
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Key Physiological Benefits</h3>
                <div className="space-y-2">
                  {plan.healthBenefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Daily Meal Timeline */}
        {plan && (
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-600" />
              <span>DAILY MEAL TIMELINE</span>
            </h2>
            {plan.meals.map((meal, i) => (
              <MealCard key={i} meal={meal} index={i} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
