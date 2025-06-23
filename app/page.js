"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-xl mt-6 animate-fade-in flex flex-col items-center justify-center border border-blue-100">
        <h1 className="flex flex-col items-center w-full mb-2">
          <span className="flex items-center gap-3">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-purple-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2"
              />
            </svg>
            <span className="text-5xl font-extrabold text-blue-700 drop-shadow text-center">
              Velmo Store
            </span>
          </span>
        </h1>
        <span className="block text-2xl font-bold text-blue-500 mt-2 text-center w-full">
          Jual Akun Game Online
        </span>
        <p className="text-gray-600 text-xl text-center mb-8 max-w-2xl leading-relaxed">
          Platform terpercaya untuk jual beli akun game favoritmu dengan mudah, aman,
          dan cepat. Temukan akun impianmu di Velmo Store!
        </p>
        <Image
          src="/uploads/logo.jpeg"
          alt="Logo Velmo Store"
          width={192}
          height={192}
          className="w-48 h-48 mb-8 drop-shadow-lg rounded-full border-4 border-blue-200 bg-white object-contain mx-auto"
          priority
        />
        <div className="flex justify-center w-full">
          <a
            href="/products"
            className="btn btn-primary btn-lg flex items-center gap-2 group hover:scale-105 transition focus:ring-2 focus:ring-blue-400 mt-2 px-8 py-3 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg border-2 border-blue-300 hover:from-purple-500 hover:to-blue-500 hover:border-purple-400 hover:shadow-2xl animate-bounce-slow"
            title="Lihat Akun Game"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2"
              />
            </svg>
            Lihat Akun Game
          </a>
        </div>
      </div>
      {/* IG Card di bawah card utama, hanya satu, gambar lebih besar */}
      <div className="max-w-4xl w-full mx-auto mt-6 p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-xl flex flex-col items-center border border-pink-100">
        <Image
          src="/uploads/ig.jpg"
          alt="Instagram Velmo Store"
          width={800}
          height={400}
          className="w-full max-w-2xl h-[400px] object-contain bg-white rounded-lg shadow mb-4"
          priority
        />
        <a
          href="https://www.instagram.com/shopgame.velmo?igsh=MXZ0ZWpwY2R1cWM1eQ=="
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-pink-600 font-semibold text-base hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-pink-500"
          >
            <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zm8.25 2.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
          </svg>
          Instagram
        </a>
      </div>
    </div>
  );
}
