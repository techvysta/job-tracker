import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json({ message: "User created" });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "User already exists" }),
      { status: 400 }
    );
  }
}
