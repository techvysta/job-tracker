"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      setError("User already exists");
      return;
    }

    // after successful register → go to login
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-black border p-6 rounded w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-white">Register</h1>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <input
          name="name"
          placeholder="Name"
          required
          className="w-full mb-3 p-2 rounded bg-gray-900 text-white border"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full mb-3 p-2 rounded bg-gray-900 text-white border"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full mb-4 p-2 rounded bg-gray-900 text-white border"
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

