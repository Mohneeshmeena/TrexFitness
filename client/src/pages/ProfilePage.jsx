import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Flame, 
  Clock, 
  Zap, 
  CheckCircle, 
  Calendar, 
  User, 
  Award, 
  Edit3, 
  Plus, 
  Sparkles,
  Lock,
  TrendingUp,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../hooks/useSound';
import { authApi } from '../lib/api';
import toast from 'react-hot-toast';

const allBadges = [
  { id: 'first_workout', name: 'First Rep', description: 'Complete your first workout protocol', icon: '🏆', req: '1 Workout' },
  { id: 'week_streak', name: 'Week Warrior', description: 'Maintain a 7-day training streak', icon: '🔥', req: '7-Day Streak' },
  { id: 'calorie_crusher', name: 'Calorie Crusher', description: 'Surpass 5,000 total calories burned', icon: '⚡', req: '5,000 kcal' },
  { id: 'iron_will', name: 'Iron Will', description: 'Log 25 completed workout sessions', icon: '💪', req: '25 Workouts' },
  { id: 'month_streak', name: 'Month Mastery', description: 'Lock in a 30-day consistent streak', icon: '🌟', req: '30-Day Streak' },
  { id: 'apex_titan', name: 'APEX TITAN', description: 'Surpass 10,000 total active minutes', icon: '👑', req: '10,000 Minutes' },
];

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { playClick, playSuccess, playBeep } = useSound();

  const [editOpen, setEditOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);

  // Edit form state
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  // Log workout state
  const [muscleGroup, setMuscleGroup] = useState('abs');
  const [category, setCategory] = useState('home');
  const [duration, setDuration] = useState(45);
  const [calories, setCalories] = useState(320);
  const [submitting, setSubmitting] = useState(false);

  const stats = user?.stats || {
    completedWorkouts: 12,
    currentStreak: 4,
    longestStreak: 9,
    totalCaloriesBurned: 4200,
    totalMinutesWorked: 380,
  };

  const unlockedBadgeIds = (user?.achievements || []).map((a) => a.id);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    playClick();
    try {
      const res = await authApi.updateMe({ name, avatar });
      updateUser(res.data);
      playSuccess();
      toast.success('Profile details updated!');
      setEditOpen(false);
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const handleLogWorkout = async (e) => {
    e.preventDefault();
    playClick();
    setSubmitting(true);
    try {
      const res = await authApi.updateStats({
        completedWorkouts: 1,
        caloriesBurned: Number(calories),
        minutesWorked: Number(duration),
        currentStreak: 1
      });
      updateUser(res.data);
      playSuccess();
      toast.success(`Workout logged! +${calories} kcal, +${duration} min`);
      setLogOpen(false);
    } catch (err) {
      toast.error('Failed to log session');
    } finally {
      setSubmitting(false);
    }
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AP';

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4">
      {/* ─── Profile Hero Banner ─────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            {/* Avatar */}
            <div className="relative">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-red-600 shadow-md"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-red-600 border-2 border-red-700 flex items-center justify-center text-3xl font-black text-white shadow-md">
                  {initials}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-600 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full" />
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-red-50 text-red-600 border border-red-200 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PROFILE</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900">{user?.name || 'Trex'}</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{user?.email || ' trexfit.com'}</p>
              <p className="text-xs text-slate-400 mt-2 font-mono">
                ID: #{user?._id ? user._id.slice(-6).toUpperCase() : 'DEMO-01'} • 
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                playClick();
                setEditOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
            >
              <Edit3 className="w-4 h-4 text-red-600" />
              <span>EDIT PROFILE</span>
            </button>

            <button
              onClick={() => {
                playSuccess();
                setLogOpen(true);
              }}
              className="btn-brand px-5 py-2.5 text-xs sm:text-sm font-black flex items-center gap-2 shadow-brand"
            >
              <Plus className="w-4 h-4" />
              <span>LOG WORKOUT</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Metric Matrix ───────────────────────────────────────── */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-red-600" />
          <span>Target Hunt.</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              label: 'Workouts Target',
              val: stats.completedWorkouts,
              unit: 'sessions',
              icon: CheckCircle,
              color: 'text-red-600',
            },
            {
              label: 'Target Streak',
              val: stats.currentStreak,
              unit: 'days',
              icon: Flame,
              color: 'text-orange-500',
            },
            {
              label: 'Best Streak',
              val: stats.longestStreak || stats.currentStreak,
              unit: 'days',
              icon: Trophy,
              color: 'text-amber-500',
            },
            {
              label: 'Calories Burned',
              val: stats.totalCaloriesBurned.toLocaleString(),
              unit: 'kcal',
              icon: Zap,
              color: 'text-red-600',
            },
            {
              label: 'Time Target',
              val: stats.totalMinutesWorked,
              unit: 'minutes',
              icon: Clock,
              color: 'text-slate-800',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-red-300 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{item.label}</span>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{item.val}</p>
                <p className="text-[11px] text-slate-500 font-semibold">{item.unit}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Achievement Badges Grid ──────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-red-600" />
            <span>HONORARY BADGES & RECOGNITIONS</span>
          </h2>
          <span className="text-xs text-slate-500 font-bold">
            {unlockedBadgeIds.length} of {allBadges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allBadges.map((badge) => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id) || stats.completedWorkouts >= 1;
            return (
              <div
                key={badge.id}
                className={`p-5 rounded-3xl border transition-all flex items-start gap-4 ${
                  isUnlocked 
                    ? 'bg-white border-red-300 shadow-sm' 
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                  isUnlocked ? 'bg-red-50 border border-red-200' : 'bg-slate-200 border border-slate-300 grayscale'
                }`}>
                  {badge.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-black text-slate-900 text-base truncate">{badge.name}</h4>
                    {isUnlocked ? (
                      <span className="text-[10px] font-black text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200 shrink-0">
                        UNLOCKED
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> LOCKED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 font-normal leading-relaxed">{badge.description}</p>
                  <p className="text-[10px] font-black text-red-600 mt-2 tracking-wider uppercase">REQ: {badge.req}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Modal: Edit Identity ─────────────────────────────────── */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-md p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl relative"
          >
            <button
              onClick={() => setEditOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-slate-900 mb-4">Edit Athlete Profile</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-brand py-2.5 text-sm font-black shadow-brand"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ─── Modal: Log Workout ───────────────────────────────────── */}
      {logOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-md p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl relative"
          >
            <button
              onClick={() => setLogOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-slate-900 mb-1">Log Completed Session</h3>
            <p className="text-xs text-slate-500 mb-4">Record your training output to increment your profile telemetry</p>
            <form onSubmit={handleLogWorkout} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Target Muscle</label>
                <select
                  value={muscleGroup}
                  onChange={(e) => setMuscleGroup(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-500 font-semibold"
                >
                  <option value="abs">Abs</option>
                  <option value="biceps">Biceps</option>
                  <option value="back">Back</option>
                  <option value="triceps">Triceps</option>
                  <option value="chest">Chest</option>
                  <option value="shoulder">Shoulder</option>
                  <option value="legs">Legs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-500 font-semibold"
                >
                  <option value="home">Home Workout</option>
                  <option value="gym">Gym Workout</option>
                  <option value="stretching">Stretching & Mobility</option>
                  <option value="dumbbell">Dumbbell Only</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Duration (Min)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="5"
                    max="180"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Calories Burned</label>
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    min="10"
                    max="2000"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setLogOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 btn-brand py-2.5 text-sm font-black flex items-center justify-center gap-2 shadow-brand"
                >
                  {submitting ? 'Updating...' : 'Log & Save'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
