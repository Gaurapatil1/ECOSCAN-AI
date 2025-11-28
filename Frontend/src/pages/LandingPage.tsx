import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Leaf, Shield, FileSearch, Camera, BarChart3, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import TypingEffect from '../components/TypingEffect';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Fake Climate News Detection',
      description: 'AI-powered detection of misleading environmental claims and greenwashing.',
    },
    {
      icon: BarChart3,
      title: 'Carbon Emission Claim Verifier',
      description: 'Verify corporate carbon emission reports and sustainability claims.',
    },
    {
      icon: FileSearch,
      title: 'Environmental Report Checker',
      description: 'Analyze and validate environmental impact reports instantly.',
    },
  ];

  const steps = [
    { icon: Camera, text: 'Scan or Upload' },
    { icon: Shield, text: 'AI Analysis' },
    { icon: CheckCircle2, text: 'Get Results' },
    { icon: Leaf, text: 'Save Planet' },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F2F2F2]">
      <nav className="fixed top-0 w-full bg-[#0D0D0D]/80 backdrop-blur-lg z-50 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Leaf className="w-10 h-10 text-[#FF3B30]" />
            <span className="text-2xl font-bold">EcoScan AI</span>
          </motion.div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="yellow" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'linear-gradient(135deg, #FF3B30 0%, #FFD60A 100%)',
              'linear-gradient(135deg, #FFD60A 0%, #FF3B30 100%)',
              'linear-gradient(135deg, #FF3B30 0%, #FFD60A 100%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Leaf className="w-24 h-24 mx-auto text-[#FF3B30]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            <TypingEffect text="Scan • Verify • Save the Planet." speed={80} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-[#F2F2F2]/80 mb-12 max-w-3xl mx-auto"
          >
            EcoScan AI helps detect fake environmental claims instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            <Button onClick={() => navigate('/signup')}>
              Get Started
            </Button>
            <Button variant="yellow" onClick={() => navigate('/dashboard/scan')}>
              Scan Now
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Powerful Features
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card>
                  <feature.icon className="w-16 h-16 text-[#FF3B30] mb-4" />
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-[#F2F2F2]/70">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#FF3B30] to-[#FFD60A] rounded-full flex items-center justify-center"
                >
                  <step.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold">{step.text}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#0D0D0D] border-t border-[#2A2A2A] py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Leaf className="w-8 h-8 text-[#FF3B30]" />
            <span className="text-2xl font-bold">EcoScan AI</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <a href="/about" className="hover:text-[#FF3B30] transition-colors">About</a>
            <a href="/contact" className="hover:text-[#FF3B30] transition-colors">Contact</a>
            <a href="/dashboard" className="hover:text-[#FF3B30] transition-colors">Dashboard</a>
          </div>
          <p className="text-[#F2F2F2]/60">© 2025 EcoScan AI. Saving the planet, one scan at a time.</p>
        </div>
      </footer>
    </div>
  );
}
