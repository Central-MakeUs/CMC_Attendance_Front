'use client';

import { useActionState } from 'react';
import { loginAction } from '@/lib/actions/auth';

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor="loginId">아이디</label>
        <input id="loginId" name="loginId" type="text" required />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input id="password" name="password" type="password" required />
      </div>
      {state?.error && <p>{state.error}</p>}
      <button type="submit" disabled={pending}>
        {pending ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
}
