import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  onStartScreening?: () => void;
}

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg"
]
const Hero: React.FC<HeroProps> = ({ onStartScreening }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-center bg-stone-900">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "circOut" }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center grayscale transition-all duration-1000"
              style={{ backgroundImage: `url(${images[currentIndex]})` }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Overlay for aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/30 to-stone-900/80" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block text-stone-400 text-[10px] font-bold uppercase tracking-[0.5em] mb-8">
              EST. 2024 • ESSENTIAL WELLNESS
            </span>
            <h1 className="text-5xl md:text-8xl font-light text-white leading-[1.1] mb-10 uppercase tracking-tighter">
              The Art of <br />
              <span className="italic font-serif normal-case text-stone-400">Minimalist</span> Care
            </h1>

            <p className="text-lg md:text-xl text-stone-300 font-light mb-12 max-w-2xl leading-relaxed">
              We strip away the complexity of traditional dentistry to focus on what truly matters: your long-term oral health and aesthetic confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white text-stone-900 hover:bg-stone-100 hover:border-white border-transparent transition-all duration-500"
                onClick={onStartScreening}
              >
                Start Screening
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto text-white hover:text-stone-300 transition-all flex items-center gap-3"
              >
                View Journal <ArrowRight size={14} />
              </Button>
            </div>
          </motion.div>

          {/* Subtle Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-white/10 pt-12"
          >
            <div>
              <p className="text-white text-xl md:text-2xl font-light uppercase tracking-tighter mb-1">15k+</p>
              <p className="text-stone-500 text-[9px] font-bold uppercase tracking-[0.2em]">Care Sessions</p>
            </div>
            <div>
              <p className="text-white text-xl md:text-2xl font-light uppercase tracking-tighter mb-1">99%</p>
              <p className="text-stone-500 text-[9px] font-bold uppercase tracking-[0.2em]">Patient Rating</p>
            </div>
            <div>
              <p className="text-white text-xl md:text-2xl font-light uppercase tracking-tighter mb-1">05+</p>
              <p className="text-stone-500 text-[9px] font-bold uppercase tracking-[0.2em]">Modern Studios</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                   <div key={i} className="w-7 h-7 rounded-full border border-stone-800 bg-stone-700" />
                ))}
              </div>
              <p className="text-stone-500 text-[9px] font-bold uppercase tracking-[0.2em]">Certified Care</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vertical Progress Bar */}
      <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 items-center">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              "w-px transition-all duration-700",
              currentIndex === i ? "h-12 bg-white" : "h-6 bg-stone-700"
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;