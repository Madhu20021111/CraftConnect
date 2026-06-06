import ArtisanCard from "@/components/ArtisanCard";
import api from "@/services/api";

async function getArtisans() {
  try {
    const res = await api.get("/artisans");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch artisans:", error);
    return [];
  }
}

// Unsplash images for artisans
const ARTISAN_IMAGES = [
  "https://images.unsplash.com/photo-1544965850-6f91f37e69c1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589824781471-a47781b0a827?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605810730419-8e2b8618eb3a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513689404283-c7524ccb50a9?q=80&w=800&auto=format&fit=crop"
];

export default async function ArtisansPage() {
  const artisans = await getArtisans();

  return (
    <div className="min-h-screen bg-craft-bg">
      <div className="px-8 lg:px-24 py-16 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-craft-dark mb-4">Meet Our Artisans</h1>
          <p className="text-[15px] text-craft-brown leading-relaxed">
            Discover the hands behind the craft. Every piece tells a story of heritage, patience, and meticulous skill passed down through generations.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 bg-white p-3 shadow-sm border border-craft-border mb-16 rounded-md">
          <div className="relative flex-1 flex items-center px-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-craft-brown/50">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by artisan name..." 
              className="w-full pl-3 pr-4 py-2 text-[13px] text-craft-dark focus:outline-none placeholder-craft-brown/50"
            />
          </div>
          <div className="w-px bg-craft-border hidden md:block"></div>
          <div className="w-full md:w-56 px-2 border-t border-craft-border md:border-t-0 pt-2 md:pt-0">
            <select className="w-full bg-transparent text-[13px] text-craft-dark py-2 px-2 focus:outline-none cursor-pointer">
              <option>All Craft Types</option>
              <option>Textiles</option>
              <option>Ceramics</option>
              <option>Woodworking</option>
            </select>
          </div>
          <button className="bg-craft-accent text-white px-8 py-3 text-[13px] font-bold tracking-wide hover:bg-opacity-90 transition-colors w-full md:w-auto rounded-sm">
            Filter
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {artisans.map((artisan: any, index: number) => (
            <ArtisanCard
              key={artisan.id}
              imageUrl={artisan.image_url || ARTISAN_IMAGES[index % ARTISAN_IMAGES.length]}
              name={artisan.name}
              craft={artisan.craft_type}
              location={artisan.village}
            />
          ))}
          {artisans.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 px-6 border border-dashed border-craft-border">
              <span className="text-4xl mb-4">🏺</span>
              <h3 className="font-serif text-xl font-bold text-craft-dark mb-2">No artisans found</h3>
              <p className="text-sm text-craft-brown text-center max-w-sm">
                We haven't registered any artisans yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}