import { unauthorized, forbidden } from 'next/navigation';
import { verifySession } from '@/lib/dal';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();
  if (!session) unauthorized();
  if (session.role !== 'ROOT' && session.role !== 'LEAD') forbidden();

  return <>{children}</>;
}
