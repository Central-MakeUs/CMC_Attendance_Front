import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/dal';
import LoginForm from './_components/LoginForm';

export default async function LoginPage() {
  const session = await verifySession();
  if (session) {
    redirect(
      session.role === 'ROOT' || session.role === 'LEAD' ? '/admin' : '/'
    );
  }

  return (
    <main>
      <h1>로그인</h1>
      <LoginForm />
    </main>
  );
}
