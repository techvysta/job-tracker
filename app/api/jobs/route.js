import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { company, role } = await req.json();

    const job = await Job.create({
      company,
      role,
      userId: session.user.id,
    });

    return Response.json(job);
  } catch (error) {
    return new Response("Failed to create job", { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const jobs = await Job.find({
      userId: session.user.id,
    }).sort({ createdAt: -1 });

    return Response.json(jobs);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch jobs" }),
      { status: 500 }
    );
  }
}

