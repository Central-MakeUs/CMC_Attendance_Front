'use client';

import { useState } from 'react';
import FunnelHeader from './FunnelHeader';
import TextField from '@/components/ui/TextField';
import Button from '@/components/ui/Button';
import { InfoIcon } from '@/components/icons';
import { gql } from '@/gql';
import { createBrowserClient } from '@/lib/graphql/client';
import { toast } from 'sonner';

const CREDENTIALS_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$/;

const LoginIdAvailabilityDoc = gql(`
  query LoginIdAvailability($loginId: String!) {
    loginIdAvailability(loginId: $loginId) {
      loginId
      available
    }
  }
`);

interface CredentialsStepProps {
  defaultValues: { loginId: string; password: string };
  onNext: (data: { loginId: string; password: string }) => void;
  onBack: () => void;
}

export default function CredentialsStep({ defaultValues, onNext, onBack }: CredentialsStepProps) {
  const [loginId, setLoginId] = useState(defaultValues.loginId);
  const [password, setPassword] = useState(defaultValues.password);
  const [loginIdError, setLoginIdError] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const isValid = CREDENTIALS_REGEX.test(loginId) && CREDENTIALS_REGEX.test(password);

  const handleNext = async () => {
    setIsChecking(true);
    try {
      const result = await createBrowserClient().request(LoginIdAvailabilityDoc, { loginId });
      if (!result.loginIdAvailability.available) {
        toast.error('이미 사용 중인 아이디입니다.');
        setLoginIdError(true);
        return;
      }
      onNext({ loginId, password });
    } catch {
      toast.error('아이디 중복 확인 중 오류가 발생했습니다.');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <FunnelHeader step={3} onBack={onBack} />
      <div className="px-4 pt-[22px] flex-1">
        <h1 className="text-2xl font-bold leading-normal text-grayscale-900 whitespace-pre-wrap">
          {'아이디 & 비밀번호를 \n입력해주세요'}
        </h1>
        <div className="mt-9 flex flex-col gap-4">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 w-full">
              <TextField.Label htmlFor="loginId">아이디</TextField.Label>
              <TextField.Input
                id="loginId"
                name="loginId"
                type="text"
                placeholder="아이디"
                value={loginId}
                onChange={(e) => {
                  setLoginId(e.target.value);
                  setLoginIdError(false);
                }}
                error={loginIdError}
              />
            </div>
            <TextField
              label="비밀번호"
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="bg-grayscale-50 rounded-2xl p-3">
            <div className="flex flex-col gap-1">
              <div className="flex gap-1 items-center">
                <InfoIcon />
                <span className="text-sm font-semibold text-primary">아이디 / 비밀번호 설정</span>
              </div>
              <p className="text-sm font-medium text-grayscale-700">아이디 | 영문 + 숫자 조합, 8자 이상 16자 이내</p>
              <p className="text-sm font-medium text-grayscale-700">비밀번호 | 영문 + 숫자 혼용 8자 이상 16자 이내</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Button type="button" disabled={!isValid || isChecking} onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  );
}
