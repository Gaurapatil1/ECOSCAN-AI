import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Leaf, Target, Users, Heart } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export default function About() {
  const navigate = useNavigate();

  const team = [
    { name: 'Sarah Green', role: 'CEO & Founder', icon: '🌱' },
    { name: 'Michael Forest', role: 'CTO', icon: '🌲' },
    { name: 'Emma Ocean', role: 'Lead Scientist', icon: '🌊' },
    { name: 'David Sky', role: 'AI Engineer', icon: '☁️' },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F2F2F2]">
      <nav className="fixed top-0 w-full bg-[#0D0D0D]/80 backdrop-blur-lg z-50 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Leaf className="w-10 h-10 text-[#FF3B30]" />
            <span className="text-2xl font-bold">EcoScan AI</span>
          </motion.div>
          <Button onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About EcoScan AI</h1>
            <p className="text-xl text-[#F2F2F2]/80 max-w-3xl mx-auto">
              We're on a mission to fight greenwashing and environmental misinformation
              through the power of AI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                desc: 'Empower individuals to make informed environmental decisions by providing instant verification of sustainability claims.',
              },
              {
                icon: Heart,
                title: 'Our Values',
                desc: 'Transparency, accuracy, and accessibility drive everything we do. We believe everyone deserves the truth.',
              },
              {
                icon: Users,
                title: 'Our Community',
                desc: 'Join thousands of eco-conscious users fighting greenwashing and holding corporations accountable.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card>
                  <item.icon className="w-12 h-12 text-[#FF3B30] mb-4" />
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-[#F2F2F2]/70">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <Card>
              <h2 className="text-3xl font-bold mb-6 text-center">
                Why Environmental Transparency Matters
              </h2>
              <div className="space-y-4 text-[#F2F2F2]/80">
                <p>
                  In an era where greenwashing is rampant, consumers and activists need tools to
                  separate fact from fiction. Companies make bold environmental claims, but how
                  many are actually true?
                </p>
                <p>
                  EcoScan AI uses advanced artificial intelligence to analyze environmental claims,
                  cross-reference data with verified sources, and provide instant credibility
                  scores. We're building a world where transparency is the norm, not the exception.
                </p>
                <p>
                  Our platform has already helped verify thousands of claims, exposing misleading
                  marketing and celebrating genuine environmental progress. Together, we're
                  creating accountability in the fight against climate change.
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <Card>
                    <div className="text-center">
                      <div className="text-6xl mb-4">{member.icon}</div>
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-[#F2F2F2]/60">{member.role}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="bg-[#0D0D0D] border-t border-[#2A2A2A] py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Leaf className="w-8 h-8 text-[#FF3B30]" />
            <span className="text-2xl font-bold">EcoScan AI</span>
          </div>
          <p className="text-[#F2F2F2]/60">© 2025 EcoScan AI. Saving the planet, one scan at a time.</p>
        </div>
      </footer>
    </div>
  );
}
