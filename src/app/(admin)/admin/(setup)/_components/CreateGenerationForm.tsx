'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { gql } from '@/gql';
import { createBrowserClient } from '@/lib/graphql/client';
import TextField from '@/components/ui/TextField';
import Button from '@/components/ui/Button';
import CreateGenerationModal from './CreateGenerationModal';
import { useCreateGenerationForm } from '../_hooks/useCreateGenerationForm';

const CreateGenerationMutation = gql(`
  mutation CreateGeneration($input: CreateGenerationInput!) {
    createGeneration(input: $input) {
      id
      number
    }
  }
`);

interface Props {
  onBackToSelect: () => void;
}

export default function CreateGenerationForm({ onBackToSelect }: Props) {
  const {
    form,
    dateErrors,
    isFormValid,
    handleChange,
    validateDateField,
    clearDateError,
  } = useCreateGenerationForm();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await createBrowserClient().request(CreateGenerationMutation, {
        input: {
          number: parseInt(form.generationName),
          invitationCode: form.inviteCode,
          startDate: form.startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
          endDate: form.endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
        },
      });
      router.refresh();
      setShowModal(true);
    } catch {
      toast.error('기수 생성에 실패했어요. 다시 시도해 주세요.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <main
        className="min-h-dvh flex items-center justify-center px-4"
        style={{
          background:
            'linear-gradient(190.99deg, #ffffff 46.238%, #c1caff 119.75%)',
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-12 items-center w-[358px]"
        >
          <div className="flex flex-col gap-5 items-center">
            <Image src="/cmc-logo.svg" alt="CMC 로고" width={56} height={56} />
            <h1 className="text-2xl font-bold leading-normal text-grayscale-900 text-center whitespace-pre-wrap">
              {'CMC 활동 기수\n정보를 입력해 주세요.'}
            </h1>
          </div>

          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-1 w-full">
              <TextField.Label>기수명</TextField.Label>
              <TextField.Input
                value={form.generationName}
                onChange={(e) => handleChange('generationName', e.target.value)}
                placeholder="ex) 19"
                inputMode="numeric"
                suffix="기"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <TextField.Label>기간</TextField.Label>
              <div className="flex items-center gap-3">
                <TextField.Input
                  value={form.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  onFocus={() => clearDateError('startDate')}
                  onBlur={() => {
                    if (!form.startDate) return;
                    const error = validateDateField('startDate', form.startDate);
                    if (error) toast.warning(error);
                  }}
                  placeholder="ex) 20260511"
                  inputMode="numeric"
                  error={!!dateErrors.startDate}
                  className="flex-1 min-w-0"
                />
                <span className="text-grayscale-300 shrink-0 text-sm font-medium">
                  —
                </span>
                <TextField.Input
                  value={form.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  onFocus={() => clearDateError('endDate')}
                  onBlur={() => {
                    if (!form.endDate) return;
                    const error = validateDateField('endDate', form.endDate);
                    if (error) toast.warning(error);
                  }}
                  placeholder="ex) 20260529"
                  inputMode="numeric"
                  error={!!dateErrors.endDate}
                  className="flex-1 min-w-0"
                />
              </div>
            </div>

            <TextField
              label="초대코드"
              value={form.inviteCode}
              onChange={(e) => handleChange('inviteCode', e.target.value)}
              placeholder="ex) 2026lovecmc"
            />
          </div>

          <Button type="submit" disabled={!isFormValid || isPending}>
            완료
          </Button>
        </form>
      </main>

      {showModal && (
        <CreateGenerationModal onClose={() => setShowModal(false)} onBackToSelect={onBackToSelect} />
      )}
    </>
  );
}
