"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Image from "next/image";
import { PlusIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../components/CartContext";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";

export default function HomePage() {
  const { data: session } = useSession();
  const { cart, addToCart, clearCart } = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products${category ? `?category=${category}` : ""}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [category]);

  const handleAddToCart = (product) => {
    addToCart(product);
    Swal.fire("Ditambahkan", "Produk masuk ke keranjang", "success");
  };

  const handleCheckout = () => {
    if (!session) {
      Swal.fire(
        "Login Dulu",
        "Anda harus login sebelum checkout",
        "warning"
      ).then(() => (window.location = "/login"));
      return;
    }
    window.location = "/checkout";
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-[80vh] rounded-xl shadow-xl mt-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow mb-2">
            Velmo Store - Jual Akun Game Online
          </h1>
          <p className="text-gray-600 text-lg">
            Temukan dan beli akun game favoritmu dengan mudah, cepat, dan terpercaya di Velmo Store!
          </p>
        </div>
        <button
          className="btn btn-outline btn-lg flex items-center gap-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white transition"
          onClick={handleCheckout}
        >
          <ShoppingCartIcon className="h-6 w-6" />
          Checkout ({cart.length})
        </button>
      </div>
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <button
          className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-md rounded-xl px-6 py-2 flex items-center gap-2 hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition focus:ring-2 focus:ring-blue-400"
          onClick={() => window.location.reload()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582a2 2 0 011.789 1.106l.94 1.88A2 2 0 0010.11 14h3.78a2 2 0 001.799-1.114l.94-1.88A2 2 0 0119.418 9H20V4" /></svg>
          Refresh
        </button>
        <span className="text-gray-400 text-sm">
          Total produk: {products.length}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : products.length === 0
            ? <EmptyState message="Belum ada produk tersedia." />
            : products.map((product) => (
                <div key={product._id} className="bg-white shadow-lg p-4 flex flex-col border border-blue-100 hover:shadow-2xl hover:scale-105 transition group rounded-xl">
                  {product.image && (
                    <Image
                      src={(() => {
                        if (product.image.startsWith('http')) return product.image;
                        if (product.image.startsWith('/')) return product.image;
                        if (/\.(jpg|jpeg|png|webp|svg)$/i.test(product.image)) return `/uploads/${product.image}`;
                        return `/uploads/${product.image}`;
                      })()}
                      alt={product.name}
                      width={300}
                      height={160}
                      className="mb-2 rounded group-hover:scale-105 transition h-40 w-full object-cover"
                      unoptimized={product.image.startsWith('http')}
                      onError={e => { e.currentTarget.src = '/vercel.svg'; }}
                    />
                  )}
                  <div className="font-bold text-lg text-blue-800 mb-1">{product.name}</div>
                  <span className="badge badge-info mb-2">{product.category}</span>
                  <div className="my-2 text-xl font-semibold text-purple-700">Rp{product.price.toLocaleString()}</div>
                  <button
                    className="btn btn-primary mt-2 flex items-center gap-2 justify-center"
                    onClick={() => handleAddToCart(product)}
                  >
                    <PlusIcon className="h-5 w-5" /> Beli
                  </button>
                </div>
              ))}
      </div>
    </div>
  );
}
