import { redirect } from 'next/navigation';
import ChallengersTableView from './_components/ChallengersTableView';

interface Props {
  searchParams: Promise<{ generationNumber?: string }>;
}

export default async function ChallengersPage({ searchParams }: Props) {
  const { generationNumber } = await searchParams;

  if (!generationNumber) redirect('/admin');

  return (
    <div className="flex flex-col h-full p-6 gap-6 overflow-y-auto">
      <h1 className="text-2xl font-bold text-grayscale-900">챌린저 관리</h1>
      <ChallengersTableView generationNumber={Number(generationNumber)} />
    </div>
  );
}
