import { motion } from 'framer-motion';
import { FileCheck, AlertTriangle, XCircle, Clock } from 'lucide-react';
import Card from '../components/Card';

export default function ScanHistory() {
  const scans = [
    {
      id: 1,
      type: 'Carbon Report',
      company: 'GreenTech Inc.',
      result: 'verified',
      time: '2 hours ago',
      score: 92,
    },
    {
      id: 2,
      type: 'Product Label',
      company: 'EcoProducts Co.',
      result: 'warning',
      time: '5 hours ago',
      score: 68,
    },
    {
      id: 3,
      type: 'News Article',
      company: 'Environmental Daily',
      result: 'fake',
      time: '1 day ago',
      score: 34,
    },
    {
      id: 4,
      type: 'Sustainability Report',
      company: 'Blue Ocean Ltd.',
      result: 'verified',
      time: '2 days ago',
      score: 88,
    },
    {
      id: 5,
      type: 'Carbon Footprint',
      company: 'FastFashion Corp.',
      result: 'warning',
      time: '3 days ago',
      score: 55,
    },
    {
      id: 6,
      type: 'Environmental Claim',
      company: 'Nature First',
      result: 'verified',
      time: '1 week ago',
      score: 95,
    },
  ];

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'verified':
        return FileCheck;
      case 'warning':
        return AlertTriangle;
      case 'fake':
        return XCircle;
      default:
        return FileCheck;
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'verified':
        return 'text-green-500 bg-green-500/20';
      case 'warning':
        return 'text-yellow-500 bg-yellow-500/20';
      case 'fake':
        return 'text-red-500 bg-red-500/20';
      default:
        return 'text-gray-500 bg-gray-500/20';
    }
  };

  return (
    <div className="text-[#F2F2F2] max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Scan History</h1>
        <p className="text-[#F2F2F2]/60">
          Review your previous environmental scans and verifications
        </p>
      </motion.div>

      <div className="grid gap-4">
        {scans.map((scan, index) => (
          <motion.div
            key={scan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-2xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${getResultColor(
                      scan.result
                    )}`}
                  >
                    {(() => {
                      const Icon = getResultIcon(scan.result);
                      return <Icon className="w-6 h-6" />;
                    })()}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{scan.type}</h3>
                    <p className="text-[#F2F2F2]/60 text-sm">{scan.company}</p>
                  </div>

                  <div className="hidden md:block text-center">
                    <div className="text-2xl font-bold mb-1">{scan.score}%</div>
                    <p className="text-[#F2F2F2]/60 text-xs">Score</p>
                  </div>

                  <div className="hidden md:flex items-center gap-2 text-[#F2F2F2]/60">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{scan.time}</span>
                  </div>

                  <div
                    className={`px-4 py-2 rounded-full font-bold capitalize ${getResultColor(
                      scan.result
                    )}`}
                  >
                    {scan.result}
                  </div>
                </div>
              </div>

              <div className="md:hidden mt-4 flex justify-between text-sm">
                <div className="flex items-center gap-2 text-[#F2F2F2]/60">
                  <Clock className="w-4 h-4" />
                  <span>{scan.time}</span>
                </div>
                <div className="text-[#F2F2F2]/60">Score: {scan.score}%</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Card>
          <div className="text-center py-8">
            <h3 className="text-xl font-bold mb-2">That's all your scans!</h3>
            <p className="text-[#F2F2F2]/60">
              Start a new scan to verify more environmental claims
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
