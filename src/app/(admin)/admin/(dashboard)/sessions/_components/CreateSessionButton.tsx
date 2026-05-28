'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { gql } from '@/gql';
import { createBrowserClient } from '@/lib/graphql/client';
import Button from '@/components/ui/Button';
import SessionFormModal, { type SessionFormData } from './SessionFormModal';

const CreateSessionMutation = gql(`
  mutation CreateSession($input: CreateSessionInput!) {
    createSession(input: $input) {
      id
    }
  }
`);

export default function CreateSessionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (data: SessionFormData) => {
    const generationNumber = searchParams.get('generationNumber');
    if (!generationNumber) return;

    setIsLoading(true);
    try {
      const client = createBrowserClient();
      await client.request(CreateSessionMutation, {
        input: {
          generationNumber: Number(generationNumber),
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
      setIsOpen(false);
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button className="w-auto! px-6 h-12 rounded-2xl text-lg" onClick={() => setIsOpen(true)}>
        세션 생성
      </Button>
      {isOpen && (
        <SessionFormModal
          mode="create"
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
