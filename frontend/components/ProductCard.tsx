interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  artisan_name: string;
  village: string;
  contact_number: string;
  email: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border border-secondary rounded-lg shadow p-4 bg-background">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2 text-secondary">{product.name}</h3>
      <p className="text-dark">{product.description}</p>
      <p className="text-primary font-semibold">Rs. {product.price}</p>
      <div className="mt-3 text-sm text-dark">
        <p><strong>Artisan:</strong> {product.artisan_name}</p>
        <p><strong>Village:</strong> {product.village}</p>
        <p><strong>Contact:</strong> {product.contact_number}</p>
        <p><strong>Email:</strong> {product.email}</p>
      </div>
    </div>
  );
}
