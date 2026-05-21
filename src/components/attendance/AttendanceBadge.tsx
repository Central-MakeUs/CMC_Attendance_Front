import { AttendanceStatus } from '@/gql/graphql';
import { ReactNode } from 'react';
import {
  CheckIcon,
  WarnCircleIcon,
  XIcon,
  TriangleAlertIcon,
} from '@/components/icons';

const statusConfig: Record<
  AttendanceStatus,
  { label: string; className: string; icon: ReactNode }
> = {
  ATTENDANCE: {
    label: '출석 완료',
    className: 'bg-primary-light text-primary',
    icon: <CheckIcon />,
  },
  LATE: {
    label: '지각',
    className: 'bg-[#ffefb4] text-[#e39300]',
    icon: <WarnCircleIcon />,
  },
  ABSENCE: {
    label: '결석',
    className: 'bg-grayscale-50 text-grayscale-500',
    icon: <XIcon />,
  },
  EXCUSED_ABSENCE: {
    label: '인정 결석',
    className: 'bg-grayscale-100 text-grayscale-700',
    icon: <TriangleAlertIcon />,
  },
  PENDING: {
    label: '미처리',
    className: 'bg-grayscale-50 text-grayscale-500',
    icon: null,
  },
};

interface AttendanceBadgeProps {
  status: AttendanceStatus;
}

export default function AttendanceBadge({ status }: AttendanceBadgeProps) {
  const { label, className, icon } = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}
