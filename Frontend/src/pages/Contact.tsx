import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Mail, MapPin, Phone } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F2F2F2]">
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, #FF3B30 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, #FFD60A 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, #FF3B30 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

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

      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-[#F2F2F2]/80 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll
              respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Your Name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <div>
                    <label className="block text-[#F2F2F2] font-semibold mb-2">
                      Message
                    </label>
                    <textarea
                      className="w-full px-4 py-3 bg-[#1A1A1A] border-2 border-[#2A2A2A] rounded-lg text-[#F2F2F2] focus:border-[#FF3B30] focus:outline-none transition-all min-h-[150px]"
                      placeholder="Tell us how we can help..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" variant="yellow" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <div className="flex items-start gap-4">
                    <Mail className="w-8 h-8 text-[#FF3B30] flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Email Us</h3>
                      <p className="text-[#F2F2F2]/70">support@ecoscan.ai</p>
                      <p className="text-[#F2F2F2]/70">info@ecoscan.ai</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <div className="flex items-start gap-4">
                    <Phone className="w-8 h-8 text-[#FFD60A] flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Call Us</h3>
                      <p className="text-[#F2F2F2]/70">+1 (555) 123-4567</p>
                      <p className="text-[#F2F2F2]/70 text-sm">Mon-Fri 9am-6pm EST</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-8 h-8 text-[#FF3B30] flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                      <p className="text-[#F2F2F2]/70">
                        123 Green Street
                        <br />
                        San Francisco, CA 94102
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card>
                  <div className="aspect-video bg-[#0D0D0D] rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-[#F2F2F2]/40">
                      <MapPin className="w-16 h-16" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
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
