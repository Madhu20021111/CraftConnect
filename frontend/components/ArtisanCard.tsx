interface ArtisanCardProps {
  initials: string;
  name: string;
  craft: string;
  location: string;
}

export default function ArtisanCard({ initials, name, craft, location }: ArtisanCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e8d5c0] p-5 flex gap-4 items-start hover:shadow-sm transition-all">
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-white bg-[#8C5A3C] shrink-0 shadow-sm">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-[#4B2E2B] truncate">{name}</h3>
        <span className="inline-block bg-[#FFF8F0] text-[#8C5A3C] text-[11px] font-medium px-2.5 py-0.5 rounded-full my-1.5 border border-[#e8d5c0]">
          {craft}
        </span>
        <div className="text-xs text-[#8C5A3C] flex items-center gap-1 mb-4">
          <span className="text-sm opacity-75">📍</span> {location}
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-1.5 rounded-lg border border-[#e8d5c0] bg-[#FFF8F0] text-[#8C5A3C] text-xs font-semibold flex items-center justify-center gap-1 hover:bg-[#fce8dc] transition-colors">
            📞 Call
          </button>
          <button className="flex-1 py-1.5 rounded-lg border border-[#e8d5c0] bg-[#FFF8F0] text-[#8C5A3C] text-xs font-semibold flex items-center justify-center gap-1 hover:bg-[#fce8dc] transition-colors">
            ✉️ Email
          </button>
        </div>
      </div>
    </div>
  );
}