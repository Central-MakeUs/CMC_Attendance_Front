'use client';

interface Props {
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  message,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-[0px_4px_14px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full max-w-[340px] overflow-hidden mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5">
          <p className="text-grayscale-900 text-[20px] font-bold leading-normal">
            {message}
          </p>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-12 py-2 text-base font-semibold rounded-xl bg-grayscale-50 text-grayscale-700 transition-colors hover:bg-grayscale-100"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-12 py-2 text-base font-semibold rounded-xl bg-primary text-white transition-colors hover:bg-primary/90"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
