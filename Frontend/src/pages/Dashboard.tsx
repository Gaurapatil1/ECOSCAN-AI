import { motion } from 'framer-motion';
import { Shield, FileCheck, TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import TypingEffect from '../components/TypingEffect';

export default function Dashboard() {
  const stats = [
    { icon: Shield, label: 'Scans Completed', value: '127', color: 'text-[#FF3B30]' },
    { icon: FileCheck, label: 'Verified Items', value: '94', color: 'text-[#FFD60A]' },
    { icon: TrendingUp, label: 'Trust Score', value: '87%', color: 'text-green-500' },
  ];

  return (
    <div className="text-[#F2F2F2]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          <TypingEffect text="Welcome back, User!" speed={70} />
        </h1>
        <p className="text-[#F2F2F2]/60">Here's your environmental impact overview</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <stat.icon className={`w-12 h-12 ${stat.color} mb-4`} />
              <p className="text-[#F2F2F2]/60 text-sm mb-1">{stat.label}</p>
              <p className="text-4xl font-bold">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <h2 className="text-2xl font-bold mb-6">Environmental Trust Score</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#2A2A2A"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 40 * 0.13 }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                  transform="rotate(-90 50 50)"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF3B30" />
                    <stop offset="100%" stopColor="#FFD60A" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.p
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="text-5xl font-bold"
                  >
                    87%
                  </motion.p>
                  <p className="text-[#F2F2F2]/60 text-sm">Trust Score</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-[#F2F2F2]/60 mt-6">
            Your verification accuracy is excellent! Keep up the great work.
          </p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <Card>
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Verified carbon emission report', time: '2 hours ago', status: 'success' },
              { action: 'Scanned product label', time: '5 hours ago', status: 'warning' },
              { action: 'Checked news article credibility', time: '1 day ago', status: 'success' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-[#0D0D0D] rounded-lg"
              >
                <div>
                  <p className="font-semibold">{activity.action}</p>
                  <p className="text-sm text-[#F2F2F2]/60">{activity.time}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    activity.status === 'success'
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}
                >
                  {activity.status === 'success' ? 'Verified' : 'Warning'}
                </span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
