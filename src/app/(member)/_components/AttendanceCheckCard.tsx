'use client';

import { useState } from 'react';
import Image from 'next/image';
import Select from '@/components/ui/Select';
import { ClockIcon } from '@/components/icons';

type Session = {
  id: string;
  sessionName: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
};

function formatSessionLabel(session: Session) {
  const [, mm, dd] = session.sessionDate.split('-');
  return `${session.sessionName} | ${mm}${dd}`;
}

function isAttendanceOpen(session: Session) {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  if (today !== session.sessionDate) return false;

  const [sh, sm] = session.startTime.split(':').map(Number);
  const [eh, em] = session.endTime.split(':').map(Number);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return nowMinutes >= sh * 60 + sm && nowMinutes <= eh * 60 + em;
}

interface Props {
  sessions: Session[];
}

export default function AttendanceCheckCard({ sessions }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(
    sessions[0]?.id ?? null
  );

  const selectedSession = sessions.find((s) => s.id === selectedId);
  const canCheckIn = selectedSession
    ? isAttendanceOpen(selectedSession)
    : false;

  return (
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
        disabled={!canCheckIn}
        className={`absolute left-4 right-4 bottom-3 flex items-center justify-center gap-2 rounded-2xl py-3 transition-colors ${
          canCheckIn
            ? 'bg-primary text-white active:bg-primary/90'
            : 'bg-grayscale-100 text-grayscale-500 cursor-not-allowed'
        }`}
      >
        <ClockIcon className="size-6 shrink-0" />
        <span className="font-semibold text-base leading-[1.4]">
          {canCheckIn ? '출석하기' : '지금은 출석 시간이 아니에요'}
        </span>
      </button>
    </div>
  );
}
