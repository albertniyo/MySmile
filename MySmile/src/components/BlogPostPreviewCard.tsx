import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  size?: "small" | "large";
  onClick?: () => void;
}

const BlogPostPreviewCard: React.FC<BlogPostProps> = ({
  title,
  excerpt,
  date,
  image,
  size = "small",
  onClick,
}) => {
  const isLarge = size === "large";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`group flex flex-col transition-all duration-700 cursor-pointer ${isLarge ? "gap-10" : "gap-8"}`}
      onClick={onClick}
    >
      {/* Picture at the top */}
      <div
        className={`relative overflow-hidden bg-stone-50 rounded-[2.5rem] transition-all duration-1000 ${
          isLarge ? "aspect-[16/10] grayscale-[0.3] group-hover:grayscale-0" : "aspect-[4/5] grayscale-[0.8] group-hover:grayscale-0 shadow-sm"
        }`}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>

      {/* Content Area */}
      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-black tracking-[0.4em] uppercase text-stone-400 group-hover:text-stone-900 transition-colors duration-500">
            {date}
          </span>
          <div className="h-px w-8 bg-stone-100 group-hover:w-12 transition-all duration-700" />
        </div>

        <div className="space-y-4">
          <h3
            className={`font-light text-stone-900 leading-[1.1] transition-colors uppercase tracking-tighter ${
              isLarge ? "text-3xl md:text-6xl" : "text-xl md:text-2xl"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-stone-500 font-light leading-relaxed ${
              isLarge ? "text-lg md:text-xl max-w-2xl" : "text-sm line-clamp-3 uppercase tracking-wide"
            }`}
          >
            {excerpt}
          </p>
        </div>

        <div className="pt-4">
           <Button 
             variant="ghost" 
             className="group/btn p-0 hover:bg-transparent h-auto text-stone-900 font-black flex items-center gap-4 uppercase text-[10px] tracking-[0.3em]"
           >
             <span className="border-b border-transparent group-hover/btn:border-stone-900 transition-all">Explore Article</span>
             <div className="p-2 rounded-full border border-stone-200 group-hover/btn:bg-stone-900 group-hover/btn:text-white transition-all">
               <ArrowRight size={14} />
             </div>
           </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPostPreviewCard;