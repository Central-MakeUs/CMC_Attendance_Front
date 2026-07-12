export default function SettingRow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className='flex items-center justify-between w-full py-4'>
      <span className="flex items-center gap-2">
        {icon}
        <span className="text-base font-medium text-grayscale-900">
          {label}
        </span>
      </span>
      <svg
        className="size-6 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 18L15 12L9 6"
          stroke="#7E82A0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
