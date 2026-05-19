'use client';

import { useState } from 'react';
import FunnelHeader from './FunnelHeader';
import TextField from '@/components/ui/TextField';
import Button from '@/components/ui/Button';

interface InviteCodeStepProps {
  defaultValue: string;
  onSubmit: (invitationCode: string) => Promise<string | undefined>;
  onBack: () => void;
}

export default function InviteCodeStep({ defaultValue, onSubmit, onBack }: InviteCodeStepProps) {
  const [invitationCode, setInviteCode] = useState(defaultValue);
  const [error, setError] = useState<string | undefined>();
  const [pending, setPending] = useState(false);

  const isValid = invitationCode.trim().length > 0;

  const handleNext = async () => {
    if (!isValid || pending) return;
    setPending(true);
    const err = await onSubmit(invitationCode.trim());
    if (err) {
      setError(err);
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <FunnelHeader step={4} onBack={onBack} />
      <div className="px-4 pt-[22px] flex-1">
        <h1 className="text-2xl font-bold leading-normal text-grayscale-900">
          초대코드를 입력해주세요
        </h1>
        <div className="mt-9">
          <TextField
            label="초대코드"
            id="invitationCode"
            name="invitationCode"
            type="text"
            placeholder="초대코드"
            value={invitationCode}
            onChange={(e) => {
              setInviteCode(e.target.value);
              setError(undefined);
            }}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      </div>
      <div className="p-4">
        <Button type="button" disabled={!isValid || pending} onClick={handleNext}>
          {pending ? '가입 중...' : '다음'}
        </Button>
      </div>
    </div>
  );
}
