"use client";

import { motion } from "framer-motion";

interface ProductCardProps {
  emoji?: string;
  imageUrl?: string;
  badge?: string;
  name: string;
  description?: string;
  price: string;
  artisanInitials?: string;
  artisanAvatar?: string;
  artisanName: string;
  bgColor?: string;
}

export default function ProductCard({
  emoji,
  imageUrl,
  badge,
  name,
  price,
  artisanInitials,
  artisanAvatar,
  artisanName,
  bgColor
}: ProductCardProps) {
  const displayImage = imageUrl || `https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop`;

  return (
    <motion.div 
      className="group cursor-pointer rounded-xl flex flex-col h-full overflow-hidden glass hover:bg-craft-border/30 transition-colors duration-300 border border-transparent hover:border-craft-brown/30"
      whileHover={{ y: -8 }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#F5F5F5]">
        {imageUrl ? (
          <motion.img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ) : (
          <motion.div 
            className={`w-full h-full flex items-center justify-center text-6xl ${bgColor || 'bg-craft-bgAlt'}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {emoji || '🏺'}
          </motion.div>
        )}
        
        {badge && (
          <div className="absolute top-3 left-3 bg-craft-dark/90 backdrop-blur-md px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-craft-bg shadow-sm rounded-full">
            {badge}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-[17px] font-bold text-craft-dark mb-2 group-hover:text-craft-accent transition-colors">{name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          {artisanAvatar ? (
            <img src={artisanAvatar} className="w-6 h-6 rounded-full object-cover border border-craft-border" alt={artisanName} />
          ) : (
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-craft-bg bg-craft-brown shadow-[0_0_10px_rgba(168,162,158,0.2)]">
              {artisanInitials || artisanName.charAt(0)}
            </div>
          )}
          <span className="text-[12px] text-craft-brown">{artisanName}</span>
        </div>

        <div className="mt-auto text-[14px] font-semibold text-craft-dark flex items-center justify-between">
          <span>{price}</span>
          <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-craft-accent text-[12px]">
            View →
          </span>
        </div>
      </div>
    </motion.div>
  );
}