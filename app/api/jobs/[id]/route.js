import connectDB from "@/lib/db";
import Job from "@/models/Job";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * UPDATE JOB (status update)
 * PUT /api/jobs/:id
 */
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { status } = await req.json();

    const updatedJob = await Job.findOneAndUpdate(
      {
        _id: params.id,
        userId: session.user.id, // 🔐 ownership check
      },
      { status },
      { new: true }
    );

    if (!updatedJob) {
      return new Response("Job not found", { status: 404 });
    }

    return Response.json(updatedJob);
  } catch (error) {
    console.error("Update job error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update job" }),
      { status: 500 }
    );
  }
}

/**
 * DELETE JOB
 * DELETE /api/jobs/:id
 */
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const deletedJob = await Job.findOneAndDelete({
      _id: params.id,
      userId: session.user.id, // 🔐 ownership check
    });

    if (!deletedJob) {
      return new Response("Job not found", { status: 404 });
    }

    return Response.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete job error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete job" }),
      { status: 500 }
    );
  }
}
