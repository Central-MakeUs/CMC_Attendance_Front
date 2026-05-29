'use client';

import { useState, useEffect } from 'react';
import { gql } from '@/gql';
import Table, { Column } from '@/components/ui/Table';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';
import Select from '@/components/ui/Select';
import { ChevronDownFillIcon } from '@/components/icons';
import { createBrowserClient } from '@/lib/graphql/client';
import ConfirmModal from '@/components/ui/ConfirmModal';
import type { Role } from '@/gql/graphql';

const UsersDocument = gql(`
  query Users($name: String, $page: Int!, $size: Int!) {
    users(name: $name, page: $page, size: $size) {
      items {
        loginId
        name
        nickname
        role
        generation {
          number
        }
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

const GenerationsDocument = gql(`
  query GenerationsForUsers {
    generations {
      id
      number
    }
  }
`);

const UpdateUserRoleDocument = gql(`
  mutation UpdateUserRole($input: UpdateUserRoleInput!) {
    updateUserRole(input: $input) {
      loginId
      name
      nickname
      role
      generation {
        number
      }
    }
  }
`);

const UpdateUserGenerationDocument = gql(`
  mutation UpdateUserGeneration($input: UpdateUserGenerationInput!) {
    updateUserGeneration(input: $input) {
      loginId
      name
      nickname
      role
      generation {
        number
      }
    }
  }
`);

const DeleteUserDocument = gql(`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      deletedLoginId
      deleted
    }
  }
`);

interface UserRecord {
  loginId: string;
  name: string;
  nickname: string;
  role: Role;
  generationNumber: number | null;
}

const CHANGEABLE_ROLES = ['LEAD', 'CHALLENGER'] as const;
type ChangeableRole = (typeof CHANGEABLE_ROLES)[number];

const ROLE_LABELS: Record<ChangeableRole, string> = {
  LEAD: '리드',
  CHALLENGER: '챌린저',
};

const PAGE_SIZE = 15;

const ROLE_BADGE_STYLES: Record<ChangeableRole, string> = {
  LEAD: 'bg-primary-light text-primary',
  CHALLENGER: 'bg-grayscale-50 text-grayscale-700',
};

function RoleBadge({ role }: { role: ChangeableRole }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${ROLE_BADGE_STYLES[role]}`}
    >
      {ROLE_LABELS[role]}
    </span>
  );
}

function RoleSelect({
  value,
  onChange,
}: {
  value: ChangeableRole;
  onChange: (role: ChangeableRole) => void;
}) {
  return (
    <Select value={value} onChange={(v) => v && onChange(v as ChangeableRole)}>
      <Select.Trigger className="flex items-center justify-between w-[124px] cursor-pointer">
        <RoleBadge role={value} />
        <Select.Chevron>
          <ChevronDownFillIcon />
        </Select.Chevron>
      </Select.Trigger>
      <Select.Content className="mt-1 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] overflow-hidden min-w-max">
        {CHANGEABLE_ROLES.map((role) => (
          <Select.Item
            key={role}
            value={role}
            className={(isSelected) =>
              `w-full px-4 py-2.5 text-left text-sm hover:bg-grayscale-50 transition-colors ${
                isSelected ? 'font-semibold text-primary' : 'text-grayscale-700'
              }`
            }
          >
            <RoleBadge role={role} />
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
}

function GenerationSelect({
  value,
  generationNumbers,
  onChange,
}: {
  value: number | null;
  generationNumbers: number[];
  onChange: (num: number) => void;
}) {
  const strValue = value != null ? String(value) : null;

  return (
    <Select value={strValue} onChange={(v) => v && onChange(Number(v))}>
      <Select.Trigger className="flex items-center justify-between gap-4 cursor-pointer">
        <span className="text-sm text-grayscale-700 font-medium whitespace-nowrap">
          {value != null ? `${value}기` : '-'}
        </span>
        <Select.Chevron>
          <ChevronDownFillIcon />
        </Select.Chevron>
      </Select.Trigger>
      <Select.Content className="mt-1 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] overflow-hidden min-w-max">
        {generationNumbers.map((num) => (
          <Select.Item
            key={num}
            value={String(num)}
            className={(isSelected) =>
              `w-full px-4 py-2.5 text-left text-sm hover:bg-grayscale-50 transition-colors ${
                isSelected ? 'font-semibold text-primary' : 'text-grayscale-700'
              }`
            }
          >
            {num}기
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

export default function UsersTableView() {
  const [records, setRecords] = useState<UserRecord[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generationNumbers, setGenerationNumbers] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<UserRecord | null>(null);

  useEffect(() => {
    const client = createBrowserClient();
    client.request(GenerationsDocument).then((data) => {
      setGenerationNumbers(
        [...data.generations]
          .sort((a, b) => a.number - b.number)
          .map((g) => g.number)
      );
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const client = createBrowserClient();
      setIsLoading(true);
      try {
        const data = await client.request(UsersDocument, {
          name: appliedSearch || undefined,
          page,
          size: PAGE_SIZE,
        });

        setRecords(
          data.users.items.map((item) => ({
            loginId: item.loginId,
            name: item.name,
            nickname: item.nickname,
            role: item.role,
            generationNumber: item.generation?.number ?? null,
          }))
        );
        setTotalPages(data.users.pageInfo.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [appliedSearch, page]);

  const handleSearch = () => {
    setAppliedSearch(search);
    setPage(1);
  };

  const handleRoleChange = async (loginId: string, role: ChangeableRole) => {
    const prevRecords = records;
    setRecords((prev) =>
      prev.map((r) => (r.loginId === loginId ? { ...r, role } : r))
    );
    try {
      const client = createBrowserClient();
      const data = await client.request(UpdateUserRoleDocument, {
        input: { loginId, role },
      });
      const updated = data.updateUserRole;
      setRecords((prev) =>
        prev.map((r) =>
          r.loginId === loginId
            ? {
                ...r,
                role: updated.role,
                generationNumber: updated.generation?.number ?? null,
              }
            : r
        )
      );
    } catch (error) {
      console.error(error);
      setRecords(prevRecords);
    }
  };

  const handleGenerationChange = async (
    loginId: string,
    generationNumber: number
  ) => {
    const prevRecords = records;
    setRecords((prev) =>
      prev.map((r) => (r.loginId === loginId ? { ...r, generationNumber } : r))
    );
    try {
      const client = createBrowserClient();
      const data = await client.request(UpdateUserGenerationDocument, {
        input: { loginId, generationNumber },
      });
      const updated = data.updateUserGeneration;
      setRecords((prev) =>
        prev.map((r) =>
          r.loginId === loginId
            ? { ...r, generationNumber: updated.generation?.number ?? null }
            : r
        )
      );
    } catch (error) {
      console.error(error);
      setRecords(prevRecords);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    const prevRecords = records;

    setRecords((prev) => prev.filter((r) => r.loginId !== target.loginId));
    setDeleteTarget(null);

    try {
      const client = createBrowserClient();
      await client.request(DeleteUserDocument, {
        input: { loginId: target.loginId },
      });
    } catch (error) {
      console.error(error);
      setRecords(prevRecords);
    }
  };

  const columns: Column<UserRecord>[] = [
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
      key: 'role',
      label: '회원 권한',
      className: 'w-[240px] min-w-[240px]',
      render: (row) => (
        <RoleSelect
          value={row.role as ChangeableRole}
          onChange={(role) => handleRoleChange(row.loginId, role)}
        />
      ),
    },
    {
      key: 'generationNumber',
      label: '기수',
      className: 'w-[240px] min-w-[240px]',
      render: (row) => (
        <div className="flex items-center justify-between">
          <GenerationSelect
            value={row.generationNumber}
            generationNumbers={generationNumbers}
            onChange={(num) => handleGenerationChange(row.loginId, num)}
          />
          <button
            type="button"
            onClick={() => setDeleteTarget(row)}
            className="flex items-center justify-center p-[5px] bg-grayscale-50 rounded-lg text-grayscale-500 hover:bg-grayscale-100 hover:text-grayscale-700 transition-colors shrink-0"
          >
            <TrashIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
          placeholder="검색"
        />
        <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
          <Table
            columns={columns}
            data={records}
            keyExtractor={(row) => row.loginId}
            emptyMessage="유저 데이터가 없습니다."
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

      {deleteTarget && (
        <ConfirmModal
          message="해당 유저를 삭제할까요?"
          confirmLabel="삭제"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
