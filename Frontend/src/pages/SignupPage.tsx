import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#1A1A1A] rounded-2xl shadow-2xl p-8 border border-[#2A2A2A]">
          <div className="flex justify-center mb-6">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Leaf className="w-16 h-16 text-[#FF3B30]" />
            </motion.div>
          </div>

          <h1 className="text-3xl font-bold text-center text-[#F2F2F2] mb-2">
            Join EcoScan
          </h1>
          <p className="text-center text-[#F2F2F2]/60 mb-8">
            Start verifying environmental claims today
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />

            <Button type="submit" variant="yellow" className="w-full">
              Sign Up
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-[#F2F2F2]/60">Already have an account? </span>
            <button
              onClick={() => navigate('/login')}
              className="text-[#FF3B30] hover:text-[#FF5247] font-semibold transition-colors"
            >
              Login
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-[#F2F2F2]/60 hover:text-[#F2F2F2] text-sm transition-colors"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
