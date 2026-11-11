import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSound } from '../../hooks/useSound';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const { playClick, playSuccess, playError } = useSound();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      playError();
      return;
    }
    setLoading(true);
    playClick();
    try {
      await login(email, password);
      playSuccess();
      toast.success('Access Granted! Welcome to Apex Fit');
      navigate('/profile');
    } catch (err) {
      playError();
      toast.error(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAutofill = () => {
    playClick();
    setEmail('demo@apexfit.com');
    setPassword('Demo1234!');
    toast.success('Demo credentials loaded!');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-md p-8 rounded-3xl border border-slate-200 relative shadow-xl"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">ACCESS APEX FIT</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Authenticate your athlete terminal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@apexfit.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors text-sm font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors text-sm font-medium"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-brand py-3.5 text-sm uppercase tracking-wider font-black flex items-center justify-center gap-2 mt-2 shadow-brand"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>SIGN IN TO TERMINAL</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Account Quick Autofill */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={handleDemoAutofill}
            className="w-full py-2.5 px-4 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>AUTOLOAD DEMO CREDENTIALS</span>
          </button>
          <p className="text-[11px] text-center text-slate-500 mt-2">
            demo@apexfit.com • Demo1234!
          </p>
        </div>

        <div className="text-center mt-6 text-xs text-slate-500">
          Don't have an athlete profile?{' '}
          <Link to="/register" onClick={playClick} className="text-red-600 font-bold hover:underline">
            Register now
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
