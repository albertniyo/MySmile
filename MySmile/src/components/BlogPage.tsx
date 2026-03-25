import React, { useState, useEffect } from "react";
import BlogPostPreviewCard from "./BlogPostPreviewCard";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, BlogPost } from "../lib/supabase";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

const FALLBACK_BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "Digital Future",
    excerpt: "Exploring how AI and 3D printing are revolutionizing patient care and precision in modern clinics.",
    content: "AI and 3D printing are revolutionizing modern dentistry. We've integrated these technologies to provide unmatched precision. Our scanners capture 3D models with sub-millimeter accuracy, allowing for same-day crowns and perfectly aligned orthodontics. The future of dental care is digital, less invasive, and highly personalized. This transition means shorter appointments and more durable results for our patients. By leveraging machine learning algorithms, we can now predict potential issues before they become visible to the naked eye, ensuring truly preventive care.",
    date: "March 20, 2024",
    image: "9.jpg"
  },
  {
    id: 2,
    title: "Essential Care",
    excerpt: "Why less is often more when it comes to maintaining a healthy and natural smile every day.",
    content: "Maintaining a healthy smile doesn't have to be complicated. At MySmile, we advocate for a minimalist approach: focusing on high-quality basics rather than excessive procedures. This philosophy centers on biocompatible materials and preventive hygiene. By stripping away unnecessary complexity, we emphasize the natural beauty of your teeth. Our goal is to empower you with the knowledge to maintain your oral health simply and effectively. We believe that true luxury in dental care is the peace of mind that comes from simple, effective, and sustainable practices.",
    date: "March 18, 2024",
    image: "9.jpg"
  },
  {
    id: 3,
    title: "Holistic Health",
    excerpt: "Understanding the deep connection between your oral health and overall physical well-being.",
    content: "The health of your mouth is intrinsically linked to the health of your body. Recent clinical studies show that gum disease can be a precursor to cardiovascular issues and inflammation elsewhere. We focus on this oral-systemic connection, ensuring that every treatment plan considers your overall wellness. Our holistic approach means we don't just fix teeth; we support your body's natural balance through integrated care and nutrition guidance. We collaborate with other health professionals to ensure your oral health contributes positively to your long-term vitality.",
    date: "March 15, 2024",
    image: "9.jpg"
  },
  {
    id: 4,
    title: "Sustainability",
    excerpt: "How our clinic is reducing environmental impact through innovative waste management and materials.",
    content: "As a modern clinic, we are committed to reducing our environmental footprint. From using biodegradable supplies to advanced waste management, MySmile is leading the way in sustainable dentistry. We've eliminated single-use plastics where possible and transitioned to digital-only records to save paper. Choosing MySmile means supporting a practice that cares for both your smile and the planet. We also source materials from suppliers who adhere to strict environmental and ethical standards, ensuring every part of your treatment is responsible.",
    date: "March 12, 2024",
    image: "9.jpg"
  },
  {
    id: 5,
    title: "The Journey",
    excerpt: "What to expect from your first consultation to your final treatment at MySmile.",
    content: "From your first visit, we want you to feel heard and cared for. Our patient journey is designed for clarity and comfort. It begins with a comprehensive digital screening, followed by a collaborative discussion of your goals. We believe in transparency, providing clear explanations of every step and cost. Your comfort is our priority, and our modern studio environment is crafted to ensure a stress-free experience from start to finish. We utilize aromatherapy and noise-canceling technology to create a sanctuary where dental care feels like self-care.",
    date: "March 10, 2024",
    image: "9.jpg"
  }
];

const BlogPage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          const enrichedData = data.map(blog => ({
            ...blog,
            content: blog.content || FALLBACK_BLOGS.find(f => f.title === blog.title)?.content || blog.excerpt
          }));
          setBlogs(enrichedData);
        } else {
          setBlogs(FALLBACK_BLOGS);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs(FALLBACK_BLOGS);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (selectedPost) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedPost]);

  const distributePosts = () => {
    const left: BlogPost[] = [];
    const middle: BlogPost[] = [];
    const right: BlogPost[] = [];

    blogs.forEach((blog, index) => {
      if (index % 3 === 0) left.push(blog);
      else if (index % 3 === 1) middle.push(blog);
      else right.push(blog);
    });

    return { left, middle, right };
  };

  const { left, middle, right } = distributePosts();

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedPost(null)}
            className="mb-12 group flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors p-0 uppercase text-[10px] tracking-[0.3em] font-black"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400">{selectedPost.date}</span>
              <div className="h-px w-12 bg-stone-100" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light text-stone-900 mb-12 uppercase tracking-tighter leading-tight">
              {selectedPost.title}
            </h1>

            <div className="aspect-[16/9] rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="w-full h-full object-cover grayscale-[0.2]"
              />
            </div>

            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-stone-400 font-light italic mb-12 leading-relaxed font-serif">
                "{selectedPost.excerpt}"
              </p>
              
              <div className="prose prose-stone lg:prose-xl max-w-none">
                <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-light mb-8">
                  {selectedPost.content}
                </p>
                <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-light mb-8">
                  At MySmile, we believe that clinical excellence is the foundation of patient trust. Every procedure, from the most routine cleaning to complex restorative work, is executed with a focus on durability and aesthetics. Our team is constantly researching new materials and techniques to ensure you receive the highest standard of care available today.
                </p>
                <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-light mb-8">
                  The intersection of health and design is where we find our inspiration. We've crafted an environment that doesn't just treat symptoms but nurtures your overall sense of well-being. We invite you to experience a different kind of dental care—one that is as beautiful as the smiles we create.
                </p>
              </div>

              <div className="mt-20 pt-12 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 overflow-hidden">
                    <img src="10.jpg" className="w-full h-full object-cover" alt="Author" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900">Dr. Julian Vance</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-stone-400">Clinical Director</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full px-8">Share Article</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-stone-100 selection:text-stone-900">
      {/* blog Hero Section */}
      <section className="pt-40 pb-24 md:pb-40">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-8 block">The Archive</span>
            <h1 className="text-5xl md:text-8xl font-light text-stone-900 mb-10 tracking-tighter uppercase">
              Clinical <span className="font-serif italic text-stone-400 normal-case">Journal</span>
            </h1>
            <div className="h-px w-24 bg-stone-100 mb-12" />
            <p className="text-xl md:text-2xl text-stone-500 leading-relaxed font-light max-w-2xl">
              Reflections on clinical precision, aesthetic principles, and the evolution of modern dental care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3-column blog Grid */}
      <section className="pb-40 md:pb-60 min-h-[400px]">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-24"
              >
                <Loader2 className="w-10 h-10 animate-spin text-stone-300" />
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start"
              >
                {/* left column */}
                <div className="lg:col-span-3 space-y-24 md:space-y-40 order-2 lg:order-1">
                  {left.map((post) => (
                    <BlogPostPreviewCard 
                      key={post.id} 
                      {...post} 
                      size="small" 
                      onClick={() => setSelectedPost(post)}
                    />
                  ))}
                </div>

                {/* middle column - large */}
                <div className="lg:col-span-6 space-y-32 md:space-y-48 order-1 lg:order-2">
                  {middle.map((post) => (
                    <BlogPostPreviewCard 
                      key={post.id} 
                      {...post} 
                      size="large" 
                      onClick={() => setSelectedPost(post)}
                    />
                  ))}
                </div>

                {/* right column */}
                <div className="lg:col-span-3 space-y-24 md:space-y-40 order-3">
                  {right.map((post) => (
                    <BlogPostPreviewCard 
                      key={post.id} 
                      {...post} 
                      size="small" 
                      onClick={() => setSelectedPost(post)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* minimal Footer */}
      <section className="py-40 md:py-60 border-t border-stone-50 bg-stone-50/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-light text-stone-900 mb-6 uppercase tracking-tight">Join the archive.</h2>
              <p className="text-stone-400 font-light text-lg uppercase tracking-wide">Insights delivered to your inbox.</p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 border-b border-stone-200">
                <input 
                  type="email" 
                  placeholder="a.niyonseng@alustudent.com" 
                  className="bg-transparent px-0 py-6 focus:outline-none text-stone-900 placeholder:text-stone-300 w-full md:w-96 transition-all font-light tracking-widest text-sm"
                />
              </div>
              <Button variant="default" size="lg" className="w-full sm:w-auto">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;