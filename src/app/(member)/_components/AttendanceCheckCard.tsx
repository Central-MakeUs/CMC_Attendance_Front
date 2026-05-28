'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Select from '@/components/ui/Select';
import { CheckCircleIcon } from '@/components/icons';
import { toast } from 'sonner';
import { ClockIcon, CheckCircleOutlineIcon } from '@/components/icons';
import type { ReactNode } from 'react';
import type { AttendanceStatus } from '@/gql/graphql';
import AttendanceBadge from '@/components/attendance/AttendanceBadge';
import { gql } from '@/gql';
import { createBrowserClient } from '@/lib/graphql/client';

const RequestAttendanceMutation = gql(`
  mutation RequestAttendance($sessionId: ID!, $latitude: Float!, $longitude: Float!) {
    requestAttendance(input: { sessionId: $sessionId, latitude: $latitude, longitude: $longitude }) {
      attendanceStatus
    }
  }
`);

type Session = {
  id: string;
  sessionName: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  attendanceStatus?: AttendanceStatus | null;
};

function formatSessionLabel(session: Session) {
  const [, mm, dd] = session.sessionDate.split('-');
  return `${session.sessionName} | ${mm}${dd}`;
}

function toMinutes(time: string) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function getSessionTimeState(
  session: Session,
  now: Date
): 'before' | 'open' | 'late' | 'ended' {
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  if (today !== session.sessionDate) return 'ended';

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = toMinutes(session.startTime);
  const endMinutes = toMinutes(session.endTime);

  if (nowMinutes < startMinutes - 10) return 'before';
  if (nowMinutes > endMinutes) return 'ended';
  if (nowMinutes >= startMinutes + 10) return 'late';
  return 'open';
}

type ButtonState =
  | { enabled: true; label: string; variant: 'checkIn'; icon: ReactNode }
  | {
      enabled: false;
      label: string;
      variant: 'attended' | 'disabled';
      icon: ReactNode;
    };

const BUTTON_STATES = {
  attended: {
    enabled: false,
    label: '출석을 완료했어요',
    variant: 'attended',
    icon: <CheckCircleOutlineIcon className="size-6 shrink-0" />,
  },
  late: {
    enabled: false,
    label: '출석 시간이 지났어요',
    variant: 'attended',
    icon: <CheckCircleOutlineIcon className="size-6 shrink-0" />,
  },
  checkIn: {
    enabled: true,
    label: '출석 체크하기',
    variant: 'checkIn',
    icon: <ClockIcon className="size-6 shrink-0" />,
  },
  disabled: {
    enabled: false,
    label: '지금은 출석 시간이 아니에요',
    variant: 'disabled',
    icon: <ClockIcon className="size-6 shrink-0" />,
  },
} satisfies Record<string, ButtonState>;

function getBadgeStatus(session: Session, now: Date): AttendanceStatus | null {
  const state = getSessionTimeState(session, now);
  if (state === 'open') return 'ATTENDANCE';
  if (state === 'late') return 'LATE';
  return null;
}

function getButtonState(session: Session, now: Date): ButtonState {
  if (session.attendanceStatus === 'ATTENDANCE') return BUTTON_STATES.attended;
  if (session.attendanceStatus === 'LATE') return BUTTON_STATES.late;

  const state = getSessionTimeState(session, now);
  if (state === 'open' || state === 'late') return BUTTON_STATES.checkIn;
  return BUTTON_STATES.disabled;
}

interface Props {
  sessions: Session[];
  initialSelectedId: string | null;
}

export default function AttendanceCheckCard({
  sessions: initialSessions,
  initialSelectedId,
}: Props) {
  const [sessions, setSessions] = useState(initialSessions);
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId);
  const [isLoading, setIsLoading] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const selectedSession = sessions.find((s) => s.id === selectedId);

  useEffect(() => {
    if (!selectedSession) return;

    const now = Date.now();
    const [sh, sm] = selectedSession.startTime.split(':').map(Number);
    const [eh, em] = selectedSession.endTime.split(':').map(Number);

    const baseDate = new Date(`${selectedSession.sessionDate}T00:00:00`);
    const openAt = baseDate.getTime() + (sh * 60 + sm - 10) * 60_000;
    const lateAt = baseDate.getTime() + (sh * 60 + sm + 10) * 60_000;
    const closeAt = baseDate.getTime() + (eh * 60 + em) * 60_000;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    if (openAt > now) {
      timeouts.push(setTimeout(() => setNow(new Date(openAt)), openAt - now));
    }
    if (lateAt > now) {
      timeouts.push(setTimeout(() => setNow(new Date(lateAt)), lateAt - now));
    }
    if (closeAt > now) {
      timeouts.push(setTimeout(() => setNow(new Date(closeAt)), closeAt - now));
    }

    return () => timeouts.forEach(clearTimeout);
  }, [selectedSession]);

  const {
    enabled: canCheckIn,
    label: buttonLabel,
    variant: buttonVariant,
    icon,
  } = selectedSession
    ? getButtonState(selectedSession, now)
    : {
        enabled: false,
        label: '지금은 출석 시간이 아니에요',
        variant: 'disabled' as const,
        icon: <ClockIcon className="size-6 shrink-0" />,
      };

  const badgeStatus = selectedSession
    ? getBadgeStatus(selectedSession, now)
    : null;

  async function handleCheckIn() {
    if (!selectedSession || isLoading) return;

    setIsLoading(true);

    const position = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    ).catch(() => null);

    if (!position) {
      toast.warning('위치 확인 권한을 허용해주세요.');
      setIsLoading(false);
      return;
    }
    try {
      const client = createBrowserClient();
      const data = await client.request(RequestAttendanceMutation, {
        sessionId: selectedSession.id,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setSessions((prev) =>
        prev.map((s) =>
          s.id === selectedSession.id
            ? {
                ...s,
                attendanceStatus: data.requestAttendance.attendanceStatus,
              }
            : s
        )
      );
      toast.success('출석을 완료했어요.', { icon: <CheckCircleIcon /> });
    } catch {
      toast.warning('세션 장소에 조금 더 가까이 이동해 주세요.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[22px] font-bold text-grayscale-900 leading-normal flex items-center gap-2">
        출석 체크를 해주세요
        {badgeStatus && <AttendanceBadge status={badgeStatus} />}
      </h2>
      <div className="relative bg-[#eff1ff] rounded-2xl h-[183px]">
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-3">
            <Image src="/check.svg" alt="" width={148} height={158} />
          </div>
        </div>

        <div className="absolute left-4 top-4 flex flex-col gap-2">
          <span className="text-sm font-semibold text-primary leading-normal">
            세션 선택
          </span>
          <Select
            value={selectedId}
            onChange={setSelectedId}
            className="w-[200px]"
          >
            <Select.Trigger className="flex items-center justify-between gap-1 bg-white rounded-2xl px-4 py-3 w-[200px]">
              <span className="text-[18px] font-medium text-grayscale-900 leading-normal truncate">
                {selectedSession
                  ? formatSessionLabel(selectedSession)
                  : '세션 선택'}
              </span>
              <Select.Chevron />
            </Select.Trigger>
            <Select.Content className="mt-1 w-[200px] bg-white rounded-2xl shadow-[0px_1px_4px_0px_rgba(0,0,0,0.03),0px_4px_12px_0px_rgba(0,0,0,0.16)] overflow-hidden">
              {sessions.map((session) => (
                <Select.Item
                  key={session.id}
                  value={session.id}
                  className={(isSelected) =>
                    `w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                      isSelected
                        ? 'text-primary bg-grayscale-50'
                        : 'text-grayscale-500 hover:bg-grayscale-50'
                    }`
                  }
                >
                  {formatSessionLabel(session)}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>

        <button
          disabled={!canCheckIn || isLoading}
          onClick={handleCheckIn}
          className={`absolute left-4 right-4 bottom-3 flex items-center justify-center gap-2 rounded-2xl py-3 transition-colors ${
            buttonVariant === 'checkIn' && !isLoading
              ? 'bg-primary text-white active:bg-primary/90'
              : 'bg-grayscale-100 text-grayscale-500 cursor-not-allowed'
          }`}
        >
          {icon}
          <span className="font-semibold text-base leading-[1.4]">
            {buttonLabel}
          </span>
        </button>
      </div>
    </div>
  );
}
