import { motion } from 'framer-motion';
import { useState } from 'react';
import { Upload, Building2 } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Loader from '../components/Loader';

// API service for carbon verification
const carbonVerificationAPI = {
  verifyReport: async (companyName: string, industry: string, file: File) => {
    const formData = new FormData();
    formData.append('company_name', companyName);
    formData.append('industry', industry);
    formData.append('file', file);

    const response = await fetch('http://localhost:8000/verify-carbon-report', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Verification failed: ${response.statusText}`);
    }

    return await response.json();
  },
};

export default function CarbonVerifier() {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('default');
  const [file, setFile] = useState<File | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    status: 'verified' | 'warning' | 'rejected';
    percentage: number;
    details: string;
    total_emissions?: number;
    industry_standard?: number;
    analysis_id?: string;
    timestamp?: string;
  } | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName || !file) {
      setError('Please provide company name and upload a report file');
      return;
    }

    setVerifying(true);
    setError(null);
    setResult(null);

    try {
      const verificationResult = await carbonVerificationAPI.verifyReport(
        companyName,
        industry,
        file
      );

      setResult({
        status: verificationResult.status,
        percentage: verificationResult.percentage,
        details: verificationResult.details,
        total_emissions: verificationResult.total_emissions,
        industry_standard: verificationResult.industry_standard,
        analysis_id: verificationResult.analysis_id,
        timestamp: verificationResult.timestamp,
      });
    } catch (err) {
      console.error('Verification error:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify carbon report');
    } finally {
      setVerifying(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      const allowedTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
        'application/csv'
      ];
      
      if (!allowedTypes.includes(selectedFile.type) && 
          !selectedFile.name.match(/\.(csv|xlsx|xls)$/i)) {
        setError('Please upload a CSV or Excel file');
        return;
      }
      
      setFile(selectedFile);
      setError(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'warning':
        return 'Needs Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const resetForm = () => {
    setCompanyName('');
    setIndustry('default');
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="text-[#F2F2F2] max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Carbon Emission Verifier</h1>
        <p className="text-[#F2F2F2]/60">
          Verify corporate carbon emission reports and sustainability claims
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                type="text"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
              
              <div>
                <label className="block text-[#F2F2F2] font-semibold mb-2">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg text-[#F2F2F2] focus:outline-none focus:border-[#FF3B30]"
                >
                  <option value="default">Select Industry</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="technology">Technology</option>
                  <option value="energy">Energy</option>
                  <option value="transportation">Transportation</option>
                  <option value="retail">Retail</option>
                  <option value="construction">Construction</option>
                  <option value="agriculture">Agriculture</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#F2F2F2] font-semibold mb-2">
                Upload Report Document (CSV or Excel)
              </label>
              <div className="border-2 border-dashed border-[#2A2A2A] rounded-lg p-8 text-center hover:border-[#FF3B30] transition-colors">
                <Upload className="w-12 h-12 text-[#F2F2F2]/40 mx-auto mb-4" />
                <p className="text-[#F2F2F2]/60 mb-4">
                  {file ? file.name : 'Drop CSV or Excel files here or click to upload'}
                </p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".csv,.xlsx,.xls,.application/vnd.ms-excel,.application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onChange={handleFileChange}
                    required
                  />
                  <Button type="button" variant="outline">
                    Choose File
                  </Button>
                </label>
                <p className="text-sm text-[#F2F2F2]/40 mt-2">
                  Supported formats: CSV, XLSX, XLS
                </p>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
              >
                <p className="text-red-300">{error}</p>
              </motion.div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={verifying || !companyName || !file}
            >
              {verifying ? 'Verifying...' : 'Verify Emission Claims'}
            </Button>
          </form>
        </Card>
      </motion.div>

      {verifying && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card>
            <div className="text-center py-12">
              <Loader />
              <p className="text-[#F2F2F2]/60 mt-6">
                Analyzing emission report...
              </p>
              <p className="text-[#F2F2F2]/40 text-sm mt-2">
                Comparing with industry standards and validating data
              </p>
            </div>
          </Card>
        </motion.div>
      )}

      {result && !verifying && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card>
            <div className="flex items-start gap-4 mb-6">
              <Building2 className="w-12 h-12 text-[#FF3B30]" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{companyName}</h3>
                <p className="text-[#F2F2F2]/60">Verification Results</p>
                {result.analysis_id && (
                  <p className="text-[#F2F2F2]/40 text-sm mt-1">
                    Analysis ID: {result.analysis_id}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Verification Status</span>
                <span className="capitalize font-bold">
                  {getStatusText(result.status)}
                </span>
              </div>
              <div className="w-full bg-[#2A2A2A] rounded-full h-6 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.percentage}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className={`h-full flex items-center justify-center text-sm font-bold ${getStatusColor(
                    result.status
                  )}`}
                >
                  {result.percentage}%
                </motion.div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#0D0D0D] rounded-lg">
                <h4 className="font-bold mb-2">Analysis Details</h4>
                <p className="text-[#F2F2F2]/80">{result.details}</p>
                
                {(result.total_emissions !== undefined && result.industry_standard !== undefined) && (
                  <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-[#F2F2F2]/60">Reported Emissions: </span>
                      <span className="font-semibold">{result.total_emissions.toLocaleString()} tons</span>
                    </div>
                    <div>
                      <span className="text-[#F2F2F2]/60">Industry Standard: </span>
                      <span className="font-semibold">{result.industry_standard.toLocaleString()} tons</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#0D0D0D] rounded-lg text-center">
                  <div
                    className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                      result.status === 'verified' ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  />
                  <p className="text-sm text-[#F2F2F2]/60">Data Accuracy</p>
                </div>
                <div className="p-4 bg-[#0D0D0D] rounded-lg text-center">
                  <div
                    className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                      result.status === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}
                  />
                  <p className="text-sm text-[#F2F2F2]/60">Inconsistencies</p>
                </div>
                <div className="p-4 bg-[#0D0D0D] rounded-lg text-center">
                  <div
                    className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                      result.status !== 'rejected' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <p className="text-sm text-[#F2F2F2]/60">Compliance</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button onClick={resetForm} variant="outline">
                Verify Another Report
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}