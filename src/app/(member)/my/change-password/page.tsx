'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import TextField from '@/components/ui/TextField';
import Button from '@/components/ui/Button';
import { ChevronLeftIcon, InfoIcon } from '@/components/icons';
import { gql } from '@/gql';
import { createBrowserClient } from '@/lib/graphql/client';
import { PASSWORD_REGEX } from '@/lib/validation';

const ChangeMyPasswordMutation = gql(`
  mutation ChangeMyPassword($password: String!) {
    changeMyPassword(input: { password: $password }) {
      changed
    }
  }
`);

export default function ChangePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid =
    PASSWORD_REGEX.test(password) && password === passwordConfirm;

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createBrowserClient().request(ChangeMyPasswordMutation, {
        password,
      });
      toast.success('변경을 완료했어요.');
      router.push('/my');
    } catch {
      toast.error('변경을 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <header className="flex items-center justify-between h-[54px] bg-white shrink-0">
        <Link
          href="/my"
          className="flex items-center justify-center w-[65px] h-full pl-4 py-3"
          aria-label="뒤로가기"
        >
          <ChevronLeftIcon />
        </Link>
        <span className="text-base font-semibold text-grayscale-900">
          비밀번호 변경
        </span>
        <div className="w-[65px]" />
      </header>
      <div className="px-4 pt-[22px] flex-1">
        <h1 className="text-2xl font-bold leading-normal text-grayscale-900">
          변경할 비밀번호를 입력해주세요
        </h1>
        <div className="mt-9 flex flex-col gap-4">
          <div className="flex flex-col gap-6">
            <TextField
              label="새로운 비밀번호"
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="비밀번호 확인"
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="bg-grayscale-50 rounded-2xl p-3">
            <div className="flex flex-col gap-1">
              <div className="flex gap-1 items-center">
                <InfoIcon />
                <span className="text-sm font-semibold text-primary">
                  비밀번호 설정
                </span>
              </div>
              <p className="text-sm font-medium text-grayscale-700">
                비밀번호 | 영문 + 숫자 혼용 8자 이상 16자 이내
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Button
          type="button"
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit}
        >
          완료
        </Button>
      </div>
    </div>
  );
}
