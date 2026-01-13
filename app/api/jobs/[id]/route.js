import connectDB from "@/lib/db";
import Job from "@/models/Job";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { status } = await req.json();

    const updatedJob = await Job.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    return Response.json(updatedJob);
  } catch (error) {
    console.error("Update error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update job" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    await Job.findByIdAndDelete(params.id);

    return Response.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete job" }),
      { status: 500 }
    );
  }
}

