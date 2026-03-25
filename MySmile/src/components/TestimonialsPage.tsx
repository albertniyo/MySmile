import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Eleanor Vance",
    role: "Creative Director",
    content: "MySmile has completely redefined my perspective on dental wellness. The atmosphere is as thoughtful as the clinical care.",
    rating: 5,
    initial: "E"
  },
  {
    name: "Julian Brooks",
    role: "Architect",
    content: "The attention to structural detail and the minimalist approach is refreshing. I've never felt more confident in a provider.",
    rating: 5,
    initial: "J"
  },
  {
    name: "Sophia Chen",
    role: "UX Designer",
    content: "A beautiful fusion of high-end technology and human-centric care. The digital screening was remarkably seamless.",
    rating: 5,
    initial: "S"
  },
  {
    name: "Marcus Thorne",
    role: "Entrepreneur",
    content: "Exceptional professionalism from start to finish. The team is dedicated to a truly superior patient experience.",
    rating: 5,
    initial: "M"
  }
];

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 pt-40 pb-24">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-8 block">Patient Journal</span>
          <h1 className="text-5xl md:text-8xl font-light text-stone-900 mb-10 uppercase tracking-tighter">
            Voices of <span className="italic font-serif normal-case text-stone-400">Trust</span>
          </h1>
          <div className="h-px w-20 bg-stone-200 mx-auto mb-10" />
          <p className="text-lg md:text-xl text-stone-500 font-light leading-relaxed max-w-2xl mx-auto uppercase tracking-wide">
            Curated reflections from our patients on clinical excellence and essential design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-40">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="bg-white p-12 md:p-16 rounded-[3rem] shadow-sm border border-stone-100 relative group hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.08)] transition-all duration-1000"
            >
              <div className="absolute top-12 right-12 text-stone-50 group-hover:text-stone-100 transition-colors duration-1000">
                <Quote size={80} strokeWidth={0.5} />
              </div>
              
              <div className="relative z-10">
                <div className="flex gap-1.5 mb-10">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-stone-900 text-stone-900" />
                  ))}
                </div>
                
                <p className="text-xl md:text-3xl text-stone-800 font-light leading-tight mb-12 tracking-tight">
                  "{t.content}"
                </p>
                
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-900 font-black text-xs">
                    {t.initial}
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-[9px] tracking-[0.2em] text-stone-900">{t.name}</h4>
                    <p className="text-stone-400 text-[9px] uppercase tracking-[0.2em] font-bold mt-1.5">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Section */}
        <section className="bg-stone-900 rounded-[3rem] overflow-hidden relative py-40">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/198a412c-5f1a-44f1-9c5f-98b3c91230ca/testimonials-background-dad85c9b-1773998621149.webp"
            className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale scale-110"
            alt="Clinic Atmosphere"
          />
          <div className="relative z-10 container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-6xl font-light text-white mb-10 uppercase tracking-tighter leading-none">The Difference is <br /> <span className="italic font-serif normal-case text-stone-400">Inherent.</span></h2>
            <p className="text-stone-400 font-light text-lg mb-16 max-w-xl mx-auto uppercase tracking-wide">
              We focus on the essential metrics of care to provide a truly exceptional dental journey.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
              <div className="px-10 py-10 border border-white/10 rounded-[2rem] backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-light text-white mb-3 uppercase tracking-tighter">98%</div>
                <div className="text-[9px] text-stone-500 uppercase tracking-[0.3em] font-black">Patient Success</div>
              </div>
              <div className="px-10 py-10 border border-white/10 rounded-[2rem] backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-light text-white mb-3 uppercase tracking-tighter">15k+</div>
                <div className="text-[9px] text-stone-500 uppercase tracking-[0.3em] font-black">Elite Procedures</div>
              </div>
              <div className="px-10 py-10 border border-white/10 rounded-[2rem] backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-light text-white mb-3 uppercase tracking-tighter">12+</div>
                <div className="text-[9px] text-stone-500 uppercase tracking-[0.3em] font-black">Industry Awards</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestimonialsPage;