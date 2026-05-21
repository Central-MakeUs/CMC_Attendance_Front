'use client';

import Select from './Select';
import { XIcon } from '@/components/icons';

interface DropdownSelectProps<T extends string> {
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
}

export default function DropdownSelect<T extends string>({
  options,
  value,
  onChange,
  placeholder = '선택',
}: DropdownSelectProps<T>) {
  return (
    <Select value={value} onChange={onChange}>
      <Select.Trigger className="flex items-center justify-between w-36 h-10 px-3 py-2 bg-white border border-grayscale-100 rounded-xl">
        <span className={value ? 'text-sm font-medium text-grayscale-700' : 'text-sm font-medium text-[#989bb3]'}>
          {value ?? placeholder}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {value && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null); }}
              className="flex items-center text-grayscale-400 hover:text-grayscale-600"
            >
              <XIcon />
            </button>
          )}
          <Select.Chevron />
        </div>
      </Select.Trigger>
      <Select.Content className="mt-1 w-36 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] overflow-hidden">
        {options.map((option) => (
          <Select.Item
            key={option}
            value={option}
            className={(isSelected) =>
              `w-full px-4 py-2.5 text-left text-sm hover:bg-grayscale-50 transition-colors ${
                isSelected ? 'font-semibold text-primary' : 'text-grayscale-700'
              }`
            }
          >
            {option}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
}
