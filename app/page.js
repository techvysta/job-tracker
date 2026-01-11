import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold text-indigo-600">
        Job Application Tracker
      </h1>
      <p className="mt-4 text-gray-600">
        Track your job applications easily
      </p>
      <div className="mt-6 space-x-4">
        <Link
          href="/login"
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Register
        </Link>
      </div>
    </main>
  );
}

