import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Camera, Shield, History, Settings, LogOut, Leaf, BarChart3 } from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Camera, label: 'Scan', path: '/dashboard/scan' },
    { icon: Shield, label: 'Fact Check', path: '/dashboard/fact-check' },
    { icon: BarChart3, label: 'Carbon Verify', path: '/dashboard/carbon-verify' },
    { icon: History, label: 'My Reports', path: '/dashboard/history' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-[#1A1A1A] border-r border-[#2A2A2A] h-screen fixed left-0 top-0 overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <Leaf className="w-8 h-8 text-[#FF3B30]" />
          <span className="text-xl font-bold text-[#F2F2F2]">EcoScan AI</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#FF3B30] text-white'
                    : 'text-[#F2F2F2]/70 hover:bg-[#2A2A2A] hover:text-[#F2F2F2]'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-semibold">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#F2F2F2]/70 hover:bg-[#2A2A2A] hover:text-[#FF3B30] transition-all mt-8"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  );
}
