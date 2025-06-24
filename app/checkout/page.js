"use client";
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Swal from 'sweetalert2';
import { useCart } from "../components/CartContext";
import Spinner from "../components/Spinner";
import Image from "next/image";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { cart, clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  // Force re-render after hydration to ensure cart is up-to-date (for SSR/Next.js)
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  if (!session || session.user.role !== "user") {
    return <div className="p-8 text-center">Hanya user yang bisa checkout.</div>;
  }

  const handleCheckout = async () => {
    if (!paymentMethod) {
      Swal.fire("Pilih Metode Pembayaran", "Silakan pilih metode pembayaran terlebih dahulu.", "warning");
      return;
    }
    setLoading(true);
    if (!cart.length) {
      setLoading(false);
      Swal.fire("Gagal", "Tidak ada produk yang bisa di-checkout.", "error");
      return;
    }
    const items = cart.map((p) => ({ product: p._id, quantity: 1 }));
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, paymentMethod }),
    });
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setOrder({ status: "success" });
      clearCart();
      if (data.waUrl) {
        window.location.href = data.waUrl;
        return;
      }
      Swal.fire({
        title: "Checkout Berhasil!",
        html: `Silakan lakukan pembayaran via <b>${paymentMethod}</b>.<br/>Klik tombol di bawah untuk membayar via WhatsApp.`,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Bayar via WhatsApp",
      }).then((result) => {
        if (result.isConfirmed && data.waUrl) {
          window.location.href = data.waUrl;
        }
      });
    } else {
      const err = await res.json();
      Swal.fire("Gagal", err.error || "Terjadi kesalahan saat checkout.", "error");
    }
  };

  // Wait for hydration to avoid mismatch (Next.js/SSR)
  if (!hydrated) return null;

  return (
    <div className="max-w-lg w-full mx-auto p-6 sm:p-10 bg-gradient-to-br from-blue-50 to-purple-100 rounded-2xl shadow-2xl mt-8 mb-auto animate-fade-in flex flex-col gap-6 border border-blue-200">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 flex items-center gap-2 mb-2 justify-center drop-shadow">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
        Checkout
      </h1>
      <div className="mb-2 text-blue-700 flex items-center gap-2 border-b border-blue-200 pb-2 font-semibold">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3z" /></svg>
        Keranjang Produk
      </div>
      {cart.length === 0 ? (
        <div className="text-gray-400 italic text-center">Belum ada produk dipilih.</div>
      ) : (
        <div className="space-y-3">
          {cart.map((product, idx) => (
            <div key={product._id || idx} className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 flex items-center gap-4 shadow group border border-blue-200">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-white border border-blue-100 flex-shrink-0">
                {product.image ? (
                  product.image.startsWith('data:image/') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image}
                      alt={product.name || 'Produk'}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full"
                      style={{ objectFit: 'contain' }}
                    />
                  ) : (
                    <Image
                      src={(() => {
                        if (product.image.startsWith('http')) return product.image;
                        if (product.image.startsWith('/uploads/')) return product.image;
                        if (product.image.startsWith('/')) return product.image;
                        return `/uploads/${product.image}`;
                      })()}
                      alt={product.name || 'Produk'}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full"
                      unoptimized={true}
                      onError={e => { e.currentTarget.src = '/vercel.svg'; }}
                    />
                  )
                ) : (
                  <Image
                    src="/vercel.svg"
                    alt="No Image"
                    width={80}
                    height={80}
                    className="object-contain w-full h-full opacity-30"
                    priority
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="font-bold text-blue-800 text-lg group-hover:underline">{product.name || <span className='italic text-gray-400'>Nama tidak tersedia</span>}</div>
                <div className="text-xs text-gray-500 mb-1">Qty: 1</div>
                <div className="text-base font-bold text-purple-700">{typeof product.price === 'number' ? `Rp${product.price.toLocaleString()}` : <span className='italic text-gray-400'>Harga tidak tersedia</span>}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        <label className="mb-2 font-semibold text-blue-700 flex items-center gap-1">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
          Pilih Metode Pembayaran:
        </label>
        <select className="select select-bordered w-full focus:ring-2 focus:ring-blue-400 bg-gradient-to-r from-blue-50 to-purple-100 border-2 border-blue-200 rounded-lg text-blue-700 font-semibold py-2 px-3 mt-2 mb-4 shadow-sm" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
          <option value="">-- Pilih Metode Pembayaran --</option>
          <option value="Transfer Bank">Transfer Bank</option>
          <option value="QRIS">QRIS</option>
          <option value="OVO">OVO</option>
          <option value="DANA">DANA</option>
          <option value="Gopay">Gopay</option>
        </select>
      </div>
      <button
        className="btn w-full flex items-center justify-center gap-2 text-lg group hover:scale-105 transition focus:ring-2 focus:ring-blue-400 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg border-0 rounded-xl py-3 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={handleCheckout}
        disabled={loading}
        aria-label="Bayar Sekarang"
        title="Lanjut ke pembayaran"
      >
        {loading ? <Spinner size={24} /> : (
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z" /></svg>
        )}
        {loading ? "Memproses..." : "Bayar Sekarang"}
      </button>
      {order && order.status === "success" && (
        <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 animate-bounce-in justify-center">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          <span className="font-semibold">Pesanan berhasil dibuat!</span>
        </div>
      )}
    </div>
  );
}
