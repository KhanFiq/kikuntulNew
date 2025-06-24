"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { HomeIcon, ShoppingBagIcon, ClockIcon, UserGroupIcon, ArrowLeftOnRectangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Hindari render sebelum hydration selesai untuk mencegah mismatch
  if (!mounted) return null;

  return (
    <nav className="w-full bg-gradient-to-r from-blue-700 to-purple-700 shadow mb-6 py-3 px-8 flex items-center justify-between text-white animate-fade-in rounded-b-xl">
      <div className="font-bold text-2xl tracking-wide flex items-center gap-3">
        <ShoppingBagIcon className="h-8 w-8 text-white drop-shadow" />
        Velmo Store
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <Link href="/" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800/60 transition">
          <HomeIcon className="h-5 w-5" /> Beranda
        </Link>
        {session && session.user.role === "admin" && (
          <>
            <Link href="/admin/products" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800/60 transition"><ShoppingBagIcon className="h-5 w-5" /> Akun</Link>
            <Link href="/admin/dashboard" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800/60 transition"><UserCircleIcon className="h-5 w-5" /> Dashboard</Link>
            <Link href="/admin/orders" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800/60 transition"><ClockIcon className="h-5 w-5" /> Pesanan</Link>
            <Link href="/admin/users" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800/60 transition"><UserGroupIcon className="h-5 w-5" /> Pengguna</Link>
          </>
        )}
        {session && session.user.role === "user" && (
          <>
            <Link href="/products" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800/60 transition"><ShoppingBagIcon className="h-5 w-5" /> Akun</Link>
            <Link href="/riwayat" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800/60 transition"><ClockIcon className="h-5 w-5" /> Riwayat</Link>
          </>
        )}
        {!session && status !== "loading" && (
          <>
            <Link href="/products" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800/60 transition"><ShoppingBagIcon className="h-5 w-5" /> Akun</Link>
            <Link href="/login" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-800/60 transition"><ArrowLeftOnRectangleIcon className="h-5 w-5" /> Login</Link>
          </>
        )}
        {session && (
          <>
            <span className="ml-2 flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-sm max-w-[180px] truncate">
              <UserCircleIcon className="h-5 w-5 text-white/80" />
              <span className="truncate" title={session.user.email}>{session.user.email}</span> <span className="italic text-xs">({session.user.role})</span>
            </span>
            <button
              className="ml-2 flex items-center gap-1 btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-blue-700 transition"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
