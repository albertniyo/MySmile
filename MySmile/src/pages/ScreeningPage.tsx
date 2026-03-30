import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Check, Shield, Zap, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import NearbyClinics from "@/components/NearbyClinics";

const ScreeningPage = () => {
  // file handling states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // camera states
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (jpg, png, etc.)");
      return;
    }
    setSelectedFile(file);
    setError(null);
    setResult(null);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  // camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      setError(null);
    } catch (err) {
      setError("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
          if (blob) {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
            handleFile(file);
          }
        }, "image/jpeg", 0.9);
      }
      stopCamera();
    }
  };

  // API call
  const analyzeImage = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("https://mysmile-production.up.railway.app/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
    stopCamera();
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-50 border-red-200 text-red-800";
      case "medium":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default:
        return "bg-green-50 border-green-200 text-green-800";
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-40 pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-8 block">
              Modern Diagnostics
            </span>
            <h1 className="text-4xl md:text-7xl font-light text-stone-900 mb-10 uppercase tracking-tighter leading-none">
              Digital <br />
              <span className="italic font-serif normal-case text-stone-400">Screening</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-500 font-light leading-relaxed mb-12 max-w-lg">
              Experience the future of preventative care with our proprietary AI-powered digital assessment.
              Secure, precise, and completely remote.
            </p>

            <div className="space-y-6 mb-16">
              {[
                "High-precision image analysis",
                "Instant clinical feedback report",
                "Secure data encryption",
                "Specialist review included",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="w-5 h-5 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <span className="text-stone-600 font-light text-sm uppercase tracking-wider">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Button className="bg-stone-900 text-white px-14 py-8 rounded-full text-[10px] uppercase tracking-[0.3em] font-black hover:bg-stone-800 transition-all duration-500">
              Begin Assessment
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              {/* uploading */}
              {!selectedFile && !cameraActive && (
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                    dragActive ? "border-stone-500 bg-stone-50" : "border-stone-200"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <Upload className="mx-auto h-12 w-12 text-stone-400 mb-4" />
                    <p className="text-stone-600 mb-2">
                      Drag & drop or <span className="text-stone-900 underline">click to upload</span>
                    </p>
                    <p className="text-stone-400 text-sm">JPG, PNG (max 10MB)</p>
                  </label>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      onClick={startCamera}
                      className="border-stone-200 text-stone-700 hover:bg-stone-50"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Use Camera
                    </Button>
                  </div>
                </div>
              )}

              {/* camera view */}
              {cameraActive && (
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full rounded-xl border border-stone-200"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="flex justify-center gap-4 mt-4">
                    <Button onClick={capturePhoto} className="bg-stone-900 text-white">
                      Capture
                    </Button>
                    <Button variant="outline" onClick={stopCamera}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* image preview */}
              {selectedFile && imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full rounded-xl border border-stone-200"
                  />
                  <button
                    onClick={resetForm}
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                  >
                    <X className="h-5 w-5 text-stone-600" />
                  </button>
                </div>
              )}

              {/* analyze button */}
              {selectedFile && !loading && !result && (
                <div className="mt-6">
                  <Button
                    onClick={analyzeImage}
                    className="w-full bg-stone-900 text-white py-6 rounded-full text-sm uppercase tracking-wider"
                  >
                    Analyze Image
                  </Button>
                </div>
              )}

              {/* loading state */}
              {loading && (
                <div className="mt-6 text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-stone-400" />
                  <p className="text-stone-500 mt-4">Analyzing your oral health...</p>
                </div>
              )}

              {/* error state */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* result display */}
              {result && (
                <div className="mt-6 space-y-4">
                  <div className={`p-6 rounded-xl border ${getUrgencyColor(result.feedback.urgency_level)}`}>
                    <h3 className="text-xl font-bold mb-2">{result.predicted_class}</h3>
                    <p className="mb-2">
                      Confidence: <strong>{(result.probability * 100).toFixed(1)}%</strong>
                    </p>
                    <p className="text-sm">{result.feedback.main_message}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-stone-800 mb-2">Detailed Assessment</h4>
                    <ul className="list-disc list-inside space-y-1 text-stone-600">
                      {result.feedback.detailed_advice.map((advice: string, idx: number) => (
                        <li key={idx} className="text-sm">{advice}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-stone-800 mb-2">Recommendations</h4>
                    <ul className="list-decimal list-inside space-y-1 text-stone-600">
                      {result.feedback.recommendations.map((rec: string, idx: number) => (
                        <li key={idx} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="w-full mt-2 border-stone-200"
                  >
                    New Screening
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* features grid */}
      <section className="mt-40 border-t border-stone-100 pt-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-white border border-stone-100 rounded-full flex items-center justify-center text-stone-900 mx-auto mb-10 shadow-sm">
                <Camera size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-light uppercase tracking-[0.2em] mb-6">Capture</h3>
              <p className="text-stone-500 font-light leading-relaxed text-sm">
                Intuitive photography workflow designed for clinical precision.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white border border-stone-100 rounded-full flex items-center justify-center text-stone-900 mx-auto mb-10 shadow-sm">
                <Shield size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-light uppercase tracking-[0.2em] mb-6">Validate</h3>
              <p className="text-stone-500 font-light leading-relaxed text-sm">
                Automated cross-referencing against millions of clinical data points.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white border border-stone-100 rounded-full flex items-center justify-center text-stone-900 mx-auto mb-10 shadow-sm">
                <Zap size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-light uppercase tracking-[0.2em] mb-6">Consult</h3>
              <p className="text-stone-500 font-light leading-relaxed text-sm">
                Instant generation of a personalized wellness roadmap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* nearby clinics */}
      <div className="container mx-auto px-6">
        <NearbyClinics />
      </div>
    </div>
  );
};

export default ScreeningPage;