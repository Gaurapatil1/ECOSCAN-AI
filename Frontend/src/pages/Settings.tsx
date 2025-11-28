import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, Lock, Moon, Sun } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowProfileModal(false);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert('Passwords do not match');
      return;
    }
    setShowPasswordModal(false);
    setPassword({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="text-[#F2F2F2] max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-[#F2F2F2]/60">Manage your account and preferences</p>
      </motion.div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <User className="w-8 h-8 text-[#FF3B30]" />
                <div>
                  <h3 className="text-xl font-bold">Profile Settings</h3>
                  <p className="text-[#F2F2F2]/60">Update your profile information</p>
                </div>
              </div>
              <Button onClick={() => setShowProfileModal(true)}>
                Edit Profile
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Lock className="w-8 h-8 text-[#FF3B30]" />
                <div>
                  <h3 className="text-xl font-bold">Change Password</h3>
                  <p className="text-[#F2F2F2]/60">Update your account password</p>
                </div>
              </div>
              <Button onClick={() => setShowPasswordModal(true)}>
                Change
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {darkMode ? (
                  <Moon className="w-8 h-8 text-[#FF3B30]" />
                ) : (
                  <Sun className="w-8 h-8 text-[#FFD60A]" />
                )}
                <div>
                  <h3 className="text-xl font-bold">Appearance</h3>
                  <p className="text-[#F2F2F2]/60">
                    {darkMode ? 'Dark Mode' : 'Light Mode'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-16 h-8 rounded-full transition-all ${
                  darkMode ? 'bg-[#FF3B30]' : 'bg-[#FFD60A]'
                }`}
              >
                <motion.div
                  animate={{ x: darkMode ? 32 : 0 }}
                  className="w-8 h-8 bg-white rounded-full shadow-lg"
                />
              </button>
            </div>
          </Card>
        </motion.div>
      </div>

      {showProfileModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setShowProfileModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1A1A1A] rounded-2xl p-8 max-w-md w-full border border-[#2A2A2A]"
          >
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
              />
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {showPasswordModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setShowPasswordModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1A1A1A] rounded-2xl p-8 max-w-md w-full border border-[#2A2A2A]"
          >
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={password.current}
                onChange={(e) => setPassword({ ...password, current: e.target.value })}
                required
              />
              <Input
                label="New Password"
                type="password"
                value={password.new}
                onChange={(e) => setPassword({ ...password, new: e.target.value })}
                required
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={password.confirm}
                onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                required
              />
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  Update Password
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
