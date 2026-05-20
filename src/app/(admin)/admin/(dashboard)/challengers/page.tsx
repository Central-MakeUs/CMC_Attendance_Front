import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{ generationNumber?: string }>;
}

export default async function ChallengersPage({ searchParams }: Props) {
  const { generationNumber } = await searchParams;

  if (!generationNumber) redirect('/admin');

  return (
    <div>
      <h1>챌린저 관리</h1>
    </div>
  );
}
