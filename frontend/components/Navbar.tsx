export default function Navbar() {
  return (
    <nav className="bg-dark text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">CraftConnect</h1>
      <div className="space-x-6">
        <a href="/">Home</a>
        <a href="/artisans">Artisans</a>
        <a href="/products">Products</a>
      </div>
    </nav>
  );
}
