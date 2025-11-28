// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { Camera, Upload, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
// import Button from '../components/Button';
// import Card from '../components/Card';
// import Loader from '../components/Loader';

// export default function ScanPage() {
//   const [scanning, setScanning] = useState(false);
//   const [result, setResult] = useState<{
//     status: 'verified' | 'warning' | 'fake';
//     score: number;
//     message: string;
//   } | null>(null);

//   const handleScan = () => {
//     setScanning(true);
//     setResult(null);

//     setTimeout(() => {
//       setScanning(false);
//       setResult({
//         status: 'verified',
//         score: 85,
//         message: 'This environmental claim appears to be legitimate based on verified sources.',
//       });
//     }, 3000);
//   };

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       handleScan();
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'verified':
//         return 'from-green-500 to-green-600';
//       case 'warning':
//         return 'from-yellow-500 to-yellow-600';
//       case 'fake':
//         return 'from-red-500 to-red-600';
//       default:
//         return 'from-gray-500 to-gray-600';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'verified':
//         return CheckCircle2;
//       case 'warning':
//         return AlertTriangle;
//       case 'fake':
//         return XCircle;
//       default:
//         return CheckCircle2;
//     }
//   };

//   return (
//     <div className="text-[#F2F2F2] max-w-4xl mx-auto">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-8"
//       >
//         <h1 className="text-4xl font-bold mb-2">Real-Time Scan</h1>
//         <p className="text-[#F2F2F2]/60">
//           Upload or scan environmental claims to verify their authenticity
//         </p>
//       </motion.div>

//       <div className="grid md:grid-cols-2 gap-6 mb-8">
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.1 }}
//         >
//           <Card>
//             <div className="text-center">
//               <Upload className="w-16 h-16 text-[#FF3B30] mx-auto mb-4" />
//               <h3 className="text-xl font-bold mb-2">Upload File</h3>
//               <p className="text-[#F2F2F2]/60 mb-6">
//                 Upload images, documents, or reports
//               </p>
//               <label className="cursor-pointer">
//                 <input
//                   type="file"
//                   className="hidden"
//                   accept="image/*,.pdf,.doc,.docx"
//                   onChange={handleFileUpload}
//                 />
//                 <Button variant="yellow" className="w-full">
//                   Choose File
//                 </Button>
//               </label>
//             </div>
//           </Card>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <Card>
//             <div className="text-center">
//               <Camera className="w-16 h-16 text-[#FFD60A] mx-auto mb-4" />
//               <h3 className="text-xl font-bold mb-2">Use Camera</h3>
//               <p className="text-[#F2F2F2]/60 mb-6">
//                 Scan directly from your device camera
//               </p>
//               <Button onClick={handleScan} className="w-full">
//                 Open Camera
//               </Button>
//             </div>
//           </Card>
//         </motion.div>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3 }}
//       >
//         <Card>
//           <div className="text-center py-8">
//             <h3 className="text-2xl font-bold mb-6">Ready to Scan</h3>
//             {scanning ? (
//               <div className="space-y-6">
//                 <Loader />
//                 <p className="text-[#F2F2F2]/60">
//                   Analyzing environmental claim...
//                 </p>
//               </div>
//             ) : result ? (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="space-y-6"
//               >
//                 <div
//                   className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${getStatusColor(
//                     result.status
//                   )} flex items-center justify-center`}
//                 >
//                   {(() => {
//                     const Icon = getStatusIcon(result.status);
//                     return <Icon className="w-16 h-16 text-white" />;
//                   })()}
//                 </div>

//                 <div>
//                   <h4 className="text-3xl font-bold mb-2 capitalize">{result.status}</h4>
//                   <div className="mb-4">
//                     <div className="w-full bg-[#2A2A2A] rounded-full h-4 overflow-hidden">
//                       <motion.div
//                         initial={{ width: 0 }}
//                         animate={{ width: `${result.score}%` }}
//                         transition={{ duration: 1, ease: 'easeOut' }}
//                         className={`h-full bg-gradient-to-r ${getStatusColor(result.status)}`}
//                       />
//                     </div>
//                     <p className="text-sm text-[#F2F2F2]/60 mt-2">
//                       Trust Score: {result.score}%
//                     </p>
//                   </div>
//                   <p className="text-[#F2F2F2]/80">{result.message}</p>
//                 </div>

//                 <Button onClick={() => setResult(null)} variant="outline">
//                   Scan Another
//                 </Button>
//               </motion.div>
//             ) : (
//               <div className="space-y-4">
//                 <p className="text-[#F2F2F2]/60 mb-6">
//                   Select a method above to start scanning
//                 </p>
//                 <Button onClick={handleScan}>
//                   Run EcoScan
//                 </Button>
//               </div>
//             )}
//           </div>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }






// src/pages/ScanPage.jsx
// src/pages/ScanPage.tsx
// src/Nice but these is error like installation

import React, { useState, useRef } from 'react';
import { apiService, AnalysisResponse } from '../services/api';

interface QuickItem {
  name: string;
  emoji: string;
  category: string;
}

const ScanPage: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const quickItems: QuickItem[] = [
    { name: 'Plastic Bottle', emoji: '🧴', category: 'plastic' },
    { name: 'Pizza Box', emoji: '🍕', category: 'paper' },
    { name: 'Battery', emoji: '🔋', category: 'electronic' },
    { name: 'Glass Jar', emoji: '🥫', category: 'glass' },
    { name: 'Aluminum Can', emoji: '🥤', category: 'metal' },
    { name: 'Food Waste', emoji: '🍎', category: 'organic' },
    { name: 'Clothing', emoji: '👕', category: 'textile' },
    { name: 'Electronics', emoji: '📱', category: 'electronic' }
  ];

  const startCamera = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
        setCapturedImage(null);
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = (): void => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const captureImage = (): void => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);
        stopCamera();
        
        setTimeout(() => {
          const input = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (input) input.focus();
        }, 500);
      }
    }
  };

  const retakePhoto = (): void => {
    setCapturedImage(null);
    startCamera();
  };

  const handleAnalyze = async (): Promise<void> => {
    if (!description.trim()) {
      setError('Please describe the item');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const result = await apiService.analyzeWaste(description);
      setTimeout(() => {
        setAnalysis(result);
      }, 600);
    } catch (err) {
      setError('Failed to analyze item. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickItem = (item: QuickItem): void => {
    setDescription(item.name);
    setTimeout(handleAnalyze, 100);
  };

  const getCategoryColor = (category?: string): string => {
    const colors: { [key: string]: string } = {
      plastic: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30 text-blue-200',
      paper: 'from-amber-500/20 to-orange-500/20 border-amber-400/30 text-amber-200',
      electronic: 'from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-200',
      glass: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/30 text-emerald-200',
      metal: 'from-slate-500/20 to-gray-500/20 border-slate-400/30 text-slate-200',
      organic: 'from-lime-500/20 to-green-500/20 border-lime-400/30 text-lime-200',
      hazardous: 'from-rose-500/20 to-red-500/20 border-rose-400/30 text-rose-200',
      textile: 'from-pink-500/20 to-rose-500/20 border-pink-400/30 text-pink-200'
    };
    return colors[category || ''] || 'from-gray-500/20 to-gray-600/20 border-gray-400/30 text-gray-200';
  };

  const getCategory = (analysis: AnalysisResponse): string => {
    return analysis.category || 'general';
  };

  const getRecyclingCode = (analysis: AnalysisResponse): string => {
    return analysis.recycling_code || 'Not specified';
  };

  const getSpecialNotes = (analysis: AnalysisResponse): string => {
    return analysis.special_notes || 'No special notes';
  };

  const getAnalysisTime = (analysis: AnalysisResponse): string => {
    return analysis.analysis_time ? `${analysis.analysis_time}s` : 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-8">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(1deg); }
          66% { transform: translateY(-4px) rotate(-1deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
          50% { box-shadow: 0 0 30px rgba(236, 72, 153, 0.5), 0 0 40px rgba(192, 132, 252, 0.3); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0px) scale(1); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl mb-6 shadow-2xl animate-float relative">
            <span className="text-4xl">♻️</span>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-400 to-rose-600 blur-lg opacity-50 animate-pulse-glow"></div>
          </div>
          <h1 className="text-6xl font-black text-white mb-6 bg-gradient-to-r from-pink-300 via-rose-300 to-violet-300 bg-clip-text text-transparent">
            EcoScan
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Transform your waste management with AI-powered environmental scanning
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Camera & Input */}
          <div className="lg:col-span-2 space-y-8">
            {/* Camera Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700/50 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-pink-500/30">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-2xl">📸</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Capture Item</h2>
                  <p className="text-gray-400 font-light">Scan any object with your camera</p>
                </div>
              </div>

              {!cameraActive && !capturedImage && (
                <div className="text-center py-16 border-2 border-dashed border-gray-600/50 rounded-2xl mb-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:border-pink-500/50 transition-all duration-500 group">
                  <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🌿</div>
                  <p className="text-gray-400 mb-6 text-lg">Ready to scan your item</p>
                  <button
                    onClick={startCamera}
                    className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-pink-600 hover:to-rose-700 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 animate-glow"
                  >
                    <span className="flex items-center justify-center">
                      <span className="mr-3 text-xl">📸</span>
                      Launch Scanner
                    </span>
                  </button>
                </div>
              )}

              {cameraActive && (
                <div className="space-y-6">
                  <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-pink-500/20">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 ring-4 ring-pink-500/10 rounded-2xl pointer-events-none"></div>
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                      <button
                        onClick={captureImage}
                        className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 active:scale-95 border border-white/20"
                      >
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full border-4 border-white/80 shadow-inner"></div>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={stopCamera}
                    className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 rounded-2xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-600"
                  >
                    <span className="flex items-center justify-center">
                      <span className="mr-3">⏹️</span>
                      Stop Scanner
                    </span>
                  </button>
                </div>
              )}

              {capturedImage && (
                <div className="space-y-6 animate-slide-up">
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-pink-500/30">
                    <img
                      src={capturedImage}
                      alt="Captured item"
                      className="w-full h-80 object-contain"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
                      📸 Captured
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={retakePhoto}
                      className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 rounded-2xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-gray-600"
                    >
                      <span className="flex items-center justify-center">
                        <span className="mr-3">🔄</span>
                        Retake
                      </span>
                    </button>
                    <button
                      onClick={startCamera}
                      className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                      <span className="flex items-center justify-center">
                        <span className="mr-3">✨</span>
                        New Scan
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Input Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700/50 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-rose-500/30">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">AI Analysis</h2>
                  <p className="text-gray-400 font-light">Describe your item for detailed insights</p>
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
                    Item Description
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., plastic water bottle, used battery, food container..."
                    className="w-full px-6 py-5 bg-gray-800 border border-gray-600 rounded-2xl focus:ring-4 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-300 text-lg text-white placeholder-gray-500 shadow-inner hover:border-gray-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                  />
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={loading || !description.trim()}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-5 px-6 rounded-2xl font-black text-lg hover:from-rose-600 hover:to-pink-700 disabled:from-gray-700 disabled:to-gray-800 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  {loading ? (
                    <div className="flex items-center justify-center relative">
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-4"></div>
                      Analyzing with AI...
                    </div>
                  ) : (
                    <span className="flex items-center justify-center relative">
                      <span className="mr-3 text-xl">🚀</span>
                      Analyze Environmental Impact
                    </span>
                  )}
                </button>

                {error && (
                  <div className="p-5 bg-gradient-to-r from-rose-900/50 to-red-900/50 border border-rose-700/50 rounded-2xl text-rose-200 animate-slide-up backdrop-blur-sm">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">⚠️</span>
                      <span className="font-semibold">{error}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Items */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700/50 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-violet-500/30">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="mr-4 bg-gradient-to-br from-violet-500 to-purple-600 p-3 rounded-2xl">⚡</span>
                Quick Scan Items
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickItem(item)}
                    className={`p-5 border-2 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 text-center shadow-lg hover:shadow-xl backdrop-blur-sm bg-gradient-to-br ${getCategoryColor(item.category)} border-opacity-30 hover:border-opacity-50`}
                  >
                    <div className="text-3xl mb-3 transform hover:scale-110 transition-transform duration-300">
                      {item.emoji}
                    </div>
                    <div className="text-sm font-bold mb-1">{item.name}</div>
                    <div className="text-xs opacity-75 capitalize font-light">{item.category}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-8">
            {analysis && (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700/50 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">Analysis Results</h3>
                  <span className={`px-4 py-2 rounded-full text-sm font-black border bg-gradient-to-r ${getCategoryColor(getCategory(analysis))} border-opacity-30`}>
                    {getCategory(analysis).toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-5">
                  {[
                    { icon: '📦', title: 'Material Composition', content: analysis.material, color: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30' },
                    { icon: '🗑️', title: 'Disposal Method', content: analysis.disposal, color: 'from-amber-500/20 to-orange-500/20 border-amber-400/30' },
                    { icon: '🌱', title: 'Environmental Impact', content: analysis.impact, color: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/30' },
                    { icon: '💡', title: 'Sustainable Alternative', content: analysis.alternative, color: 'from-green-500/20 to-lime-500/20 border-green-400/30' },
                    { icon: '♻️', title: 'Recycling Code', content: getRecyclingCode(analysis), color: 'from-purple-500/20 to-pink-500/20 border-purple-400/30' },
                    { icon: '📝', title: 'Special Notes', content: getSpecialNotes(analysis), color: 'from-gray-500/20 to-gray-600/20 border-gray-400/30' }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-xl border bg-gradient-to-r ${item.color} backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-3">{item.icon}</span>
                        <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed">{item.content}</p>
                    </div>
                  ))}

                  <div className="text-center text-sm text-gray-400 pt-5 border-t border-gray-700/50 font-light">
                    Analysis completed in {getAnalysisTime(analysis)}
                  </div>
                </div>
              </div>
            )}

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-violet-600 rounded-3xl shadow-2xl p-7 text-white hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
              <h4 className="font-black text-xl mb-6 flex items-center group-hover:scale-105 transition-transform duration-300">
                <span className="mr-3 text-2xl">🌍</span>
                Environmental Impact
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span className="text-white/90 font-light">Items Analyzed</span>
                  <span className="font-black text-white text-lg">1,247</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span className="text-white/90 font-light">Waste Diverted</span>
                  <span className="font-black text-white text-lg">2.3 tons</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/90 font-light">CO₂ Reduced</span>
                  <span className="font-black text-white text-lg">4.1 tons</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="text-center text-white/70 text-sm font-light">
                  Making the planet greener, one scan at a time 🌿
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-3xl border border-violet-500/20 p-7 shadow-2xl backdrop-blur-sm">
              <h4 className="font-bold text-white mb-4 flex items-center">
                <span className="mr-3 text-xl">💫</span>
                Pro Tip
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                For best results, ensure good lighting and capture the item from multiple angles. 
                The AI analyzes material composition and provides eco-friendly disposal guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;