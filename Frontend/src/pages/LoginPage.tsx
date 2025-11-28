import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
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
            Welcome Back
          </h1>
          <p className="text-center text-[#F2F2F2]/60 mb-8">
            Login to continue scanning
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/signup')}
              className="text-[#FFD60A] hover:text-[#FFE347] font-semibold transition-colors"
            >
              Create account
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
