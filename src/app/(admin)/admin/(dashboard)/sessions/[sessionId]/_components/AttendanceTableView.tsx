'use client';

import { useState, useMemo } from 'react';
import Table, { Column } from '@/components/ui/Table';
import SegmentTabs from '@/components/ui/SegmentTabs';
import DropdownSelect from '@/components/ui/DropdownSelect';
import SearchBar from '@/components/ui/SearchBar';
import AttendanceBadge from '@/components/attendance/AttendanceBadge';
import { AttendanceStatus, Part } from '@/gql/graphql';
import { formatDateTime } from '@/lib/date';

export interface AttendanceRecord {
  name: string;
  nickname: string;
  part: Part;
  team: string;
  attendanceStatus: AttendanceStatus;
  updatedAt: string;
  updatedBy: string;
  note: string | null;
}

const PARTS: Part[] = ['iOS', 'Android', 'Web', 'Server', 'Flutter', 'Designer', 'PM'];

const STATUS_TABS: Array<{ label: string; value: '전체' | AttendanceStatus }> = [
  { label: '전체', value: '전체' },
  { label: '출석 완료', value: 'ATTENDANCE' as AttendanceStatus },
  { label: '지각', value: 'LATE' as AttendanceStatus },
  { label: '결석', value: 'ABSENCE' as AttendanceStatus },
];

interface AttendanceTableViewProps {
  records: AttendanceRecord[];
}

export default function AttendanceTableView({ records }: AttendanceTableViewProps) {
  const [selectedStatus, setSelectedStatus] = useState<'전체' | AttendanceStatus>('전체');
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const matchesStatus = selectedStatus === '전체' || r.attendanceStatus === selectedStatus;
      const matchesPart = selectedPart === null || r.part === selectedPart;
      const matchesSearch = r.nickname.includes(appliedSearch);
      return matchesStatus && matchesPart && matchesSearch;
    });
  }, [records, selectedStatus, selectedPart, appliedSearch]);

  const columns: Column<AttendanceRecord>[] = [
    { key: 'name', label: '이름', render: (row) => row.name },
    { key: 'nickname', label: '닉네임', render: (row) => row.nickname },
    { key: 'part', label: '파트', render: (row) => row.part },
    {
      key: 'attendanceStatus',
      label: '출석 현황',
      render: (row) => <AttendanceBadge status={row.attendanceStatus} />,
    },
    { key: 'updatedAt', label: '마지막 수정일', render: (row) => formatDateTime(row.updatedAt) },
    { key: 'updatedBy', label: '마지막 수정자', render: (row) => row.updatedBy },
    { key: 'note', label: '비고', render: (row) => row.note },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <SegmentTabs tabs={STATUS_TABS} value={selectedStatus} onChange={setSelectedStatus} />
          <DropdownSelect
            options={PARTS}
            value={selectedPart}
            onChange={setSelectedPart}
            placeholder="파트 선택"
          />
        </div>
        <div className="self-stretch w-px bg-grayscale-100" />
        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={() => setAppliedSearch(search)}
          placeholder="챌린저 검색"
        />
      </div>
      <Table
        columns={columns}
        data={filtered}
        keyExtractor={(row) => row.nickname}
        emptyMessage="출석 데이터가 없습니다."
      />
    </div>
  );
}
