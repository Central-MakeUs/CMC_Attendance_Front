import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-5xl font-bold text-primary">401</span>
        <h1 className="text-xl font-semibold text-grayscale-900">로그인이 필요합니다.</h1>
        <p className="text-sm text-grayscale-500">이 페이지에 접근하려면 로그인해주세요.</p>
      </div>
      <Link href="/" className="w-full max-w-mobile">
        <Button>홈으로 이동</Button>
      </Link>
    </main>
  );
}
