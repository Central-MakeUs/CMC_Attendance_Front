interface SessionInfo {
  sessionName: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  placeName: string;
  description: string | null;
}

import { formatSessionTime } from '../../utils';

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-base font-semibold text-grayscale-700 whitespace-nowrap">
        {label}
      </span>
      <div className="w-px h-5 bg-grayscale-100 shrink-0" />
      <span className="text-base text-grayscale-900 whitespace-nowrap">
        {value}
      </span>
    </div>
  );
}

interface SessionHeaderProps {
  session: SessionInfo;
}

export default function SessionHeader({ session }: SessionHeaderProps) {
  const {
    sessionName,
    sessionDate,
    startTime,
    endTime,
    placeName,
    description,
  } = session;
  const timeLabel = formatSessionTime(sessionDate, startTime, endTime);

  return (
    <div className="flex flex-col gap-5 pb-5 border-b border-grayscale-100">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl leading-normal text-grayscale-900">
          {sessionName}
        </h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center justify-center px-6 py-3 rounded-2xl bg-grayscale-50 text-lg font-semibold leading-[1.4] text-grayscale-700 hover:bg-grayscale-100 transition-colors"
          >
            수정
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-6 py-3 rounded-2xl bg-grayscale-50 text-lg font-semibold leading-[1.4] text-grayscale-700 hover:bg-grayscale-100 transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-24">
          <InfoItem label="시간" value={timeLabel} />
          <InfoItem label="장소" value={placeName} />
        </div>
        {description && <InfoItem label="설명" value={description} />}
      </div>
    </div>
  );
}
