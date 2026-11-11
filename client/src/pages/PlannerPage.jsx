import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardList, 
  Plus, 
  Check, 
  Trash2, 
  Calendar, 
  Dumbbell, 
  Apple, 
  Sparkles, 
  RotateCcw, 
  CheckCheck, 
  X, 
  ChevronRight,
  Flame,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../hooks/useSound';
import { customPlansApi } from '../lib/api';
import toast from 'react-hot-toast';

export default function PlannerPage() {
  const { user } = useAuth();
  const { playClick, playSuccess, playBeep } = useSound();

  const [plans, setPlans] = useState([]);
  const [activePlanId, setActivePlanId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New plan form
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanType, setNewPlanType] = useState('mixed');
  const [newPlanNotes, setNewPlanNotes] = useState('');

  // New item form
  const [itemTitle, setItemTitle] = useState('');
  const [itemType, setItemType] = useState('exercise');
  const [itemSets, setItemSets] = useState(3);
  const [itemReps, setItemReps] = useState('12 reps');
  const [itemDesc, setItemDesc] = useState('');

  // Initial starter plan if empty
  const defaultStarterPlan = {
    _id: 'local_starter_1',
    name: 'Apex Daily Protocol',
    type: 'mixed',
    notes: 'Sample daily workout and nutrition checklist',
    items: [
      { id: '1', type: 'workout', title: 'Create Your Exxercise', description: 'Demo', targetSets: 3, targetReps: '60s hold', completed: true },
       ]
  };

  // Load plans from API or fallback
  useEffect(() => {
    let isMounted = true;
    async function loadPlans() {
      setLoading(true);
      try {
        if (user) {
          const res = await customPlansApi.getAll();
          if (isMounted) {
            if (res.data && res.data.length > 0) {
              setPlans(res.data);
              setActivePlanId(res.data[0]._id);
            } else {
              setPlans([defaultStarterPlan]);
              setActivePlanId(defaultStarterPlan._id);
            }
          }
        } else {
          setPlans([defaultStarterPlan]);
          setActivePlanId(defaultStarterPlan._id);
        }
      } catch (err) {
        if (isMounted) {
          setPlans([defaultStarterPlan]);
          setActivePlanId(defaultStarterPlan._id);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadPlans();
    return () => { isMounted = false; };
  }, [user]);

  const activePlan = plans.find((p) => p._id === activePlanId) || plans[0] || null;

  // Toggle checklist item with satisfying audio
  const handleToggleItem = async (itemId) => {
    if (!activePlan) return;

    const currentItem = activePlan.items.find((i) => (i.id === itemId || i._id === itemId));
    const nextState = !currentItem?.completed;

    if (nextState) {
      playSuccess(); // Satisfying success chime
    } else {
      playClick();
    }

    setPlans((prevPlans) =>
      prevPlans.map((p) => {
        if (p._id !== activePlan._id) return p;
        return {
          ...p,
          items: p.items.map((i) => {
            if (i.id === itemId || i._id === itemId) {
              return { ...i, completed: nextState, completedAt: nextState ? new Date() : null };
            }
            return i;
          }),
        };
      })
    );

    if (!activePlan._id.startsWith('local_')) {
      try {
        await customPlansApi.toggleItem(activePlan._id, itemId);
      } catch (err) {}
    }
  };

  // Add Item to active plan
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!itemTitle || !activePlan) return;
    playClick();

    const newItem = {
      id: Date.now().toString(),
      type: itemType,
      title: itemTitle,
      description: itemDesc,
      targetSets: Number(itemSets),
      targetReps: itemReps,
      completed: false,
    };

    setPlans((prevPlans) =>
      prevPlans.map((p) => {
        if (p._id !== activePlan._id) return p;
        return { ...p, items: [...p.items, newItem] };
      })
    );

    setItemTitle('');
    setItemDesc('');
    toast.success('Task added to schedule');

    if (!activePlan._id.startsWith('local_')) {
      try {
        await customPlansApi.addItem(activePlan._id, newItem);
      } catch (err) {}
    }
  };

  // Delete item
  const handleDeleteItem = async (itemId) => {
    playBeep();
    setPlans((prevPlans) =>
      prevPlans.map((p) => {
        if (p._id !== activePlan._id) return p;
        return {
          ...p,
          items: p.items.filter((i) => i.id !== itemId && i._id !== itemId),
        };
      })
    );

    if (!activePlan._id.startsWith('local_')) {
      try {
        await customPlansApi.removeItem(activePlan._id, itemId);
      } catch (err) {}
    }
  };

  // Create new plan
  const handleCreatePlan = async (e) => {
    e.preventDefault();
    if (!newPlanName) return;
    playClick();

    const newPlanObj = {
      name: newPlanName,
      type: newPlanType,
      notes: newPlanNotes,
      items: [],
    };

    try {
      if (user && !activePlan?._id?.startsWith('local_')) {
        const res = await customPlansApi.create(newPlanObj);
        setPlans((prev) => [res.data, ...prev]);
        setActivePlanId(res.data._id);
      } else {
        const localCreated = { ...newPlanObj, _id: `local_${Date.now()}` };
        setPlans((prev) => [localCreated, ...prev]);
        setActivePlanId(localCreated._id);
      }
      playSuccess();
      toast.success('Custom routine created!');
      setNewPlanName('');
      setNewPlanNotes('');
      setCreateModalOpen(false);
    } catch (err) {
      toast.error('Could not create plan');
    }
  };

  // Mark all complete
  const handleMarkAllComplete = () => {
    playSuccess();
    setPlans((prev) =>
      prev.map((p) => {
        if (p._id !== activePlan._id) return p;
        return {
          ...p,
          items: p.items.map((i) => ({ ...i, completed: true })),
        };
      })
    );
    toast.success('All drills marked complete! 🏆');
  };

  // Reset all
  const handleResetAll = () => {
    playClick();
    setPlans((prev) =>
      prev.map((p) => {
        if (p._id !== activePlan._id) return p;
        return {
          ...p,
          items: p.items.map((i) => ({ ...i, completed: false })),
        };
      })
    );
    toast('Checklist reset for new session');
  };

  const totalItems = activePlan?.items?.length || 0;
  const completedItems = activePlan?.items?.filter((i) => i.completed).length || 0;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4">
      {/* ─── Header ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-red-50 text-red-600 border border-red-200 mb-2">
              <ClipboardList className="w-3.5 h-3.5" />
              <span>INTERACTIVE WORKOUT & MEAL CHECKLIST</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900">CUSTOM PLANNER</h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2 font-normal max-w-xl">
              Construct your customized training agenda. Check off completed sets and meals with audio chime feedback.
            </p>
          </div>

          <button
            onClick={() => {
              playClick();
              setCreateModalOpen(true);
            }}
            className="btn-brand self-start sm:self-auto inline-flex items-center gap-2 px-6 py-3 text-sm font-black shadow-brand"
          >
            <Plus className="w-4 h-4" />
            <span>NEW ROUTINE PLAN</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ─── Left Sidebar: Routine Plans List ───────────────────── */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Your Programs</span>
              <span className="text-xs text-red-600 font-bold">{plans.length} Total</span>
            </h3>

            <div className="space-y-2">
              {plans.map((p) => {
                const isSelected = p._id === activePlan?._id;
                const pDone = p.items?.filter((i) => i.completed).length || 0;
                const pTotal = p.items?.length || 0;
                return (
                  <button
                    key={p._id}
                    onClick={() => {
                      playClick();
                      setActivePlanId(p._id);
                    }}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border flex items-center justify-between ${
                      isSelected
                        ? 'bg-red-50/70 border-red-300 shadow-sm ring-1 ring-red-400'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <h4 className={`text-sm font-black ${isSelected ? 'text-red-700' : 'text-slate-900'}`}>
                        {p.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 font-medium">
                        <span className="capitalize">{p.type}</span>
                        <span>•</span>
                        <span>{pDone}/{pTotal} Done</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-red-600' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick stats panel */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Completion Telemetry</h4>
            <div>
              <div className="flex items-center justify-between text-xs font-black text-slate-900 mb-1.5">
                <span>Checklist Progress</span>
                <span className="text-red-600 font-black">{progressPercent}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-red-600 rounded-full"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {completedItems} of {totalItems} items achieved for this routine.
            </p>
          </div>
        </div>

        {/* ─── Right: Active Plan Checklist ───────────────────────── */}
        <div className="lg:col-span-8 space-y-6">
          {activePlan ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              {/* Plan Title & Actions Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                      {activePlan.type}
                    </span>
                    <h2 className="text-2xl font-black text-slate-900">{activePlan.name}</h2>
                  </div>
                  {activePlan.notes && (
                    <p className="text-xs text-slate-500 mt-1">{activePlan.notes}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMarkAllComplete}
                    className="px-3 py-1.5 rounded-xl bg-red-50 text-xs font-bold text-red-600 hover:bg-red-100 transition-colors flex items-center gap-1.5 border border-red-200"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark All</span>
                  </button>
                  <button
                    onClick={handleResetAll}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1.5 border border-slate-200"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* ─── Add Item Quick Input Form ─────────────────────── */}
              <form onSubmit={handleAddItem} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <p className="text-xs font-black text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> ADD NEW TASK OR DRILL
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-6">
                    <input
                      type="text"
                      value={itemTitle}
                      onChange={(e) => setItemTitle(e.target.value)}
                      placeholder="e.g. Barbell Squats or Post-Workout Meal"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-red-500 font-medium"
                      required
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <select
                      value={itemType}
                      onChange={(e) => setItemType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-red-500 font-semibold"
                    >
                      <option value="exercise">🏋️ Exercise</option>
                      <option value="meal">🥗 Nutrition Meal</option>
                      <option value="workout">⚡ Core Drill</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      value={itemReps}
                      onChange={(e) => setItemReps(e.target.value)}
                      placeholder="e.g. 4 sets x 12 reps"
                      className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-red-500 font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <input
                    type="text"
                    value={itemDesc}
                    onChange={(e) => setItemDesc(e.target.value)}
                    placeholder="Brief execution or ingredient note (optional)"
                    className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none font-medium"
                  />
                  <button
                    type="submit"
                    className="btn-brand text-xs px-5 py-2 font-black shrink-0 shadow-brand"
                  >
                    + Add Task
                  </button>
                </div>
              </form>

              {/* ─── Checklist Items ───────────────────────────────── */}
              <div className="space-y-2.5">
                {activePlan.items && activePlan.items.length > 0 ? (
                  activePlan.items.map((item, idx) => {
                    const isDone = item.completed;
                    const itemId = item.id || item._id;
                    return (
                      <motion.div
                        key={itemId || idx}
                        layout
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className={`p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                          isDone
                            ? 'bg-slate-50 border-slate-200 opacity-60'
                            : 'bg-white border-slate-200 hover:border-red-300 shadow-sm'
                        }`}
                      >
                        {/* Custom Interactive Checkbox with Audio */}
                        <button
                          type="button"
                          onClick={() => handleToggleItem(itemId)}
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                            isDone
                              ? 'bg-red-600 border-red-600 text-white shadow-sm'
                              : 'border-slate-300 hover:border-red-500 bg-white'
                          }`}
                        >
                          {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                        </button>

                        {/* Title & Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs">
                              {item.type === 'meal' ? '🥗' : '🏋️'}
                            </span>
                            <h4 className={`text-sm sm:text-base font-black transition-all ${
                              isDone ? 'line-through text-slate-400' : 'text-slate-900'
                            }`}>
                              {item.title}
                            </h4>
                          </div>

                          {item.description && (
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 font-normal">
                              {item.description}
                            </p>
                          )}

                          <div className="flex items-center gap-2 mt-2">
                            {item.targetReps && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-100">
                                {item.targetReps}
                              </span>
                            )}
                            {item.targetSets && item.targetSets > 1 && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                                {item.targetSets} Sets
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Delete Action */}
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(itemId)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                    <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm font-medium">No items logged in this routine yet.</p>
                    <p className="text-slate-400 text-xs mt-1">Use the input form above to assign drills or meals.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-500">Select or create a routine from the left panel.</p>
            </div>
          )}
        </div>
      </div>

      {/* ─── Modal: Create New Plan ───────────────────────────────── */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-md p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl relative"
          >
            <button
              onClick={() => setCreateModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-slate-900 mb-1">Create Routine Blueprint</h3>
            <p className="text-xs text-slate-500 mb-4">Initialize a custom schedule for workouts or nutrition</p>
            <form onSubmit={handleCreatePlan} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Routine Name</label>
                <input
                  type="text"
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                  placeholder="e.g. Chest Hypertrophy Day or Intermittent Fasting"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Focus Type</label>
                <select
                  value={newPlanType}
                  onChange={(e) => setNewPlanType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-500 font-semibold"
                >
                  <option value="mixed">Mixed (Workout + Diet)</option>
                  <option value="workout">Workout Exclusive</option>
                  <option value="diet">Nutrition Exclusive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Objectives & Notes</label>
                <textarea
                  value={newPlanNotes}
                  onChange={(e) => setNewPlanNotes(e.target.value)}
                  rows="2"
                  placeholder="Short guidelines for this training regimen..."
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-500 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-brand py-2.5 text-sm font-black shadow-brand"
                >
                  Create Plan
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
