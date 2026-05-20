'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@/components/icons';

interface SelectFieldLabelProps {
  children: React.ReactNode;
  className?: string;
}

function SelectFieldLabel({ children, className = '' }: SelectFieldLabelProps) {
  return (
    <span className={`text-sm font-semibold text-grayscale-500 ${className}`}>
      {children}
    </span>
  );
}

interface SelectFieldInputProps {
  options: string[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

function SelectFieldInput({
  options,
  value,
  placeholder = '선택',
  onChange,
  className = '',
}: SelectFieldInputProps) {
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

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={`flex items-center justify-between w-full h-14 border-b-2 ${value ? 'border-primary' : 'border-grayscale-100'} focus:border-primary focus:outline-none transition-colors`}
      >
        <span className={`text-xl ${value ? 'text-grayscale-900' : 'text-grayscale-300'}`}>
          {value || placeholder}
        </span>
        <span className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 w-full z-10 mt-3 max-h-[200px] overflow-y-auto bg-white rounded-2xl shadow-[0px_1px_4px_0px_rgba(0,0,0,0.03),0px_4px_12px_0px_rgba(0,0,0,0.16)]">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
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

interface SelectFieldProps {
  label: string;
  options: string[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

function SelectField({ label, options, value, placeholder, onChange }: SelectFieldProps) {
  return (
    <div className="relative flex flex-col gap-1 w-full">
      <SelectFieldLabel>{label}</SelectFieldLabel>
      <SelectFieldInput options={options} value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  );
}

SelectField.Label = SelectFieldLabel;
SelectField.Input = SelectFieldInput;

export default SelectField;
