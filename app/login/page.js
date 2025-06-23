"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (res.ok) {
      Swal.fire('Sukses', 'Login berhasil', 'success').then(() => window.location = '/');
    } else {
      Swal.fire('Gagal', 'Email atau password salah', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-2xl mt-10 animate-fade-in flex flex-col gap-6 border border-blue-100">
      <h1 className="text-3xl font-extrabold text-blue-700 flex items-center gap-2 justify-center mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 11a4 4 0 100-8 4 4 0 000 8z" /></svg>
        Login
      </h1>
      <p className="mb-2 text-center text-gray-500">Belum punya akun? <a href="/register" className="text-blue-600 hover:underline">Daftar di sini</a></p>
      <div className="mb-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="bg-blue-50 p-3 rounded flex flex-col items-start">
          <div className="font-semibold flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 11a4 4 0 100-8 4 4 0 000 8z" /></svg>Akun Admin</div>
          <div>Email: <span className="font-mono">admin@admin.com</span></div>
          <div>Password: <span className="font-mono">admin123</span></div>
        </div>
        <div className="bg-green-50 p-3 rounded flex flex-col items-start">
          <div className="font-semibold flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-400"><path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 11a4 4 0 100-8 4 4 0 000 8z" /></svg>Akun User</div>
          <div>Email: <span className="font-mono">user@user.com</span></div>
          <div>Password: <span className="font-mono">user123</span></div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold text-blue-700 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.5a2.25 2.25 0 01-2.36 0l-7.5-4.5A2.25 2.25 0 012.25 6.993V6.75" /></svg>
            Email
          </label>
          <input name="email" id="email" value={form.email} onChange={handleChange} required placeholder="Email" className="input input-bordered w-full focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold text-blue-700 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m13.5 0a2.25 2.25 0 00-2.25-2.25h-10.5a2.25 2.25 0 00-2.25 2.25v6.75A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V10.5z" /></svg>
            Password
          </label>
          <input name="password" id="password" value={form.password} onChange={handleChange} required placeholder="Password" type="password" className="input input-bordered w-full focus:ring-2 focus:ring-blue-400" />
        </div>
        <button
          type="submit"
          className="btn w-full flex items-center justify-center gap-2 text-lg group hover:scale-105 transition focus:ring-2 focus:ring-blue-400 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg border-0 rounded-xl py-3 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
          aria-label="Login"
        >
          {loading ? <Spinner size={24} /> : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0v10.5A2.25 2.25 0 0113.5 21h-3a2.25 2.25 0 01-2.25-2.25V9m7.5 0h-7.5" /></svg>
          )}
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>
    </div>
  );
}
