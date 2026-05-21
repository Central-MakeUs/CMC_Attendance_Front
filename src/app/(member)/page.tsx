import Image from 'next/image';
import { gql } from '@/gql';
import { gqlClient } from '@/lib/graphql/server';
import { getAccessToken, getGenerationNumber } from '@/lib/cookies/server';
import { formatDateWithDay } from '@/lib/date';
import { PinIcon } from '@/components/icons';
import AttendanceCheckCard from './_components/AttendanceCheckCard';
import SessionAccordionItem from './_components/SessionAccordionItem';

const SessionsQuery = gql(`
  query MemberSessions($generationNumber: Int!) {
    sessions(generationNumber: $generationNumber) {
      id
      sessionName
      description
      placeName
      sessionDate
      startTime
      endTime
      attendanceStartTime
      attendanceEndTime
    }
  }
`);

async function getSessions() {
  const [accessToken, generationNumber] = await Promise.all([
    getAccessToken(),
    getGenerationNumber(),
  ]);

  if (!accessToken || !generationNumber) return [];

  try {
    const data = await gqlClient.request(SessionsQuery, { generationNumber }, {
      Authorization: `Bearer ${accessToken}`,
    });
    return data.sessions;
  } catch {
    return [];
  }
}

export default async function AttendancePage() {
  const sessions = await getSessions();
  const [pinnedSession, ...otherSessions] = sessions;

  return (
    <div className="flex flex-col">
      <header className="flex items-center h-[54px] px-4 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative size-[22px]">
            <Image src="/cmc-logo.svg" alt="CMC" fill />
          </div>
          <span className="text-[18px] font-semibold text-grayscale-900 tracking-[-0.02em] leading-normal">
            CMC
          </span>
        </div>
      </header>
      <section className="px-4 pt-6 pb-8 flex flex-col gap-4">
        <h2 className="text-[22px] font-bold text-grayscale-900 leading-normal">
          출석 체크를 해주세요
        </h2>
        <AttendanceCheckCard sessions={sessions} />
      </section>
      <div className="h-1.5 bg-grayscale-50 shrink-0" />
      <section className="px-4 pt-6 pb-8 flex flex-col gap-4">
        <h2 className="text-[22px] font-bold text-grayscale-900 leading-normal">
          세션 공지
        </h2>
        {pinnedSession && (
          <div className="bg-grayscale-50 rounded-2xl p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <PinIcon className="size-6 shrink-0" />
                <span className="text-base font-bold text-grayscale-900 leading-normal">
                  {pinnedSession.sessionName}
                </span>
              </div>
              <div className="bg-white rounded-xl p-3 flex flex-col gap-3">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-grayscale-50 px-2 py-1 rounded-full text-xs font-semibold text-grayscale-700 shrink-0">
                      시간
                    </span>
                    <span className="text-sm font-medium text-grayscale-700">
                      {formatDateWithDay(pinnedSession.sessionDate)}{' '}
                      {pinnedSession.startTime}~{pinnedSession.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-grayscale-50 px-2 py-1 rounded-full text-xs font-semibold text-grayscale-700 shrink-0">
                      장소
                    </span>
                    <span className="text-sm font-medium text-grayscale-700">
                      {pinnedSession.placeName}
                    </span>
                  </div>
                </div>

                {pinnedSession.description && (
                  <>
                    <div className="h-px bg-grayscale-50" />
                    <p className="text-sm font-medium text-grayscale-700 leading-normal">
                      {pinnedSession.description}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {otherSessions.map((session) => (
          <SessionAccordionItem key={session.id} session={session} />
        ))}
      </section>
    </div>
  );
}
