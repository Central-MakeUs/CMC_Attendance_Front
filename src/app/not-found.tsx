import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-5xl font-bold text-primary">404</span>
        <h1 className="text-xl font-semibold text-grayscale-900">페이지를 찾을 수 없습니다.</h1>
        <p className="text-sm text-grayscale-500">요청하신 페이지가 존재하지 않습니다.</p>
      </div>
      <Link href="/" className="w-full max-w-mobile">
        <Button>홈으로 이동</Button>
      </Link>
    </main>
  );
}
