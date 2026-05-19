import { unauthorized } from 'next/navigation';
import { verifySession } from '@/lib/dal';

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();
  if (!session) unauthorized();

  return (
    <div className="relative mx-auto w-full max-w-mobile min-h-dvh">{children}</div>
  );
}
