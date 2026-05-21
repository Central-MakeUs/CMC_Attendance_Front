import { redirect } from 'next/navigation';
import { SessionsDocument, SessionAttendancesDocument } from '@/gql/graphql';
import { gqlClient } from '@/lib/graphql/server';
import { getAccessToken } from '@/lib/cookies/server';
import AttendanceTableView, { AttendanceRecord } from './_components/AttendanceTableView';
import SessionHeader from './_components/SessionHeader';

const PAGE_SIZE = 10;

async function getSession(generationNumber: number, sessionId: string) {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  try {
    const data = await gqlClient.request(
      SessionsDocument,
      { generationNumber },
      { Authorization: `Bearer ${accessToken}` }
    );
    return data.sessions.find((s) => s.id === sessionId) ?? null;
  } catch {
    return null;
  }
}

async function getInitialAttendances(sessionId: string) {
  const accessToken = await getAccessToken();
  if (!accessToken) return { records: [], totalPages: 1 };

  try {
    const data = await gqlClient.request(
      SessionAttendancesDocument,
      { sessionId, page: 1, size: PAGE_SIZE },
      { Authorization: `Bearer ${accessToken}` }
    );
    return {
      records: data.sessionAttendances.items as AttendanceRecord[],
      totalPages: data.sessionAttendances.pageInfo.totalPages,
    };
  } catch {
    return { records: [], totalPages: 1 };
  }
}

interface Props {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ generationNumber?: string }>;
}

export default async function SessionDetailPage({ params, searchParams }: Props) {
  const { sessionId } = await params;
  const { generationNumber } = await searchParams;

  if (!generationNumber) redirect('/admin');

  const [session, { records, totalPages }] = await Promise.all([
    getSession(Number(generationNumber), sessionId),
    getInitialAttendances(sessionId),
  ]);

  if (!session) redirect('/admin');

  return (
    <div className="flex flex-col h-full p-6 gap-6 overflow-y-auto">
      <SessionHeader session={session} />
      <AttendanceTableView
        sessionId={sessionId}
        initialRecords={records}
        initialTotalPages={totalPages}
      />
    </div>
  );
}
