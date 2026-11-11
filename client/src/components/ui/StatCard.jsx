import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ icon: Icon, label, value, trend, trendValue, color = 'red' }) {
  const colorMap = {
    red: 'text-red-600',
    green: 'text-emerald-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-600' : 'text-slate-500';

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between">
        {Icon && (
          <div className="p-2 rounded-xl bg-red-50 text-red-600">
            <Icon size={18} />
          </div>
        )}
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold ${trendColor}`}>
            <TrendIcon size={12} />
            {trendValue && <span>{trendValue}</span>}
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900">{value ?? '—'}</p>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">{label}</p>
      </div>
    </div>
  );
}
