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
  // Use a fallback random unsplash image if neither imageUrl nor emoji is good enough
  const displayImage = imageUrl || `https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop`;

  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square mb-4 overflow-hidden bg-[#F5F5F5]">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-6xl ${bgColor || 'bg-craft-bgAlt'} transition-transform duration-500 group-hover:scale-105`}>
            {emoji || '🏺'}
          </div>
        )}
        
        {badge && (
          <div className="absolute top-3 left-3 bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-craft-dark shadow-sm">
            {badge}
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <h3 className="font-serif text-[17px] font-bold text-craft-dark mb-1.5">{name}</h3>
        
        <div className="flex items-center gap-2 mb-2">
          {artisanAvatar ? (
            <img src={artisanAvatar} className="w-5 h-5 rounded-full object-cover" alt={artisanName} />
          ) : (
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white bg-craft-dark">
              {artisanInitials || artisanName.charAt(0)}
            </div>
          )}
          <span className="text-[11px] text-craft-brown">{artisanName}</span>
        </div>

        <div className="text-[13px] text-craft-accent">{price}</div>
      </div>
    </div>
  );
}