"use client";
import { useEffect, useState } from "react";
import api from "../services/api";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Hero />
      <section className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </>
  );
}
