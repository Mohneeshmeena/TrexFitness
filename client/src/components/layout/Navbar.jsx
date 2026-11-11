import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, ChevronDown, LogOut, User, Dumbbell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSound } from '../../hooks/useSound';

const navLinks = [
  { label: 'Dashboard', path: '/' },
  { label: 'Workouts', path: '/workouts' },
  { label: 'Diet', path: '/diet' },
  { label: 'Health Tips', path: '/health-tips' },
  { label: 'Progress', path: '/profile' },
  { label: 'Planner', path: '/planner' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { playClick, toggle: toggleSound } = useSound();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSoundToggle = () => {
    toggleSound();
    setSoundOn((prev) => !prev);
    playClick();
  };

  const handleLogout = () => {
    playClick();
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'AP';

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={playClick}>
            <span className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
              ⚡
            </span>
            <span className="text-xl font-black text-slate-900 tracking-wider">
              TREX<span className="text-red-600">FIT</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={playClick}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-red-600 bg-red-50 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Sound toggle */}
            <button
              onClick={handleSoundToggle}
              className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 border border-slate-200"
              title={soundOn ? 'Mute sounds' : 'Enable sounds'}
            >
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => { playClick(); setDropdownOpen((v) => !v); }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 hover:border-red-300 transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center text-xs font-black">
                    {initials}
                  </div>
                  <span className="text-sm text-slate-800 font-bold hidden sm:block">{user.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} className={`text-slate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden py-1"
                    >
                      <Link
                        to="/profile"
                        onClick={() => { playClick(); setDropdownOpen(false); }}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:text-red-600 hover:bg-red-50 font-medium transition-all"
                      >
                        <User size={15} /> Profile & Stats
                      </Link>
                      <Link
                        to="/planner"
                        onClick={() => { playClick(); setDropdownOpen(false); }}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:text-red-600 hover:bg-red-50 font-medium transition-all"
                      >
                        <Dumbbell size={15} /> Custom Planner
                      </Link>
                      <div className="border-t border-slate-100 my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold transition-all text-left"
                      >
                        <LogOut size={15} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  onClick={playClick}
                  className="px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all"
                >
                  Welcome
                </Link>
                <Link
                  to="/register"
                  onClick={playClick}
                  className="btn-brand text-sm py-2 px-4"
                >
                  BUDDY
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => { playClick(); setMobileOpen((v) => !v); }}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-200"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-200 bg-white shadow-lg overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={playClick}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-red-600 bg-red-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <div className="pt-2 pb-1 flex gap-2">
                  <Link to="/login" onClick={playClick} className="flex-1 border border-slate-300 text-slate-700 text-sm py-2 rounded-xl font-bold text-center hover:bg-slate-50">
                    Login
                  </Link>
                  <Link to="/register" onClick={playClick} className="flex-1 btn-brand text-sm py-2 text-center">
                    Register
                  </Link>
                </div>
              )}
              {user && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-red-600 font-bold hover:bg-red-50 transition-all"
                >
                  <LogOut size={15} /> Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
