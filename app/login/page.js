"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-black border p-6 rounded w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-white">Login</h1>

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
          Login
        </button>
      </form>
    </div>
  );
}
