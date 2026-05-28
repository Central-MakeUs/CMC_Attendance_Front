'use client';

import { useState } from 'react';
import type { Part } from '@/gql/graphql';
import FunnelHeader from './FunnelHeader';
import Button from '@/components/ui/Button';
import SelectField from '@/components/ui/SelectField';

interface PartStepProps {
  parts: Part[];
  defaultValue: Part | '';
  onNext: (part: Part) => void;
  onBack: () => void;
}

export default function PartStep({ parts, defaultValue, onNext, onBack }: PartStepProps) {
  const [part, setPart] = useState<Part | ''>(defaultValue);

  const isValid = part !== '';

  const handleNext = () => {
    if (!isValid) return;
    onNext(part as Part);
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <FunnelHeader step={2} onBack={onBack} />
      <div className="px-4 pt-[22px] flex-1">
        <h1 className="text-2xl font-bold leading-normal text-grayscale-900">
          파트를 알려주세요
        </h1>
        <div className="mt-9">
          <SelectField
            label="파트명"
            options={parts}
            value={part}
            placeholder="파트 선택"
            onChange={(v) => setPart(v as Part)}
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
