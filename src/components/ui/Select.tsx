'use client';

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { ChevronDownIcon } from '@/components/icons';

interface SelectContextValue {
  value: string | null;
  isOpen: boolean;
  toggle: () => void;
  select: (value: string) => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error('Select 하위 컴포넌트는 Select 안에서만 사용할 수 있습니다.');
  return ctx;
}

function SelectRoot<T extends string>({
  value,
  onChange,
  children,
  className,
}: {
  value: T | null;
  onChange: (value: T | null) => void;
  children: ReactNode;
  className?: string;
}) {
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
    <SelectContext.Provider
      value={{
        value,
        isOpen,
        toggle: () => setIsOpen((o) => !o),
        select: (v) => { onChange(v as T); setIsOpen(false); },
      }}
    >
      <div ref={ref} className={`relative ${className ?? ''}`}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

function SelectTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { toggle } = useSelectContext();
  return (
    <div role="button" onClick={toggle} className={className}>
      {children}
    </div>
  );
}

function SelectChevron({ className }: { className?: string }) {
  const { isOpen } = useSelectContext();
  return (
    <span className={`transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''} ${className ?? ''}`}>
      <ChevronDownIcon />
    </span>
  );
}

function SelectContent({ children, className }: { children: ReactNode; className?: string }) {
  const { isOpen } = useSelectContext();
  if (!isOpen) return null;
  return (
    <ul className={`absolute top-full left-0 z-10 ${className ?? ''}`}>
      {children}
    </ul>
  );
}

function SelectItem({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string | ((isSelected: boolean) => string);
}) {
  const { select, value: selectedValue } = useSelectContext();
  const isSelected = value === selectedValue;
  const resolvedClass = typeof className === 'function' ? className(isSelected) : (className ?? '');
  return (
    <li>
      <button type="button" onClick={() => select(value)} className={resolvedClass}>
        {children}
      </button>
    </li>
  );
}

const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Chevron: SelectChevron,
  Content: SelectContent,
  Item: SelectItem,
});

export default Select;
