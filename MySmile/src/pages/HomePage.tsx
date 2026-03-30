import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import { CheckCircle2, Star, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getBlogs, BlogPost } from "@/lib/supabase";

const HomePage = () => {
  const navigate = useNavigate();
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const data = await getBlogs();
        // Take the two most recent posts
        setLatestPosts(data.slice(0, 2));
      } catch (err) {
        console.error("Error fetching latest posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestPosts();
  }, []);

  // Fallback static posts in case Supabase fails or returns empty
  const fallbackPosts = [
    {
      id: "fallback1",
      title: "Optimal Oral Care",
      excerpt: "The essential guide to maintaining clinical standards at home...",
      image: "3.jpg",
      type: "article",
    },
    {
      id: "fallback2",
      title: "Precision Tools",
      excerpt: "How digital imaging is redefining the patient experience and accuracy...",
      image: "3.jpg",
      type: "article",
    },
  ];

  const postsToShow = latestPosts.length > 0 ? latestPosts : fallbackPosts;

  return (
    <div className="relative min-h-screen">
      {/* Background image with low opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10">
        <Hero />

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
            {/* Preventive */}
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-stone-100 hover:shadow-2xl transition-all duration-700 group">
              <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 mb-10 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
                <Star size={24} />
              </div>
              <h3 className="text-2xl font-light mb-6 uppercase tracking-tight">Preventive</h3>
              <p className="text-stone-500 font-light leading-relaxed text-sm">
                Essential maintenance and early detection to preserve your natural smile for a lifetime.
              </p>
            </div>

            {/* Restorative */}
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-stone-100 hover:shadow-2xl transition-all duration-700 group">
              <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 mb-10 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-2xl font-light mb-6 uppercase tracking-tight">Restorative</h3>
              <p className="text-stone-500 font-light leading-relaxed text-sm">
                Advanced techniques to rebuild function and form with biocompatible, aesthetic materials.
              </p>
            </div>

            {/* Cosmetic */}
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-stone-100 hover:shadow-2xl transition-all duration-700 group">
              <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 mb-10 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
                <Shield size={24} />
              </div>
              <h3 className="text-2xl font-light mb-6 uppercase tracking-tight">Cosmetic</h3>
              <p className="text-stone-500 font-light leading-relaxed text-sm">
                Artistic enhancements that elevate your confidence through natural-looking smile transformations.
              </p>
            </div>
          </div>
        </section>

        {/* Featured blog preview section */}
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
              {postsToShow.map((post, idx) => (
                <div
                  key={post.id}
                  className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row h-full shadow-sm hover:shadow-2xl transition-all duration-1000"
                  onClick={() => navigate("/blog")}
                >
                  <div className="md:w-1/2 overflow-hidden aspect-video md:aspect-auto">
                    <img
                      src={post.image || "3.jpg"}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[0.5] group-hover:grayscale-0"
                      alt={post.title}
                    />
                  </div>
                  <div className="md:w-1/2 p-10 flex flex-col justify-center">
                    <span className="text-stone-400 text-[9px] font-bold uppercase tracking-[0.3em] mb-4">
                      {idx === 0 ? "Clinical" : "Tech"}
                    </span>
                    <h3 className="text-xl font-light text-stone-900 mb-4 uppercase tracking-tight">{post.title}</h3>
                    <p className="text-stone-500 text-xs font-light mb-8 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-stone-900 text-[9px] font-black uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform duration-500">
                      Read Journal <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;