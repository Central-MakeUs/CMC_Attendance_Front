'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@/components/icons';

interface SelectFieldProps {
  label: string;
  options: string[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function SelectField({
  label,
  options,
  value,
  placeholder = '선택',
  onChange,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative flex flex-col gap-1 w-full">
      <span className="text-sm font-semibold text-grayscale-500">{label}</span>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={`flex items-center justify-between h-14 border-b-2 ${value ? 'border-primary' : 'border-grayscale-100'} focus:border-primary focus:outline-none transition-colors`}
      >
        <span
          className={`text-xl ${value ? 'text-grayscale-900' : 'text-grayscale-300'}`}
        >
          {value || placeholder}
        </span>
        <span className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 w-full z-10 mt-3 bg-white rounded-2xl overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.03),0px_4px_12px_0px_rgba(0,0,0,0.16)]">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-grayscale-500 hover:bg-grayscale-50 transition-colors"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
