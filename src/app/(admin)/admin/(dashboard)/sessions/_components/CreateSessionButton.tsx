'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import SessionFormModal, { type SessionFormData } from './SessionFormModal';

export default function CreateSessionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (_data: SessionFormData) => {
    setIsOpen(false);
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
        />
      )}
    </>
  );
}
