'use client';

import { useState, useEffect, useRef } from 'react';
import { SessionAttendancesDocument } from '@/gql/graphql';
import Table, { Column } from '@/components/ui/Table';
import SegmentTabs from '@/components/ui/SegmentTabs';
import DropdownSelect from '@/components/ui/DropdownSelect';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';
import AttendanceBadge from '@/components/attendance/AttendanceBadge';
import { AttendanceStatus, Part } from '@/gql/graphql';
import { formatDateTime } from '@/lib/date';
import { createBrowserClient } from '@/lib/graphql/client';

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

const PAGE_SIZE = 10;

const PARTS: Part[] = ['iOS', 'Android', 'Web', 'Server', 'Flutter', 'Designer', 'PM'];

const STATUS_TABS: Array<{ label: string; value: '전체' | AttendanceStatus }> = [
  { label: '전체', value: '전체' },
  { label: '출석 완료', value: 'ATTENDANCE' as AttendanceStatus },
  { label: '지각', value: 'LATE' as AttendanceStatus },
  { label: '결석', value: 'ABSENCE' as AttendanceStatus },
];

interface AttendanceTableViewProps {
  sessionId: string;
  initialRecords: AttendanceRecord[];
  initialTotalPages: number;
}

export default function AttendanceTableView({
  sessionId,
  initialRecords,
  initialTotalPages,
}: AttendanceTableViewProps) {
  const [records, setRecords] = useState(initialRecords);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState<'전체' | AttendanceStatus>('전체');
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [page, setPage] = useState(1);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchAttendances = async () => {
      const client = createBrowserClient();
      setIsLoading(true);
      try {
        const data = await client.request(SessionAttendancesDocument, {
          sessionId,
          page,
          size: PAGE_SIZE,
          attendanceStatus: selectedStatus === '전체' ? undefined : selectedStatus,
          part: selectedPart ?? undefined,
          nickname: appliedSearch || undefined,
        });
        setRecords(data.sessionAttendances.items as AttendanceRecord[]);
        setTotalPages(data.sessionAttendances.pageInfo.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendances();
  }, [sessionId, page, selectedStatus, selectedPart, appliedSearch]);

  const handleStatusChange = (status: '전체' | AttendanceStatus) => {
    setSelectedStatus(status);
    setPage(1);
  };

  const handlePartChange = (part: Part | null) => {
    setSelectedPart(part);
    setPage(1);
  };

  const handleSearch = () => {
    setAppliedSearch(search);
    setPage(1);
  };

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
          <SegmentTabs tabs={STATUS_TABS} value={selectedStatus} onChange={handleStatusChange} />
          <DropdownSelect
            options={PARTS}
            value={selectedPart}
            onChange={handlePartChange}
            placeholder="파트 선택"
          />
        </div>
        <div className="self-stretch w-px bg-grayscale-100" />
        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
          placeholder="챌린저 검색"
        />
      </div>
      <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
        <Table
          columns={columns}
          data={records}
          keyExtractor={(row) => row.nickname}
          emptyMessage="출석 데이터가 없습니다."
        />
      </div>
      <div className="flex justify-center">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
