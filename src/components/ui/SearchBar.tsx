'use client';

import { SearchIcon } from '@/components/icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = '검색',
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 flex-1 max-w-[391px]">
      <div className="flex items-center gap-1 flex-1 h-10 px-3 py-2 bg-white border border-grayscale-100 rounded-xl">
        <span className="shrink-0">
          <SearchIcon className="text-grayscale-300" />
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
          placeholder={placeholder}
          className="flex-1 min-w-0 text-sm text-grayscale-900 placeholder:text-[#989bb3] focus:outline-none bg-transparent"
        />
      </div>
      <button
        type="button"
        onClick={onSearch}
        className="shrink-0 px-6 py-2.5 bg-[#eff1ff] text-primary font-semibold text-base rounded-xl whitespace-nowrap"
      >
        검색
      </button>
    </div>
  );
}
