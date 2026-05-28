'use client';

import { useState, useEffect, useRef } from 'react';
import { gql } from '@/gql';
import Table, { Column } from '@/components/ui/Table';
import DropdownSelect from '@/components/ui/DropdownSelect';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';
import NoteCell from '@/components/NoteCell';
import { Part } from '@/gql/graphql';
import { createBrowserClient } from '@/lib/graphql/client';

const UpdateChallengerRemarkDocument = gql(`
  mutation UpdateChallengerRemark($input: UpdateChallengerRemarkInput!) {
    updateChallengerRemark(input: $input) {
      loginId
      name
      nickname
      remark
      updatedAt
      updatedBy
    }
  }
`);

const ChallengersDocument = gql(`
  query Challengers(
    $generationNumber: Int!
    $part: String
    $name: String
    $page: Int!
    $size: Int!
  ) {
    challengers(
      generationNumber: $generationNumber
      part: $part
      name: $name
      page: $page
      size: $size
    ) {
      items {
        loginId
        name
        nickname
        part
        team
        attendanceScore
        remark
      }
      pageInfo {
        page
        size
        totalElements
        totalPages
        hasNext
        hasPrevious
      }
    }
  }
`);

export interface ChallengerRecord {
  loginId: string;
  name: string;
  nickname: string;
  part: Part;
  team: string | null;
  attendanceScore: number;
  note: string | null;
}

const PARTS: Part[] = [
  'iOS',
  'Android',
  'Web',
  'Server',
  'Flutter',
  'Designer',
  'PM',
];

const PAGE_SIZE = 10;

function formatScore(score: number): string {
  if (score > 0) return `+ ${score}`;
  if (score < 0) return `- ${Math.abs(score)}`;
  return '0';
}

interface Props {
  generationNumber: number;
}

export default function ChallengersTableView({ generationNumber }: Props) {
  const [records, setRecords] = useState<ChallengerRecord[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [page, setPage] = useState(1);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    const fetchChallengers = async () => {
      const client = createBrowserClient();
      setIsLoading(true);
      try {
        const data = await client.request(ChallengersDocument, {
          generationNumber,
          part: selectedPart ?? undefined,
          name: appliedSearch || undefined,
          page,
          size: PAGE_SIZE,
        });

        const items = data.challengers.items.map((item) => ({
          loginId: item.loginId,
          name: item.name,
          nickname: item.nickname,
          part: item.part,
          team: item.team,
          attendanceScore: item.attendanceScore,
          note: item.remark,
        }));
        setRecords(items);
        setTotalPages(data.challengers.pageInfo.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallengers();
  }, [generationNumber, page, selectedPart, appliedSearch]);

  const handlePartChange = (part: Part | null) => {
    setSelectedPart(part);
    setPage(1);
  };

  const handleSearch = () => {
    setAppliedSearch(search);
    setPage(1);
  };

  const handleNoteChange = async (loginId: string, note: string | null) => {
    const prevRecords = records;
    setRecords((prev) =>
      prev.map((r) => (r.loginId === loginId ? { ...r, note } : r))
    );
    try {
      const client = createBrowserClient();
      await client.request(UpdateChallengerRemarkDocument, {
        input: { loginId, remark: note },
      });
    } catch (error) {
      console.error(error);
      setRecords(prevRecords);
    }
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
      label: '파트',
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
