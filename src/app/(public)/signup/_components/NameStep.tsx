'use client';

import { useState } from 'react';
import FunnelHeader from './FunnelHeader';
import TextField from '@/components/ui/TextField';
import Button from '@/components/ui/Button';

interface NameStepProps {
  defaultValues: { name: string; nickname: string };
  onNext: (data: { name: string; nickname: string }) => void;
  onBack: () => void;
}

export default function NameStep({ defaultValues, onNext, onBack }: NameStepProps) {
  const [name, setName] = useState(defaultValues.name);
  const [nickname, setNickname] = useState(defaultValues.nickname);

  const isValid = name.trim().length > 0 && nickname.trim().length > 0;

  const handleNext = () => {
    if (!isValid) return;
    onNext({ name: name.trim(), nickname: nickname.trim() });
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <FunnelHeader step={1} onBack={onBack} />
      <div className="px-4 pt-[22px] flex-1">
        <h1 className="text-2xl font-bold leading-normal text-grayscale-900">
          이름과 닉네임을 알려주세요
        </h1>
        <div className="mt-9 flex flex-col gap-6">
          <TextField
            label="이름"
            id="name"
            name="name"
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="닉네임"
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
      </div>
      <div className="p-4">
        <Button type="button" disabled={!isValid} onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  );
}
