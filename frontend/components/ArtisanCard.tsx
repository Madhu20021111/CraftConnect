interface ArtisanCardProps {
  initials?: string;
  imageUrl?: string;
  name: string;
  craft: string;
  location: string;
}

export default function ArtisanCard({ initials, imageUrl, name, craft, location }: ArtisanCardProps) {
  const displayImage = imageUrl || "https://images.unsplash.com/photo-1544965850-6f91f37e69c1?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="group bg-white flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-craft-bgAlt">
        <img 
          src={displayImage} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content Area */}
      <div className="p-6 pt-5 flex flex-col flex-1 border border-t-0 border-craft-border">
        {/* Craft Badge */}
        <div className="mb-4">
          <span className="inline-block bg-craft-bgAlt text-craft-accent text-[9px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">
            {craft}
          </span>
        </div>

        {/* Name & Location */}
        <h3 className="font-serif text-[22px] font-bold text-craft-dark mb-2 leading-tight">{name}</h3>
        <div className="text-[10px] text-craft-dark flex items-center gap-1.5 mb-6 uppercase tracking-widest font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <span className="truncate">{location}</span>
        </div>

        {/* Contact Button */}
        <button className="mt-auto w-full py-3.5 border border-craft-dark text-craft-dark text-[11px] font-bold tracking-widest uppercase hover:bg-craft-dark hover:text-white transition-colors duration-300">
          Contact
        </button>
      </div>
    </div>
  );
}