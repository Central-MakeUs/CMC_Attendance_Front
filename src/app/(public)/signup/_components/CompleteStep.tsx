'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function CompleteStep() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-dvh">
      <div className="flex-1 flex flex-col items-center justify-center gap-10 px-4">
        <h1 className="text-2xl font-bold leading-normal text-grayscale-900 text-center whitespace-pre-wrap">
          {'가입을 완료했어요.\nCMC에 오신 걸 환영해요!'}
        </h1>
        <Image src="/congratulation.svg" alt="회원가입 완료 일러스트" width={217} height={231} />
      </div>
      <div className="p-4">
        <Button type="button" onClick={() => router.push('/login')}>
          시작하기
        </Button>
      </div>
    </div>
  );
}
