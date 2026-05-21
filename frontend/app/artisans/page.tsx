import ArtisanCard from "@/components/ArtisanCard";

export default function ArtisansPage() {
  return (
    <div className="px-8 py-10 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
        <h1 className="text-lg font-medium text-craft-dark">Our artisans</h1>
        <input 
          type="text" 
          placeholder="Search artisans..." 
          className="text-xs px-3 py-1.5 rounded-md border border-[#e0c4a0] bg-white w-full sm:w-44 focus:outline-none focus:border-craft-tan text-craft-dark"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <ArtisanCard initials="RA" name="Rania Al-Farsi" craft="Pottery" location="Nizwa, Oman" />
        <ArtisanCard initials="DK" name="Devi Krishnan" craft="Weaving" location="Thanjavur, India" />
        <ArtisanCard initials="YH" name="Yusuf Hamdan" craft="Woodwork" location="Essaouira, Morocco" />
        <ArtisanCard initials="PM" name="Priya Menon" craft="Block Printing" location="Jaipur, India" />
        <ArtisanCard initials="LB" name="Lena Bauer" craft="Candle Making" location="Rothenburg, Germany" />
        <ArtisanCard initials="TC" name="Thao Chau" craft="Bamboo Work" location="Hội An, Vietnam" />
      </div>
    </div>
  );
}