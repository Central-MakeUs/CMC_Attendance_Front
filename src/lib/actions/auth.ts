'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { gql } from '@/gql';
import { gqlClient, ClientError } from '@/lib/gql-client';
import type { Part } from '@/gql/graphql';

const SignUpMutationDoc = gql(`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      userId
      loginId
      name
      nickname
      part
      role
    }
  }
`);

const LoginMutation = gql(`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      accessTokenExpiresAt
      refreshTokenExpiresAt
      role
    }
  }
`);

export type LoginState = { error?: string } | undefined;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const loginId = formData.get('loginId') as string;
  const password = formData.get('password') as string;

  if (!loginId || !password) {
    return { error: '아이디와 비밀번호를 입력해주세요.' };
  }

  try {
    const { login } = await gqlClient.request(LoginMutation, {
      input: { loginId, password },
    });

    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === 'production';

    cookieStore.set('access_token', login.accessToken, {
      secure: isProduction,
      expires: new Date(login.accessTokenExpiresAt),
      sameSite: 'lax',
      path: '/',
    });

    cookieStore.set('refresh_token', login.refreshToken, {
      secure: isProduction,
      expires: new Date(login.refreshTokenExpiresAt),
      sameSite: 'lax',
      path: '/',
    });
  } catch (e) {
    if (e instanceof ClientError) {
      return { error: e.message };
    }
    console.error('[loginAction]', e);
    return { error: '로그인 중 오류가 발생했습니다.' };
  }

  redirect('/');
}

export type SignupState = { error?: string } | undefined;

export async function signupAction(input: {
  name: string;
  nickname: string;
  part: Part;
  loginId: string;
  password: string;
  invitationCode: string;
}): Promise<SignupState> {
  try {
    await gqlClient.request(SignUpMutationDoc, {
      input: {
        name: input.name,
        nickname: input.nickname,
        part: input.part,
        loginId: input.loginId,
        password: input.password,
        invitationCode: input.invitationCode,
      },
    });
    return {};
  } catch (e) {
    if (e instanceof ClientError) {
      return { error: e.message };
    }
    console.error('[signupAction]', e);
    return { error: '회원가입 중 오류가 발생했습니다.' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  redirect('/login');
}
