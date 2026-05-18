import {unauthorized} from "next/navigation";
import {verifySession} from "@/lib/dal";

export default async function MemberLayout({children}: {children: React.ReactNode}) {
  const session = await verifySession();
  if (!session) unauthorized();

  return <>{children}</>;
}
