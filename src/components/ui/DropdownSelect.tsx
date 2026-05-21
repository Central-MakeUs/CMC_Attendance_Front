'use client';

import Select from './Select';

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
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      nullable
      triggerClassName="flex items-center justify-between w-36 h-10 px-3 py-2 bg-white border border-grayscale-100 rounded-xl"
      valueClassName="text-sm font-medium text-grayscale-700"
      placeholderClassName="text-sm font-medium text-[#989bb3]"
      dropdownClassName="mt-1 w-36 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] overflow-hidden"
      optionClassName={(_, isSelected) =>
        `w-full px-4 py-2.5 text-left text-sm hover:bg-grayscale-50 transition-colors ${
          isSelected ? 'font-semibold text-primary' : 'text-grayscale-700'
        }`
      }
    />
  );
}
