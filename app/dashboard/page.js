import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <pre style={{ color: "white" }}>
      {JSON.stringify(session, null, 2)}
    </pre>
  );
}



