'use client';

import { useState } from 'react';
import { formatDate, formatDateWithDay } from '@/lib/date';
import { ChevronDownIcon } from '@/components/icons';

type Session = {
  id: string;
  sessionName: string;
  description: string | null;
  placeName: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
};

interface Props {
  session: Session;
}

export default function SessionAccordionItem({ session }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-grayscale-50 rounded-2xl">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4"
      >
        <div className="flex items-center gap-2">
          <span className="bg-white px-2 py-1 rounded-full text-xs font-semibold text-grayscale-700 leading-normal whitespace-nowrap">
            {formatDate(session.sessionDate)}
          </span>
          <span className="text-base font-bold text-grayscale-900 leading-normal">
            {session.sessionName}
          </span>
        </div>
        <span
          className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 flex flex-col gap-3">
          <div className="bg-white rounded-xl p-3 flex flex-col gap-3">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-grayscale-50 px-2 py-1 rounded-full text-xs font-semibold text-grayscale-700 shrink-0">
                  시간
                </span>
                <span className="text-sm font-medium text-grayscale-700">
                  {formatDateWithDay(session.sessionDate)} {session.startTime}~
                  {session.endTime}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-grayscale-50 px-2 py-1 rounded-full text-xs font-semibold text-grayscale-700 shrink-0">
                  장소
                </span>
                <span className="text-sm font-medium text-grayscale-700">
                  {session.placeName}
                </span>
              </div>
            </div>
            {session.description && (
              <>
                <div className="h-px bg-grayscale-50" />
                <p className="text-sm font-medium text-grayscale-700 leading-normal">
                  {session.description}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
