import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface BlogPostPreviewCardProps {
  id: string | number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  type?: "article" | "video";
  video_id?: string;
  size: "small" | "large";
  onClick: () => void;
}

const BlogPostPreviewCard: React.FC<BlogPostPreviewCardProps> = ({
  title,
  excerpt,
  date,
  image,
  type = "article",
  video_id,
  size,
  onClick,
}) => {
  const isLarge = size === "large";
  const isVideo = type === "video";

  // YouTube thumbnail URL
  const thumbnailUrl = isVideo && video_id
    ? `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`
    : image;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group cursor-pointer ${isLarge ? "space-y-10" : "space-y-6"}`}
      onClick={onClick}
    >
      <div className={`relative overflow-hidden rounded-[2rem] bg-stone-100 ${isLarge ? "aspect-[4/3]" : "aspect-[3/4]"}`}>
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[0.4] group-hover:grayscale-0"
        />
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-stone-900 group-hover:scale-110 transition-transform">
              <Play size={24} className="ml-1" />
            </div>
          </div>
        )}
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">{date}</span>
          <div className="h-px w-8 bg-stone-100" />
        </div>
        <h3 className={`font-light ${isLarge ? "text-3xl md:text-4xl" : "text-xl"} tracking-tighter text-stone-800 group-hover:text-stone-500 transition-colors`}>
          {title}
        </h3>
        <p className={`text-stone-500 leading-relaxed ${isLarge ? "text-base" : "text-sm"}`}>
          {excerpt}
        </p>
      </div>
    </motion.div>
  );
};

export default BlogPostPreviewCard;