"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";

export default function UserOrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (!session || session.user.role !== "user") {
    return <div className="p-8 text-center">Hanya user yang bisa melihat riwayat pembelian.</div>;
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-2xl shadow-2xl mt-8 mb-auto animate-fade-in border border-blue-100">
      <h1 className="text-3xl font-extrabold text-blue-700 flex items-center gap-2 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
        Riwayat Pembelian
      </h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : orders.length === 0 ? (
        <EmptyState message="Belum ada pesanan." />
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-white rounded shadow text-sm">
            <thead className="bg-blue-50">
              <tr>
                <th className="py-2 px-3 text-blue-700 font-semibold">Produk</th>
                <th className="py-2 px-3 text-blue-700 font-semibold">Metode</th>
                <th className="py-2 px-3 text-blue-700 font-semibold">Status</th>
                <th className="py-2 px-3 text-blue-700 font-semibold">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-blue-50 transition">
                  <td className="py-2 px-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                        </svg>
                        {item.product?.name} <span className="text-xs text-gray-400">x{item.quantity}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-3 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                    </svg>
                    {order.paymentMethod}
                  </td>
                  <td className="py-2 px-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${order.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        {order.status === 'success' ? <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />}
                      </svg>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-gray-500">{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
