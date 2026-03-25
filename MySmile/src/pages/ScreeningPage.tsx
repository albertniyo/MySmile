import React from "react";
import { motion } from "framer-motion";
import { Camera, Check, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScreeningPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 pt-40 pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-8 block">Modern Diagnostics</span>
            <h1 className="text-4xl md:text-7xl font-light text-stone-900 mb-10 uppercase tracking-tighter leading-none">
              Digital <br /><span className="italic font-serif normal-case text-stone-400">Screening</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-500 font-light leading-relaxed mb-12 max-w-lg">
              Experience the future of preventative care with our proprietary AI-powered digital assessment. Secure, precise, and completely remote.
            </p>
            
            <div className="space-y-6 mb-16">
              {[
                "High-precision image analysis",
                "Instant clinical feedback report",
                "Secure data encryption",
                "Specialist review included"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="w-5 h-5 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <span className="text-stone-600 font-light text-sm uppercase tracking-wider">{item}</span>
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
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative">
              <img 
                src="10.jpg" 
                className="w-full h-full object-cover grayscale-[0.5] contrast-[1.1]"
                alt="Dental Screening"
              />
              <div className="absolute inset-0 bg-stone-900/5 mix-blend-overlay" />
            </div>
            
            {/* floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl max-w-xs hidden md:block border border-white/20">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center text-white">
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-[9px] tracking-[0.2em] text-stone-400">Precision</h4>
                  <p className="text-stone-900 font-light text-lg tracking-tighter">99.8% Core Accuracy</p>
                </div>
              </div>
              <p className="text-stone-500 text-xs font-light leading-relaxed uppercase tracking-wider">
                Our model is trained on elite clinical datasets to ensure medical-grade diagnostic results.
              </p>
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
              <p className="text-stone-500 font-light leading-relaxed text-sm">Intuitive photography workflow designed for clinical precision.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white border border-stone-100 rounded-full flex items-center justify-center text-stone-900 mx-auto mb-10 shadow-sm">
                <Shield size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-light uppercase tracking-[0.2em] mb-6">Validate</h3>
              <p className="text-stone-500 font-light leading-relaxed text-sm">Automated cross-referencing against millions of clinical data points.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white border border-stone-100 rounded-full flex items-center justify-center text-stone-900 mx-auto mb-10 shadow-sm">
                <Zap size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-light uppercase tracking-[0.2em] mb-6">Consult</h3>
              <p className="text-stone-500 font-light leading-relaxed text-sm">Instant generation of a personalized wellness roadmap.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScreeningPage;