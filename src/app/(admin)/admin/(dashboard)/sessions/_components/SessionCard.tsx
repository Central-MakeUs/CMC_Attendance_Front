'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { gql } from '@/gql';
import { createBrowserClient } from '@/lib/graphql/client';
import { formatSessionTime } from '../utils';
import { ChevronRightIcon, MoreVerticalIcon } from '@/components/icons';
import SessionFormModal, { type SessionFormData } from './SessionFormModal';
import ConfirmModal from '@/components/ui/ConfirmModal';
import type { SessionsQuery } from '@/gql/graphql';

const UpdateSessionMutation = gql(`
  mutation UpdateSession($input: UpdateSessionInput!) {
    updateSession(input: $input) {
      id
    }
  }
`);

const DeleteSessionMutation = gql(`
  mutation DeleteSession($input: DeleteSessionInput!) {
    deleteSession(input: $input) {
      deletedSessionId
    }
  }
`);

type Session = SessionsQuery['sessions'][number];

interface Props {
  session: Session;
  generationNumber: string;
}

export default function SessionCard({ session, generationNumber }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleEditClick = () => {
    setIsMenuOpen(false);
    setIsEditModalOpen(true);
  };

  const handleSubmit = async (data: SessionFormData) => {
    setIsLoading(true);
    try {
      const client = createBrowserClient();
      await client.request(UpdateSessionMutation, {
        input: {
          sessionId: session.id,
          sessionName: data.sessionName,
          description: data.description || null,
          placeName: data.placeName,
          placeDetail: data.placeDetail,
          latitude: data.latitude,
          longitude: data.longitude,
          sessionDate: `${data.year}-${data.month}-${data.day}`,
          startTime: data.startTime,
          endTime: data.endTime,
        },
      });
      setIsEditModalOpen(false);
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleteModalOpen(false);
    const client = createBrowserClient();
    await client.request(DeleteSessionMutation, { input: { sessionId: session.id } });
    router.refresh();
  };

  return (
    <>
      <div className="bg-grayscale-50 flex flex-col gap-3 p-4 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[18px] leading-normal text-grayscale-900 whitespace-nowrap">
              {session.sessionName}
            </span>
            <Link
              href={`/admin/sessions/${session.id}?generationNumber=${generationNumber}`}
              className="flex items-center text-[14px] font-semibold leading-normal text-[#737692] whitespace-nowrap"
            >
              출석 현황 보기
              <ChevronRightIcon />
            </Link>
          </div>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-0.5 rounded-lg hover:bg-grayscale-100 transition-colors"
            >
              <MoreVerticalIcon />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-[140px] bg-white rounded-2xl shadow-[0px_1px_4px_0px_rgba(0,0,0,0.03),0px_4px_12px_0px_rgba(0,0,0,0.16)] overflow-hidden z-10">
                <button
                  className="w-full text-left px-4 py-3 text-[14px] font-medium text-grayscale-500 hover:bg-grayscale-50 transition-colors"
                  onClick={handleEditClick}
                >
                  수정
                </button>
                <button
                  className="w-full text-left px-4 py-3 text-[14px] font-medium text-red-400 hover:bg-grayscale-50 transition-colors"
                  onClick={handleDeleteClick}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white flex flex-col gap-3 p-3 rounded-xl">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-grayscale-50 px-2 py-1 rounded-full font-semibold text-[12px] leading-normal text-grayscale-700 whitespace-nowrap">
                시간
              </span>
              <span className="font-medium text-[16px] leading-normal text-grayscale-700 whitespace-nowrap">
                {formatSessionTime(session.sessionDate, session.startTime, session.endTime)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-grayscale-50 px-2 py-1 rounded-full font-semibold text-[12px] leading-normal text-grayscale-700 whitespace-nowrap">
                장소
              </span>
              <span className="font-medium text-[16px] leading-normal text-grayscale-700 whitespace-nowrap">
                {session.placeName}
              </span>
            </div>
          </div>
          <hr className="border-t border-grayscale-100" />
          <p className="font-medium text-[14px] leading-normal text-grayscale-700">
            {session.description}
          </p>
        </div>
      </div>

      {isEditModalOpen && (
        <SessionFormModal
          mode="edit"
          session={session}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmModal
          message="세션을 삭제할까요?"
          confirmLabel="삭제"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
}
