import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Dumbbell, Apple, TrendingUp, ClipboardList } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

const bottomTabs = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Workouts', path: '/workouts', icon: Dumbbell },
  { label: 'Diet', path: '/diet', icon: Apple },
  { label: 'Progress', path: '/profile', icon: TrendingUp },
  { label: 'Planner', path: '/planner', icon: ClipboardList },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const { playClick } = useSound();

  const isCurrent = (tab) => {
    if (tab.path === '/') return location.pathname === '/';
    return location.pathname.startsWith(tab.path);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5">
      <div className="flex items-center justify-around">
        {bottomTabs.map((tab) => {
          const active = isCurrent(tab);
          const Icon = tab.icon || Home;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              onClick={playClick}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all relative ${
                active ? 'text-red-600 font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'
              }`}
            >
              <motion.div
                animate={{ scale: active ? 1.15 : 1 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              </motion.div>
              <span className="text-[11px] mt-0.5">{tab.label}</span>
              {active && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="w-1.5 h-1.5 rounded-full bg-red-600 mt-0.5"
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
