import { ChevronLeftIcon } from '@/components/icons';

interface FunnelHeaderProps {
  step: 1 | 2 | 3 | 4;
  onBack: () => void;
}

export default function FunnelHeader({ step, onBack }: FunnelHeaderProps) {
  return (
    <header className="flex items-center justify-between h-[54px] bg-white">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center justify-center w-[65px] h-full pl-4 py-3"
        aria-label="뒤로가기"
      >
        <ChevronLeftIcon />
      </button>
      <span className="text-base font-semibold text-grayscale-900">({step}/4)</span>
      <div className="w-[65px]" />
    </header>
  );
}
