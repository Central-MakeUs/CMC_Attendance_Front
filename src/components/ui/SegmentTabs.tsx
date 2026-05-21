interface Tab<T> {
  label: string;
  value: T;
}

interface SegmentTabsProps<T> {
  tabs: Tab<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function SegmentTabs<T>({ tabs, value, onChange }: SegmentTabsProps<T>) {
  return (
    <div className="flex items-center p-1 bg-[#f1f1f4] rounded-xl">
      {tabs.map((tab) => (
        <button
          key={String(tab.value)}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`px-4 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
            value === tab.value
              ? 'bg-white font-semibold text-grayscale-700 shadow-sm'
              : 'font-medium text-[#8e91a8]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
