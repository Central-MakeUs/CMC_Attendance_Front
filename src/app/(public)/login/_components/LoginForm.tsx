'use client';

import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { loginAction } from '@/lib/actions/auth';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';

export default function LoginForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <div className="flex flex-col gap-7">
      <form action={action} className="flex flex-col gap-4">
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
        {state?.error && (
          <p className="text-sm text-red-500">{state.error}</p>
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
