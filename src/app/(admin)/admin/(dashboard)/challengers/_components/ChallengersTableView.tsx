'use client';

import { useState } from 'react';
import Table, { Column } from '@/components/ui/Table';
import DropdownSelect from '@/components/ui/DropdownSelect';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';
import NoteCell from '@/components/NoteCell';
import { Part } from '@/gql/graphql';

export interface ChallengerRecord {
  loginId: string;
  name: string;
  nickname: string;
  part: Part;
  team: string | null;
  attendanceScore: number;
  note: string | null;
}

const PARTS: Part[] = ['iOS', 'Android', 'Web', 'Server', 'Flutter', 'Designer', 'PM'];

function formatScore(score: number): string {
  if (score > 0) return `+ ${score}`;
  if (score < 0) return `- ${Math.abs(score)}`;
  return '0';
}

interface Props {
  initialRecords: ChallengerRecord[];
  initialTotalPages: number;
}

export default function ChallengersTableView({ initialRecords, initialTotalPages }: Props) {
  const [records, setRecords] = useState(initialRecords);
  const [totalPages] = useState(initialTotalPages);
  const [isLoading] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const handlePartChange = (part: Part | null) => {
    setSelectedPart(part);
    setPage(1);
  };

  const handleSearch = () => {
    setPage(1);
  };

  const handleNoteChange = async (loginId: string, note: string | null) => {
    setRecords((prev) =>
      prev.map((r) => (r.loginId === loginId ? { ...r, note } : r))
    );
  };

  const columns: Column<ChallengerRecord>[] = [
    {
      key: 'name',
      label: '이름',
      className: 'w-40 min-w-[160px]',
    },
    {
      key: 'nickname',
      label: '닉네임',
      className: 'w-40 min-w-[160px]',
    },
    {
      key: 'part',
      label: '피트',
      className: 'w-40 min-w-[160px]',
    },
    {
      key: 'team',
      label: '소속팀',
      className: 'w-40 min-w-[160px]',
      render: (row) => row.team ?? '-',
    },
    {
      key: 'attendanceScore',
      label: '출석 점수',
      className: 'w-[200px] min-w-[200px]',
      render: (row) => formatScore(row.attendanceScore),
    },
    {
      key: 'note',
      label: '특이사항',
      render: (row) => (
        <NoteCell
          value={row.note}
          onSave={(note) => handleNoteChange(row.loginId, note)}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <DropdownSelect
          options={PARTS}
          value={selectedPart}
          onChange={handlePartChange}
          placeholder="파트 선택"
        />
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
          keyExtractor={(row) => row.loginId}
          emptyMessage="챌린저 데이터가 없습니다."
        />
      </div>
      <div className="flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
