'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { gql } from '@/gql';
import { createBrowserClient } from '@/lib/graphql/client';
import { ClientError } from '@/lib/graphql/core';
import { setAuthTokens } from '@/lib/cookies/client';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';

const LoginMutation = gql(`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      accessTokenExpiresAt
      refreshTokenExpiresAt
      role
      generation {
        number
      }
    }
  }
`);

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginId = formData.get('loginId') as string;
    const password = formData.get('password') as string;

    if (!loginId || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setPending(true);
    try {
      const { login } = await createBrowserClient().request(LoginMutation, {
        input: { loginId, password },
      });
      setAuthTokens(login);
      router.push('/');
    } catch (e) {
      if (e instanceof ClientError) setError(e.message);
      else setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="아이디"
          id="loginId"
          name="loginId"
          type="text"
          placeholder="아이디"
          required
        />
        <TextField
          label="비밀번호"
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          required
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <Button type="submit" disabled={pending}>
          {pending ? '로그인 중...' : '로그인'}
        </Button>
      </form>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <hr className="flex-1 border-grayscale-100" />
          <span className="text-xs font-medium text-grayscale-300 whitespace-nowrap">
            아직 회원이 아니신가요?
          </span>
          <hr className="flex-1 border-grayscale-100" />
        </div>
        <Button
          variant="secondary"
          type="button"
          onClick={() => router.push('/signup')}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
