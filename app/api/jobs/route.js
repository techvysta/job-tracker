import connectDB from "@/lib/db";
import Job from "@/models/Job";

export async function GET() {
  try {
    await connectDB();
    const jobs = await Job.find();
    return Response.json(jobs);
  } catch (error) {
    console.error("GET /api/jobs error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch jobs" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const job = await Job.create(body);
    return Response.json(job);
  } catch (error) {
    console.error("POST /api/jobs error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create job" }),
      { status: 500 }
    );
  }
}
