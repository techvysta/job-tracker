"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export default function DashboardClient({ user }) {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");

        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error loading jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Add job
  const addJob = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ company, role }),
    });

    setCompany("");
    setRole("");

    const res = await fetch("/api/jobs");
    const data = await res.json();
    setJobs(data);

    setSubmitting(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">

      {/* USER INFO + LOGOUT */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500">
          Logged in as <strong>{user.email}</strong>
        </p>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Job Tracker</h1>

      {/* ADD JOB FORM */}
      <form onSubmit={addJob} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Job role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          disabled={submitting}
          className={`px-4 py-2 rounded text-white ${
            submitting ? "bg-gray-400" : "bg-indigo-600"
          }`}
        >
          {submitting ? "Adding..." : "Add Job"}
        </button>
      </form>

      {/* JOB LIST */}
      {loading ? (
        <p className="text-center text-gray-500 mt-10">
          Loading jobs...
        </p>
      ) : jobs.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="mb-2">No jobs added yet.</p>
          <p className="text-sm">
            Start by adding your first job above 👆
          </p>
        </div>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="border p-3 mb-2 rounded flex justify-between items-center"
          >
            <div>
              <p><strong>{job.company}</strong></p>
              <p>{job.role}</p>
              <p className="text-sm text-gray-500">
                Status: {job.status}
              </p>
            </div>

            <button
              onClick={async () => {
                const confirmDelete = confirm("Delete this job?");
                if (!confirmDelete) return;

                await fetch(`/api/jobs/${job._id}`, {
                  method: "DELETE",
                });

                setJobs((prev) =>
                  prev.filter((j) => j._id !== job._id)
                );
              }}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}



