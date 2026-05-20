'use client';

import { useState } from 'react';
import Image from 'next/image';
import SelectField from '@/components/ui/SelectField';
import Button from '@/components/ui/Button';
import type { GenerationsQuery } from '@/gql/graphql';
import CreateGenerationForm from './CreateGenerationForm';

interface Props {
  generations: GenerationsQuery['generations'][number][];
}

export default function SetupView({ generations }: Props) {
  const [view, setView] = useState<'select' | 'create'>('select');
  const [selectedGeneration, setSelectedGeneration] = useState('');

  const options = generations.map((g) => String(g.number));

  if (view === 'create') {
    return <CreateGenerationForm onBackToSelect={() => setView('select')} />;
  }

  return (
    <main
      className="min-h-dvh flex items-center justify-center px-4"
      style={{
        background:
          'linear-gradient(190.99deg, #ffffff 46.238%, #c1caff 119.75%)',
      }}
    >
      <div className="flex flex-col gap-12 items-center w-[358px]">
        <div className="flex flex-col gap-5 items-center">
          <Image src="/cmc-logo.svg" alt="CMC 로고" width={56} height={56} />
          <h1 className="text-2xl font-bold leading-normal text-grayscale-900 text-center whitespace-pre-wrap">
            {'안녕하세요!\nCMC 활동 기수를 선택해주세요'}
          </h1>
        </div>

        <SelectField
          label="활동 기수"
          options={options}
          value={selectedGeneration}
          placeholder="활동 기수 선택"
          onChange={setSelectedGeneration}
        />

        <div className="flex flex-col gap-3 w-full">
          <Button type="button" disabled={!selectedGeneration}>
            선택 완료
          </Button>
          <button
            type="button"
            onClick={() => setView('create')}
            className="flex items-center justify-center w-full px-3 py-4 rounded-2xl bg-[#c1caff] text-primary font-semibold text-lg leading-[1.4] transition-colors cursor-pointer"
          >
            새로운 기수 생성
          </button>
        </div>
      </div>
    </main>
  );
}
