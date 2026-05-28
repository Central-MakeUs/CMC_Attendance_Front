'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { gql } from '@/gql';
import { createBrowserClient } from '@/lib/graphql/client';
import SessionFormModal, {
  type SessionFormData,
} from '../../_components/SessionFormModal';
import ConfirmModal from '@/components/ui/ConfirmModal';
import type { SessionsForDetailQuery } from '@/gql/graphql';

const UpdateSessionMutation = gql(`
  mutation UpdateSessionFromDetail($input: UpdateSessionInput!) {
    updateSession(input: $input) {
      id
    }
  }
`);

const DeleteSessionMutation = gql(`
  mutation DeleteSessionFromDetail($input: DeleteSessionInput!) {
    deleteSession(input: $input) {
      deletedSessionId
    }
  }
`);

type Session = SessionsForDetailQuery['sessions'][number];

interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

function ActionButton({ children, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center justify-center px-6 py-3 rounded-2xl bg-grayscale-50 text-lg font-semibold leading-[1.4] text-grayscale-700 hover:bg-grayscale-100 transition-colors"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

interface Props {
  session: Session;
  generationNumber: string;
}

export default function SessionActionButtons({
  session,
  generationNumber,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: SessionFormData) => {
    setIsLoading(true);
    try {
      const client = createBrowserClient();
      await client.request(UpdateSessionMutation, {
        input: {
          sessionId: session.id,
          sessionName: data.sessionName,
          description: data.description || null,
          targetParts: data.targetParts,
          placeName: data.placeName,
          placeDetail: data.placeDetail,
          latitude: data.latitude,
          longitude: data.longitude,
          sessionDate: `${data.year}-${data.month.padStart(2, '0')}-${data.day.padStart(2, '0')}`,
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

  const handleDeleteConfirm = async () => {
    setIsDeleteModalOpen(false);
    const client = createBrowserClient();
    await client.request(DeleteSessionMutation, {
      input: { sessionId: session.id },
    });
    router.push(`/admin?generationNumber=${generationNumber}`);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <ActionButton onClick={() => setIsEditModalOpen(true)}>
          수정
        </ActionButton>
        <ActionButton onClick={() => setIsDeleteModalOpen(true)}>
          삭제
        </ActionButton>
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
          message="해당 세션을 삭제할까요?"
          confirmLabel="삭제"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
}
