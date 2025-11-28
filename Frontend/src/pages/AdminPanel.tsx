import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, Database, BarChart3, AlertCircle, Leaf, LogOut } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Users', value: '12,453', change: '+12%', icon: Users },
    { label: 'Scans Today', value: '1,847', change: '+8%', icon: FileText },
    { label: 'Reports Flagged', value: '234', change: '+3%', icon: AlertCircle },
    { label: 'API Calls', value: '45.2K', change: '+15%', icon: Database },
  ];

  const recentUsers = [
    { name: 'John Doe', email: 'john@example.com', joined: '2 days ago', scans: 45 },
    { name: 'Jane Smith', email: 'jane@example.com', joined: '5 days ago', scans: 32 },
    { name: 'Mike Johnson', email: 'mike@example.com', joined: '1 week ago', scans: 67 },
    { name: 'Sarah Williams', email: 'sarah@example.com', joined: '2 weeks ago', scans: 89 },
  ];

  const recentReports = [
    { id: 1, type: 'Carbon Report', status: 'verified', user: 'John Doe', time: '2h ago' },
    { id: 2, type: 'News Article', status: 'fake', user: 'Jane Smith', time: '4h ago' },
    { id: 3, type: 'Product Label', status: 'warning', user: 'Mike Johnson', time: '6h ago' },
    { id: 4, type: 'Sustainability', status: 'verified', user: 'Sarah Williams', time: '8h ago' },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <div className="flex">
        <aside className="w-64 bg-[#1A1A1A] border-r border-[#2A2A2A] h-screen fixed left-0 top-0">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <Leaf className="w-8 h-8 text-[#FF3B30]" />
              <span className="text-xl font-bold text-[#F2F2F2]">Admin Panel</span>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'users', label: 'Manage Users', icon: Users },
                { id: 'reports', label: 'Manage Reports', icon: FileText },
                { id: 'database', label: 'Database', icon: Database },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05, x: 5 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-[#FF3B30] text-white'
                      : 'text-[#F2F2F2]/70 hover:bg-[#2A2A2A]'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-semibold">{item.label}</span>
                </motion.button>
              ))}
            </nav>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#F2F2F2]/70 hover:bg-[#2A2A2A] hover:text-[#FF3B30] transition-all mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-semibold">Exit Admin</span>
            </motion.button>
          </div>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <div className="text-[#F2F2F2]">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-[#F2F2F2]/60">Manage and monitor EcoScan AI platform</p>
            </motion.div>

            {activeTab === 'overview' && (
              <>
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <div className="flex items-center justify-between mb-4">
                          <stat.icon className="w-8 h-8 text-[#FF3B30]" />
                          <span className="text-green-500 text-sm font-bold">
                            {stat.change}
                          </span>
                        </div>
                        <p className="text-[#F2F2F2]/60 text-sm">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card>
                      <h2 className="text-2xl font-bold mb-6">API Usage</h2>
                      <div className="space-y-4">
                        {[
                          { endpoint: '/api/scan', calls: '18.5K', status: 'healthy' },
                          { endpoint: '/api/verify', calls: '12.3K', status: 'healthy' },
                          { endpoint: '/api/analyze', calls: '9.8K', status: 'warning' },
                          { endpoint: '/api/reports', calls: '4.6K', status: 'healthy' },
                        ].map((api, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-[#0D0D0D] rounded-lg"
                          >
                            <div>
                              <p className="font-semibold">{api.endpoint}</p>
                              <p className="text-sm text-[#F2F2F2]/60">{api.calls} calls</p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                api.status === 'healthy'
                                  ? 'bg-green-500/20 text-green-500'
                                  : 'bg-yellow-500/20 text-yellow-500'
                              }`}
                            >
                              {api.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card>
                      <h2 className="text-2xl font-bold mb-6">Recent Reports</h2>
                      <div className="space-y-4">
                        {recentReports.map((report) => (
                          <div
                            key={report.id}
                            className="flex items-center justify-between p-4 bg-[#0D0D0D] rounded-lg"
                          >
                            <div>
                              <p className="font-semibold">{report.type}</p>
                              <p className="text-sm text-[#F2F2F2]/60">
                                {report.user} • {report.time}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                                report.status === 'verified'
                                  ? 'bg-green-500/20 text-green-500'
                                  : report.status === 'warning'
                                  ? 'bg-yellow-500/20 text-yellow-500'
                                  : 'bg-red-500/20 text-red-500'
                              }`}
                            >
                              {report.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </>
            )}

            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">User Management</h2>
                    <Button variant="yellow">Add User</Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#2A2A2A]">
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Joined</th>
                          <th className="text-left py-3 px-4">Scans</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentUsers.map((user, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-[#2A2A2A] hover:bg-[#0D0D0D]"
                          >
                            <td className="py-3 px-4 font-semibold">{user.name}</td>
                            <td className="py-3 px-4 text-[#F2F2F2]/60">{user.email}</td>
                            <td className="py-3 px-4 text-[#F2F2F2]/60">{user.joined}</td>
                            <td className="py-3 px-4">{user.scans}</td>
                            <td className="py-3 px-4">
                              <Button variant="outline" className="!py-1 !px-3 !text-sm">
                                View
                              </Button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'reports' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <h2 className="text-2xl font-bold mb-6">Report Management</h2>
                  <div className="space-y-4">
                    {recentReports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-[#0D0D0D] rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{report.type}</h3>
                            <p className="text-[#F2F2F2]/60">
                              Submitted by {report.user} • {report.time}
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Button variant="outline" className="!py-2 !px-4">
                              Review
                            </Button>
                            <Button variant="yellow" className="!py-2 !px-4">
                              Approve
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'database' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <h2 className="text-2xl font-bold mb-6">Database Management</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { label: 'Total Records', value: '156,834' },
                        { label: 'Storage Used', value: '2.4 GB' },
                        { label: 'Last Backup', value: '2h ago' },
                      ].map((item, index) => (
                        <div key={index} className="p-4 bg-[#0D0D0D] rounded-lg">
                          <p className="text-[#F2F2F2]/60 text-sm mb-1">{item.label}</p>
                          <p className="text-2xl font-bold">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button>Backup Database</Button>
                      <Button variant="outline">Export Data</Button>
                      <Button variant="yellow">Add Fake Data</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
