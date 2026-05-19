import Image from 'next/image';
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
    <main className="min-h-dvh px-4 pt-[86px]">
      <div className="flex flex-col gap-5 mb-9">
        <Image src="/cmc-logo.svg" alt="CMC 로고" width={56} height={56} />
        <h1 className="text-2xl font-bold leading-normal text-grayscale-900 whitespace-pre-wrap">
          {'CMC 출석 체크를 \n위해 로그인이 필요해요'}
        </h1>
      </div>
      <LoginForm />
    </main>
  );
}
