'use client';

import { useState } from 'react';

interface NoteCellProps {
  value: string | null;
  onSave: (note: string | null) => Promise<void>;
}

function EditIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
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
      setInputValue(value ?? '');
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
        className="w-full text-grayscale-700 bg-transparent outline-none border-b border-grayscale-100 py-0.5"
      />
    );
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-grayscale-700">{value ?? ''}</span>
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
