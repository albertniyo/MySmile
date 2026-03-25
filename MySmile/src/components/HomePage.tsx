import React from "react";
import Hero from "./Hero";
import { CheckCircle2, Star, Shield, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero onStartScreening={() => navigate("/screening")} />
      
      {/* Services Section */}
      <section id="services" className="py-32 container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-6 block">Expertise</span>
          <h2 className="text-4xl md:text-6xl font-light mb-8 text-stone-900 uppercase tracking-tighter">Our Specialties</h2>
          <p className="text-stone-500 text-lg font-light leading-relaxed">
            Precision meets care. We provide a curated selection of dental services designed for optimal results and patient comfort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-stone-100 hover:shadow-2xl transition-all duration-700 group">
            <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 mb-10 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
              <Star size={24} />
            </div>
            <h3 className="text-2xl font-light mb-6 uppercase tracking-tight">Preventive</h3>
            <p className="text-stone-500 mb-10 font-light leading-relaxed text-sm">Essential maintenance and early detection to preserve your natural smile for a lifetime.</p>
          </div>
          
          <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-stone-100 hover:shadow-2xl transition-all duration-700 group">
            <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 mb-10 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-2xl font-light mb-6 uppercase tracking-tight">Restorative</h3>
            <p className="text-stone-500 mb-10 font-light leading-relaxed text-sm">Advanced techniques to rebuild function and form with biocompatible, aesthetic materials.</p>
          </div>
          
          <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-stone-100 hover:shadow-2xl transition-all duration-700 group">
            <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 mb-10 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
              <Shield size={24} />
            </div>
            <h3 className="text-2xl font-light mb-6 uppercase tracking-tight">Cosmetic</h3>
            <p className="text-stone-500 mb-10 font-light leading-relaxed text-sm">Artistic enhancements that elevate your confidence through natural-looking smile transformations.</p>
          </div>
        </div>
      </section>

      {/* Featured Blog Preview Section */}
      <section className="py-32 bg-stone-50/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-6 block">Insights</span>
              <h2 className="text-4xl md:text-6xl font-light mb-4 text-stone-900 uppercase tracking-tighter">The Journal</h2>
              <p className="text-stone-500 text-lg font-light leading-relaxed">
                Current perspectives on health, technology, and clinical excellence.
              </p>
            </div>
            <Button 
              onClick={() => navigate("/blog")}
              variant="outline"
              size="lg"
              className="mt-8 md:mt-0 shadow-sm transition-all"
            >
              Read More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div 
              className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row h-full shadow-sm hover:shadow-2xl transition-all duration-1000"
              onClick={() => navigate("/blog")}
            >
              <div className="md:w-1/2 overflow-hidden aspect-video md:aspect-auto">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/198a412c-5f1a-44f1-9c5f-98b3c91230ca/healthy-smile-fc84d768-1773995277980.webp" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[0.5] group-hover:grayscale-0"
                  alt="Featured Post"
                />
              </div>
              <div className="md:w-1/2 p-10 flex flex-col justify-center">
                <span className="text-stone-400 text-[9px] font-bold uppercase tracking-[0.3em] mb-4">Clinical</span>
                <h3 className="text-xl font-light text-stone-900 mb-4 uppercase tracking-tight">Optimal Oral Care</h3>
                <p className="text-stone-500 text-xs font-light mb-8 leading-relaxed line-clamp-2">The essential guide to maintaining clinical standards at home...</p>
                <div className="flex items-center gap-3 text-stone-900 text-[9px] font-black uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform duration-500">
                  Read Journal <ArrowRight size={14} />
                </div>
              </div>
            </div>
            
            <div 
              className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row h-full shadow-sm hover:shadow-2xl transition-all duration-1000"
              onClick={() => navigate("/blog")}
            >
              <div className="md:w-1/2 overflow-hidden aspect-video md:aspect-auto">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/198a412c-5f1a-44f1-9c5f-98b3c91230ca/dental-tech-40a2e073-1773995276743.webp" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[0.5] group-hover:grayscale-0"
                  alt="Technology Post"
                />
              </div>
              <div className="md:w-1/2 p-10 flex flex-col justify-center">
                <span className="text-stone-400 text-[9px] font-bold uppercase tracking-[0.3em] mb-4">Tech</span>
                <h3 className="text-xl font-light text-stone-900 mb-4 uppercase tracking-tight">Precision Tools</h3>
                <p className="text-stone-500 text-xs font-light mb-8 leading-relaxed line-clamp-2">How digital imaging is redefining the patient experience and accuracy...</p>
                <div className="flex items-center gap-3 text-stone-900 text-[9px] font-black uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform duration-500">
                  Read Journal <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;