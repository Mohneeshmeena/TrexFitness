import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import MobileBottomNav from './MobileBottomNav';

export default function Layout() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col text-slate-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-10 pt-4">
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  );
}
