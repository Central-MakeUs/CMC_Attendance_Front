'use client';

import { toast } from 'sonner';
import { CopyIcon } from '@/components/icons';
import Button from '@/components/ui/Button';

interface Props {
  title: string;
  description: string;
  value: string | null;
  copySuccessMessage: string;
  onClose: () => void;
}

export default function CopyValueModal({
  title,
  description,
  value,
  copySuccessMessage,
  onClose,
}: Props) {
  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      toast.success(copySuccessMessage);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-[0px_4px_14px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full max-w-mobile overflow-hidden mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-1.5">
            <p className="text-[#30323d] text-[20px] font-bold leading-normal">
              {title}
            </p>
            <p className="text-grayscale-500 text-[16px] font-medium leading-normal">
              {description}
            </p>
          </div>
          <div className="bg-grayscale-50 flex items-center justify-center gap-2 p-3 rounded-xl">
            <span className="text-[#454858] text-[20px] font-medium leading-normal">
              {value ?? '불러오는 중...'}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="bg-white flex items-center justify-center rounded-full size-8 text-grayscale-700 shrink-0"
            >
              <CopyIcon />
            </button>
          </div>
        </div>
        <div className="flex justify-end px-5 pb-5">
          <div className="w-1/2">
            <Button size="sm" onClick={onClose}>
              완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
