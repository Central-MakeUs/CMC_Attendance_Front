'use client';

import { useState } from 'react';

interface NoteCellProps {
  value: string | null;
  onSave: (note: string | null) => Promise<void>;
}

function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clipPath="url(#clip0_4323_1258)">
        <path
          d="M14.167 2.49993C14.3859 2.28106 14.6457 2.10744 14.9317 1.98899C15.2176 1.87054 15.5241 1.80957 15.8337 1.80957C16.1432 1.80957 16.4497 1.87054 16.7357 1.98899C17.0216 2.10744 17.2815 2.28106 17.5003 2.49993C17.7192 2.7188 17.8928 2.97863 18.0113 3.2646C18.1297 3.55057 18.1907 3.85706 18.1907 4.16659C18.1907 4.47612 18.1297 4.78262 18.0113 5.06859C17.8928 5.35455 17.7192 5.61439 17.5003 5.83326L6.25033 17.0833L1.66699 18.3333L2.91699 13.7499L14.167 2.49993Z"
          stroke="#C4C6D3"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4323_1258">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function NoteCell({ value, onSave }: NoteCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value ?? '');

  const handleBlur = async () => {
    setIsEditing(false);
    const newNote = inputValue.trim() || null;
    await onSave(newNote);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setInputValue(value ?? '-');
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        autoFocus
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full text-grayscale-700 bg-transparent outline-none border-b border-grayscale-100"
      />
    );
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-grayscale-700 border-b border-transparent">{value ?? '-'}</span>
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="shrink-0 text-grayscale-300 hover:text-grayscale-500 transition-colors"
      >
        <EditIcon />
      </button>
    </div>
  );
}
