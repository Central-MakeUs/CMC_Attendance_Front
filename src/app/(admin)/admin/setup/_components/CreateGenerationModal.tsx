'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

interface Props {
  onClose: () => void;
  onBackToSelect: () => void;
}

export default function CreateGenerationModal({ onClose, onBackToSelect }: Props) {
  const router = useRouter();

  const handleHome = () => {
    onBackToSelect();
  };

  const handleStart = () => {
    router.push('/admin');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),0px_4px_14px_0px_rgba(0,0,0,0.1)] w-full max-w-[358px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5">
          <div className="flex flex-col gap-1.5">
            <p className="text-xl font-bold leading-normal text-[#30323d]">
              새로운 기수를 만들었어요
            </p>
            <p className="text-base font-medium leading-normal text-[#727692]">
              지금 바로 입장해 챌린저를 초대하고 출석 체크를 준비해 보세요.
            </p>
          </div>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <Button variant="secondary" size="sm" className="flex-1" onClick={handleHome}>
            홈으로
          </Button>
          <Button variant="primary" size="sm" className="flex-1" onClick={handleStart}>
            바로 시작
          </Button>
        </div>
      </div>
    </div>
  );
}
