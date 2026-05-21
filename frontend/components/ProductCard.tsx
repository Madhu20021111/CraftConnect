interface ProductCardProps {
  emoji: string;
  badge?: string;
  name: string;
  description: string;
  price: string;
  artisanInitials: string;
  artisanName: string;
  bgColor: string;
}

export default function ProductCard({
  emoji,
  badge,
  name,
  description,
  price,
  artisanInitials,
  artisanName,
  bgColor
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e8d5c0] overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-sm transition-all duration-150">
      <div>
        <div className={`h-40 flex items-center justify-center text-5xl relative ${bgColor}`}>
          {emoji}
          {badge && (
            <span className="absolute top-3 left-3 bg-[#C08552] text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-md">
              {badge}
            </span>
          )}
        </div>
        <div className="p-4 pb-2">
          <h3 className="text-base font-semibold text-[#4B2E2B] mb-1 line-clamp-1">{name}</h3>
          <p className="text-xs text-[#8C5A3C] line-clamp-2 leading-relaxed mb-3">{description}</p>
        </div>
      </div>
      
      <div className="p-4 pt-0 flex items-center justify-between mt-auto">
        <span className="text-base font-bold text-[#8C5A3C]">{price}</span>
        <div className="flex items-center gap-1.5 bg-[#FFF8F0] py-1 px-2 rounded-full border border-[#e8d5c0]/40 max-w-[120px]">
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-[#8C5A3C] shrink-0">
            {artisanInitials}
          </div>
          <span className="text-[11px] font-medium text-[#8C5A3C] truncate">{artisanName}</span>
        </div>
      </div>
    </div>
  );
}