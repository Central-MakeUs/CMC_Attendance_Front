import { forbidden } from 'next/navigation';
import { verifySession } from '@/lib/dal';
import UsersTableView from './_components/UsersTableView';

export default async function UsersPage() {
  const session = await verifySession();
  if (session?.role !== 'ROOT') forbidden();

  return (
    <div className="flex flex-col h-full p-6 gap-6 overflow-y-auto">
      <h1 className="text-2xl font-bold text-grayscale-900">유저 관리</h1>
      <UsersTableView />
    </div>
  );
}
