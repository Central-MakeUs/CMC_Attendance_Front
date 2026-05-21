import { formatDateWithDay } from '@/lib/date';

export const formatSessionTime = (
  sessionDate: string,
  startTime: string,
  endTime: string
) => {
  return `${formatDateWithDay(sessionDate)} ${startTime}~${endTime}`;
};
