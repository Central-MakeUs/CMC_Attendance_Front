import { formatDate } from '@/lib/date';

export const formatSessionTime = (
  sessionDate: string,
  startTime: string,
  endTime: string
) => {
  return `${formatDate(sessionDate)} ${startTime}~${endTime}`;
};
