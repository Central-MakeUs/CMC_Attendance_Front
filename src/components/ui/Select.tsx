'use client';

import { createContext, useContext, useState, useRef, useEffect, ReactNode, CSSProperties, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDownIcon } from '@/components/icons';

interface SelectContextValue {
  value: string | null;
  isOpen: boolean;
  toggle: () => void;
  select: (value: string) => void;
  triggerRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLUListElement | null>;
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
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        ref.current && !ref.current.contains(target) &&
        contentRef.current && !contentRef.current.contains(target)
      ) {
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
        triggerRef,
        contentRef,
      }}
    >
      <div ref={ref} className={`relative ${className ?? ''}`}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

function SelectTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { toggle, triggerRef } = useSelectContext();
  return (
    <div ref={triggerRef} role="button" onClick={toggle} className={className}>
      {children}
    </div>
  );
}

function SelectChevron({ className, children }: { className?: string; children?: ReactNode }) {
  const { isOpen } = useSelectContext();
  return (
    <span className={`transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''} ${className ?? ''}`}>
      {children ?? <ChevronDownIcon />}
    </span>
  );
}

function SelectContent({ children, className }: { children: ReactNode; className?: string }) {
  const { isOpen, triggerRef, contentRef } = useSelectContext();
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setStyle({
        position: 'fixed',
        top: rect.bottom + 12,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;
  return createPortal(
    <ul ref={contentRef} style={style} className={className ?? ''}>
      {children}
    </ul>,
    document.body
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
