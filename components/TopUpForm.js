"use client";
import { useState } from "react";
import { useCart } from "./CartContext";
import Spinner from "./Spinner";

export default function TopUpForm({ onSubmit }) {
  const { cart } = useCart();
  const [form, setForm] = useState({
    email: "",
    gameId: "",
    nominal: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (onSubmit) await onSubmit(form);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">ID Game</label>
        <input
          type="text"
          name="gameId"
          value={form.gameId}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Nominal</label>
        <input
          type="number"
          name="nominal"
          value={form.nominal}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? <Spinner size={20} /> : "Top Up"}
      </button>
    </form>
  );
}
