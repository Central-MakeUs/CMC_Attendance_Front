'use client';

import { AttendanceStatus } from '@/gql/graphql';
import Select from '@/components/ui/Select';
import AttendanceBadge from './AttendanceBadge';
import { ChevronDownFillIcon } from '../icons';

const ALL_STATUSES: AttendanceStatus[] = ['ATTENDANCE', 'LATE', 'ABSENCE', 'EXCUSED_ABSENCE', 'PENDING'];

interface AttendanceStatusSelectProps {
  value: AttendanceStatus;
  onChange: (status: AttendanceStatus) => void;
}

export default function AttendanceStatusSelect({ value, onChange }: AttendanceStatusSelectProps) {
  return (
    <Select value={value} onChange={(status) => status && onChange(status)}>
      <Select.Trigger className="flex items-center justify-between w-[124px]">
        <AttendanceBadge status={value} />
        <Select.Chevron>
          <ChevronDownFillIcon />
        </Select.Chevron>
      </Select.Trigger>
      <Select.Content className="mt-1 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] overflow-hidden min-w-max">
        {ALL_STATUSES.map((status) => (
          <Select.Item
            key={status}
            value={status}
            className={(isSelected) =>
              `w-full px-4 py-2.5 text-left text-sm hover:bg-grayscale-50 transition-colors ${
                isSelected ? 'font-semibold text-primary' : 'text-grayscale-700'
              }`
            }
          >
            <AttendanceBadge status={status} />
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
}
