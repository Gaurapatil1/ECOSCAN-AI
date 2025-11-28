import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Loader from '../components/Loader';

export default function FakeNewsChecker() {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    credibilityScore: number;
    sourceReliability: string;
    keyProblems: string[];
    verdict: 'credible' | 'questionable' | 'misleading';
  } | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        credibilityScore: 72,
        sourceReliability: 'Moderate',
        keyProblems: [
          'Lacks peer-reviewed citations',
          'Uses emotional language',
          'Source has mixed fact-checking history',
        ],
        verdict: 'questionable',
      });
    }, 2500);
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'credible':
        return 'text-green-500';
      case 'questionable':
        return 'text-yellow-500';
      case 'misleading':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'credible':
        return CheckCircle2;
      case 'questionable':
        return AlertTriangle;
      case 'misleading':
        return XCircle;
      default:
        return CheckCircle2;
    }
  };

  return (
    <div className="text-[#F2F2F2] max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Fake News Checker</h1>
        <p className="text-[#F2F2F2]/60">
          Verify the credibility of environmental news and claims
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div>
              <Input
                label="Article URL or Text"
                type="text"
                placeholder="https://example.com/article or paste text here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <Button type="submit" variant="yellow" className="w-full" disabled={analyzing}>
              {analyzing ? 'Analyzing...' : 'Analyze Claims'}
            </Button>
          </form>
        </Card>
      </motion.div>

      {analyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card>
            <div className="text-center py-12">
              <Loader />
              <p className="text-[#F2F2F2]/60 mt-6">
                Analyzing claim credibility...
              </p>
            </div>
          </Card>
        </motion.div>
      )}

      {result && !analyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-6"
        >
          <Card>
            <div className="flex items-center gap-4 mb-6">
              {(() => {
                const Icon = getVerdictIcon(result.verdict);
                return <Icon className={`w-12 h-12 ${getVerdictColor(result.verdict)}`} />;
              })()}
              <div>
                <h3 className="text-2xl font-bold capitalize">{result.verdict}</h3>
                <p className="text-[#F2F2F2]/60">Analysis Complete</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2">Credibility Score</h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="w-full bg-[#2A2A2A] rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.credibilityScore}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${
                          result.credibilityScore >= 70
                            ? 'from-green-500 to-green-600'
                            : result.credibilityScore >= 40
                            ? 'from-yellow-500 to-yellow-600'
                            : 'from-red-500 to-red-600'
                        }`}
                      />
                    </div>
                  </div>
                  <span className="text-2xl font-bold">{result.credibilityScore}%</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-2">Source Reliability</h4>
                <div
                  className={`inline-block px-4 py-2 rounded-lg font-bold ${
                    result.sourceReliability === 'High'
                      ? 'bg-green-500/20 text-green-500'
                      : result.sourceReliability === 'Moderate'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : 'bg-red-500/20 text-red-500'
                  }`}
                >
                  {result.sourceReliability}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h4 className="font-bold text-xl mb-4">Key Problems Identified</h4>
            <ul className="space-y-3">
              {result.keyProblems.map((problem, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-[#0D0D0D] rounded-lg"
                >
                  <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                  <span>{problem}</span>
                </motion.li>
              ))}
            </ul>
          </Card>

          <div className="text-center">
            <Button onClick={() => setResult(null)} variant="outline">
              Check Another Claim
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
