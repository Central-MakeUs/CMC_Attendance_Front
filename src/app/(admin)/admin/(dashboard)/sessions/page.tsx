import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{ generationNumber?: string }>;
}

export default async function SessionsPage({ searchParams }: Props) {
  const { generationNumber } = await searchParams;

  if (!generationNumber) redirect('/admin');

  return (
    <div>
      <h1>세션 관리</h1>
    </div>
  );
}
