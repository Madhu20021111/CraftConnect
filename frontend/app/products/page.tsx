import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  return (
    <div className="px-8 py-10 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
        <h1 className="text-lg font-medium text-craft-dark">All products</h1>
        <div className="flex gap-2 self-end sm:self-auto">
          <select className="text-xs px-2.5 py-1.5 rounded-md border border-[#e0c4a0] bg-white text-craft-dark focus:outline-none focus:border-craft-tan">
            <option>All categories</option>
            <option>Pottery</option>
            <option>Textiles</option>
            <option>Woodwork</option>
          </select>
          <select className="text-xs px-2.5 py-1.5 rounded-md border border-[#e0c4a0] bg-white text-craft-dark focus:outline-none focus:border-craft-tan">
            <option>Sort: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <ProductCard emoji="🏺" badge="Bestseller" name="Hand-thrown clay vase" description="Earthy terracotta glaze, unique form" price="$48" artisanInitials="RA" artisanName="Rania A." bgColor="bg-[#f5e6d3]" />
        <ProductCard emoji="🧺" badge="New" name="Woven market basket" description="Seagrass & recycled cotton blend" price="$34" artisanInitials="DK" artisanName="Devi K." bgColor="bg-[#e8f0e0]" />
        <ProductCard emoji="🪵" name="Carved olive wood bowl" description="Single-piece, food-safe oil finish" price="$72" artisanInitials="YH" artisanName="Yusuf H." bgColor="bg-[#fce8dc]" />
        <ProductCard emoji="🧵" name="Block-print linen wrap" description="Natural dyes, hand-stamped motifs" price="$56" artisanInitials="PM" artisanName="Priya M." bgColor="bg-[#f0e8f8]" />
        <ProductCard emoji="🕯️" name="Beeswax pillar candle" description="Wildflower honey scent, 40hr burn" price="$22" artisanInitials="LB" artisanName="Lena B." bgColor="bg-[#e8f5f0]" />
        <ProductCard emoji="🎍" name="Bamboo serving tray" description="Handplaned, mortise-tenon joints" price="$39" artisanInitials="TC" artisanName="Thao C." bgColor="bg-[#f8f0e0]" />
      </div>
    </div>
  );
}