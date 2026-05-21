import { redirect } from 'next/navigation';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { SessionsDocument } from '@/gql/graphql';
import { gqlClient } from '@/lib/graphql/server';
import { getAccessToken } from '@/lib/cookies/server';
import AttendanceTableView, {
  AttendanceRecord,
} from './_components/AttendanceTableView';
import SessionHeader from './_components/SessionHeader';
import { gql } from '@/gql';

type SessionAttendancesResponse = {
  sessionAttendances: { items: AttendanceRecord[] };
};
type SessionAttendancesVariables = {
  sessionId: string;
  page: number;
  size: number;
};

const SessionAttendancesQuery = gql(`
  query SessionAttendances($sessionId: ID!, $page: Int!, $size: Int!) {
    sessionAttendances(sessionId: $sessionId, page: $page, size: $size) {
      items {
        name
        nickname
        part
        team
        attendanceStatus
        updatedAt
        updatedBy
        note
      }
    }
  }
`) as TypedDocumentNode<
  SessionAttendancesResponse,
  SessionAttendancesVariables
>;

async function getSession(generationNumber: number, sessionId: string) {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  try {
    const data = await gqlClient.request(
      SessionsDocument,
      { generationNumber },
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );
    return data.sessions.find((s) => s.id === sessionId) ?? null;
  } catch {
    return null;
  }
}

async function getAttendanceRecords(
  sessionId: string
): Promise<AttendanceRecord[]> {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  try {
    const data = await gqlClient.request(
      SessionAttendancesQuery,
      { sessionId, page: 1, size: 10 },
      { Authorization: `Bearer ${accessToken}` }
    );
    return data.sessionAttendances.items as AttendanceRecord[];
  } catch {
    return [];
  }
}

interface Props {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ generationNumber?: string }>;
}

export default async function SessionDetailPage({
  params,
  searchParams,
}: Props) {
  const { sessionId } = await params;
  const { generationNumber } = await searchParams;

  if (!generationNumber) redirect('/admin');

  const [session, records] = await Promise.all([
    getSession(Number(generationNumber), sessionId),
    getAttendanceRecords(sessionId),
  ]);

  if (!session) redirect('/admin');

  return (
    <div className="flex flex-col h-full p-6 gap-6 overflow-y-auto">
      <SessionHeader session={session} />
      <AttendanceTableView records={records} />
    </div>
  );
}
