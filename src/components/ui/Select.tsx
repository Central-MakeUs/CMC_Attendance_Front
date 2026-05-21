'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, XIcon } from '@/components/icons';

interface SelectProps<T extends string> {
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
  nullable?: boolean;
  className?: string;
  triggerClassName?: string | ((hasValue: boolean) => string);
  valueClassName?: string;
  placeholderClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string | ((option: T, isSelected: boolean) => string);
}

export default function Select<T extends string>({
  options,
  value,
  onChange,
  placeholder = '선택',
  nullable = false,
  className = '',
  triggerClassName = '',
  valueClassName = '',
  placeholderClassName = '',
  dropdownClassName = '',
  optionClassName = '',
}: SelectProps<T>) {
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

  const resolvedTriggerClassName =
    typeof triggerClassName === 'function' ? triggerClassName(value !== null) : triggerClassName;

  const getOptionClass = (option: T) => {
    if (typeof optionClassName === 'function') return optionClassName(option, value === option);
    return optionClassName;
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        role="button"
        onClick={() => setIsOpen((o) => !o)}
        className={resolvedTriggerClassName}
      >
        <span className={value !== null ? valueClassName : placeholderClassName}>
          {value ?? placeholder}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {nullable && value && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null); }}
              className="flex items-center text-grayscale-400 hover:text-grayscale-600"
            >
              <XIcon />
            </button>
          )}
          <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDownIcon />
          </span>
        </div>
      </div>

      {isOpen && (
        <ul className={`absolute top-full left-0 z-10 ${dropdownClassName}`}>
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => { onChange(option); setIsOpen(false); }}
                className={getOptionClass(option)}
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
