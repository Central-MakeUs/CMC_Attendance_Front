import { redirect } from 'next/navigation';
import { gql } from '@/gql';
import { gqlClient } from '@/lib/graphql/server';
import { getAccessToken } from '@/lib/cookies/server';
import Button from '@/components/ui/Button';
import SessionCard from './_components/SessionCard';

const SessionsQuery = gql(`
  query Sessions($generationNumber: Int!) {
    sessions(generationNumber: $generationNumber) {
      id
      generation {
        id
        number
      }
      sessionName
      description
      placeName
      attendanceStatus
      sessionDate
      startTime
      endTime
      attendanceStartTime
      attendanceEndTime
      createdBy
      updatedBy
      createdAt
      updatedAt
    }
  }
`);

interface Props {
  searchParams: Promise<{ generationNumber?: string }>;
}

async function getSessions(generationNumber: number) {
  const accessToken = await getAccessToken();

  if (!accessToken) return [];

  try {
    const data = await gqlClient.request(SessionsQuery, { generationNumber }, {
      Authorization: `Bearer ${accessToken}`,
    });
    return data.sessions;
  } catch {
    return [];
  }
}

export default async function SessionsPage({ searchParams }: Props) {
  const { generationNumber } = await searchParams;

  if (!generationNumber) redirect('/admin');

  const sessions = await getSessions(Number(generationNumber));

  return (
    <div className="flex flex-col h-full p-6 gap-6 overflow-y-auto">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="font-bold text-2xl leading-normal text-grayscale-900">
          세션 관리
        </h1>
        <Button className="w-auto! px-6 h-12 rounded-2xl text-lg">
          세션 생성
        </Button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(563px,100%),1fr))] gap-6">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            generationNumber={generationNumber}
          />
        ))}
      </div>
    </div>
  );
}
